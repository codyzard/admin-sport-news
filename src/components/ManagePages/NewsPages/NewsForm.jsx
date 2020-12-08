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
  logout,
  uploadNewsRequest,
} from "../../../actions/index";
import { CloudinaryImageUploadAdapter } from "ckeditor-cloudinary-uploader-adapter";
import { isEmpty } from "lodash";
import { ThreeDots } from "@agney/react-loading";
import { alertMessage } from "../../../utils/help_function";
class NewsForm extends Component {
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
    loading: true,
  };
  async componentDidMount() {
    await this.props.getTagsAndParentCategories();
    var { parent_categories } = this.props;
    this.setState({
      parent_categories: parent_categories,
      loading: false,
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
    if (parent_category === -1 || child_category === -1) {
      this.alertError("Lỗi", "Vui lòng chọn danh mục đầy đủ");
    } else if (isEmpty(title) || isEmpty(title_img.name)) {
      this.alertError("Lỗi", "Chưa nhập tiêu dề hoặc ảnh tiêu đề rỗng");
    } else if (isEmpty(summary)) {
      this.alertError("Lỗi", "Tóm tắt không được rỗng");
    } else if (isEmpty(content)) {
      this.alertError("Lỗi", "Nội dung không được rỗng");
    } else {
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
      await this.props.uploadNews(data, header).catch((err) => {
        this.setState({ loading: false });
        if(!isEmpty(err.response)){
          if (err.response.status === 401) {
            alertMessage(
              "Lỗi",
              "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
            );
          } else {
            alertMessage("Lỗi", "Vui lòng thử lại sau");
          }
        }
      });
      confirmAlert({
        title: "Thông báo",
        message: "Thêm thành công, thêm nữa không?",
        buttons: [
          {
            label: "Có",
            onClick: () => {
              this.setState({
                parent_category: -1,
                child_category: -1,
                title: "",
                title_img: {},
                summary: "",
                content: "",
                tags: [],
                hot_or_nor: 0,
              });
            },
          },
          {
            label: "Không",
            onClick: () => this.props.history.goBack(),
          },
        ],
      });
    }
  };
  componentDidUpdate(preProps, preState) {
    if (preProps.author_news !== this.props.author_news) {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    var {
      loading,
      tags,
      parent_categories,
      child_categories,
      child_category,
      parent_category,
      content,
      summary,
      title,
      hot_or_nor,
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
                    className="btn btn-default mr-3 ml-3 btn-trans"
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
                          className="btn btn-warning mr-3 ml-3"
                          type="reset"
                        >
                          {"Xóa toàn bộ"}
                        </button>
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
    author_news: state.author_news,
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
    uploadNews: (data, header) => {
      return dispatch(uploadNewsRequest(data, header));
    },
    logout: () => {
      return dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsForm);

function imagePluginFactory(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new CloudinaryImageUploadAdapter(loader, "dq4wah8x3", "bmwoqs1j", [
      160,
      500,
      630,
      354,
    ]);
  };
}
