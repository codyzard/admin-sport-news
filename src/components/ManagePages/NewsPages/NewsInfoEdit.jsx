import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {
  getChildCategoriesRequest,
  getTagsAndParentCategoriesRequest,
  updateNewsRequest,
} from "../../../actions/index";
import { CloudinaryImageUploadAdapter } from "ckeditor-cloudinary-uploader-adapter";
import { isEmpty } from "lodash";
import { ThreeDots } from "@agney/react-loading";
class NewsInfoEdit extends Component {
  state = {
    parent_categories: [],
    child_categories: [],
    parent_category: -1,
    child_category: -1,
    title: "",
    title_img: {},
    summary: "",
    content: "",
    tags: [],
    suggestions: [],
    hot_or_nor: 0,
  };
  async componentDidMount() {
    var { news } = this.props.history.location.state;
    var { title, summary, html_content, hot_or_nor, categories, tags } = news;
    var { parent_categories, child_categories } = this.props;
    await this.props.getTagsAndParentCategories();
    if (categories[0]) await this.props.getChildCategories(categories[0].id);
    tags = tags.map((tag) => {
      return tag.name;
    });
    this.setState({
      parent_categories: parent_categories,
      child_categories: child_categories,
      parent_category: categories[0] ? categories[0].id : -1,
      child_category: categories[1] ? categories[1].id : -1,
      title: title,
      summary: summary,
      content: html_content,
      hot_or_nor: hot_or_nor,
      tags: tags,
    });
  }
  renderLoading = () => {
    return <ThreeDots color="#00BFFF" height="800" width="100%" />;
  };
  alertError = (title, message) => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: "OK",
        },
      ],
    });
  };
  handleChangeTag = (tags) => {
    this.setState({ tags });
  };
  onGetChildCategories = async (e) => {
    let target = e.target;
    let { value } = target;
    if (value === -1) return;
    await this.props.getChildCategories(value);
    let { child_categories } = this.props;
    this.setState({
      child_categories: child_categories,
      child_category: -1,
    });
  };
  handleChangeContent = (e, editor) => {
    const content = editor.getData();
    this.setState({ content });
  };
  onChange = (e) => {
    let target = e.target;
    let { name, value } = target;
    if (
      name === "child_category" ||
      name === "parent_category" ||
      name === "hot_or_nor"
    )
      value = parseInt(value);
    this.setState({
      [name]: value,
    });
  };
  onSetFile = (e) => {
    this.setState({ title_img: e.target.files[0] });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var { news } = this.props.history.location.state;
    const header = { Authorization: `Bearer ${access_token}` };
    var data = new FormData();
    var {
      parent_category,
      child_category,
      title,
      title_img,
      summary,
      content,
      tags,
      hot_or_nor,
    } = this.state;
    console.log(parent_category);
    if (parent_category === -1 || child_category === -1) {
      this.alertError("Lỗi", "Vui lòng chọn danh mục đầy đủ");
      return;
    } else if (isEmpty(title)) {
      this.alertError("Lỗi", "Chưa nhập tiêu dề");
      return;
    } else if (isEmpty(summary)) {
      this.alertError("Lỗi", "Tóm tắt không được rỗng");
      return;
    } else if (isEmpty(content)) {
      this.alertError("Lỗi", "Nội dung không được rỗng");
      return;
    }
    data.append("parent_category", parent_category);
    data.append("child_category", child_category);
    data.append("title", title);
    data.append("title_img", title_img);
    data.append("summary", summary);
    data.append("content", content);
    data.append("tags", [...tags]);
    data.append("hot_or_nor", hot_or_nor);
    this.setState({
      loading: true,
    });
    await this.props.updateNews(news.id, data, header).catch((err) => {
      console.log(err);
      this.alertError(
        "Lỗi",
        "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
      );
      this.setState({
        loading: false,
      });
    });
    confirmAlert({
      title: "Thông báo",
      message: "Chỉnh sửa  thành công",
      buttons: [
        {
          label: "Có",
          onClick: () => this.props.history.goBack(),
        },
      ],
    });
  };
  render() {
    var {
      tags,
      parent_categories,
      child_categories,
      child_category,
      parent_category,
      content,
      summary,
      title,
      hot_or_nor,
      loading,
    } = this.state;
    var list_parent_categories = parent_categories.map((c, index) => {
      return (
        <option key={index} value={c.id}>
          {c.name}
        </option>
      );
    });
    var list_child_categories = child_categories.map((c, index) => {
      return (
        <option key={index} value={c.id}>
          {c.name}
        </option>
      );
    });
    return (
      <div className="dashboard-wrapper">
        {loading ? (
          this.renderLoading()
        ) : (
          <div className="container-fluid dashboard-content">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group float-right">
                  <button
                    className="btn btn-default mr-3 ml-3"
                    onClick={this.props.history.goBack}
                    type="button"
                  >
                    <i className="fas fa-chevron-left"></i> {"Quay lại"}
                  </button>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <h5 className="card-header">{"Soạn tin"}</h5>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="input-select">{"Danh mục cha"}</label>
                        <select
                          className="form-control"
                          name="parent_category"
                          onChange={(e) => {
                            this.onGetChildCategories(e);
                            this.onChange(e);
                          }}
                          value={parent_category}
                        >
                          <option value={-1}>Chọn danh mục cha</option>
                          {list_parent_categories}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="input-select">{"Danh mục con"}</label>
                        <select
                          id="child_category_id"
                          className="form-control"
                          name="child_category"
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                          value={child_category}
                        >
                          <option value={-1}>Chọn danh mục con</option>
                          {list_child_categories}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputText3" className="col-form-label">
                          Tiêu đề
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          required
                          value={title}
                          onChange={(e) => this.onChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputText3" className="col-form-label">
                          Ảnh tiêu đề
                        </label>
                        <input
                          type="file"
                          name="title_img"
                          className="form-control"
                          required
                          onChange={(e) => this.onSetFile(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          {"Tóm tắt"}
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          name="summary"
                          required
                          value={summary}
                          onChange={(e) => this.onChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label>{"Nội dung"}</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={content}
                          onChange={this.handleChangeContent}
                          config={{
                            extraPlugins: [imagePluginFactory],
                          }}
                          toolbar={[imageConfiguration]}
                        />
                      </div>
                      <div className="form-group">
                        <label>{"Nhãn"}</label>
                        <div>
                          <TagsInput
                            value={tags}
                            onChange={this.handleChangeTag}
                            inputProps={{ placeholder: "Thêm nhãn" }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="d-block">{"Nổi bật"}</label>
                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            name="hot_or_nor"
                            className="custom-control-input"
                            value="1"
                            checked={hot_or_nor === 1 ? "checked" : ""}
                            onChange={(e) => this.onChange(e)}
                          />
                          <span className="custom-control-label">Có</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            name="hot_or_nor"
                            className="custom-control-input"
                            value="0"
                            checked={hot_or_nor === 0 ? "checked" : ""}
                            onChange={(e) => this.onChange(e)}
                          />
                          <span className="custom-control-label">Không</span>
                        </label>
                      </div>
                      <div className="form-group float-right">
                        <button
                          className="btn btn-success"
                          type="submit"
                          onClick={(e) => this.onSubmit(e)}
                        >
                          {"Lưu"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    parent_categories: state.parent_categories,
    child_categories: state.child_categories,
    suggestions: state.tags,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getTagsAndParentCategories: () => {
      return dispatch(getTagsAndParentCategoriesRequest());
    },
    getChildCategories: (parend_id) => {
      return dispatch(getChildCategoriesRequest(parend_id));
    },
    updateNews: (id, data, header) => {
      return dispatch(updateNewsRequest(id, data, header));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsInfoEdit);

function imagePluginFactory(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new CloudinaryImageUploadAdapter(loader, "dq4wah8x3", "bmwoqs1j", [160, 500, 630, 354 ]);
  };
}

const imageConfiguration = {
  resizeOptions: [
      {
          name: 'imageResize:original',
          value: null,
          label: 'Original'
      },
      {
          name: 'imageResize:50',
          value: '50',
          label: '50%'
      },
      {
          name: 'imageResize:75',
          value: '75',
          label: '75%'
      }
  ],
  toolbar: ['imageResize' ]
}