import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {Storage} from 'aws-amplify';
import {
  getChildCategoriesRequest,
  getTagsAndParentCategoriesRequest,
} from "../../../actions/news_author";
class NewsForm extends Component {
  state = {
    parent_categories: [],
    child_categories: [],
    parent_category: -1,
    child_category: -1,
    title: "",
    title_img: "",
    summary: "",
    content: "",
    tags: [],
    suggestions: [],
    hot_or_nor: 0,
  };
  async componentDidMount() {
    await this.props.getTagsAndParentCategories();
    var { parent_categories } = this.props;
    this.setState({
      parent_categories: parent_categories,
    });
  }
  handleChange = (tags) => {
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
  handleChange = (e, editor) => {
    const content = editor.getData();
    this.setState({content});
  }
  onChange = (e) => {
    let target = e.target;
    let { name, value } = target;
    if (
      name === "child_category" ||
      name === "parent_category" ||
      name === "hot_or_nor"
    ) value = parseInt(value);
    this.setState({
      [name]: value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    // var { child_category, parent_category } = this.state;
    // if (child_category === -1 || parent_category === -1) {
    //   console.log("sai");
    //   return;
    // }
    console.log(this.state);
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
      title_img,
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
        <div className="container-fluid dashboard-content">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <ToastContainer />
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
                        value={title_img}
                        onChange={(e) => this.onChange(e)}
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
                        data = {content}
                        onChange={this.handleChange}
                        config={{
                          ckfinder: {
                            // Upload the images to the server using the CKFinder QuickUpload command.
                            uploadUrl: "/uploads",
                          },
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>{"Nhãn"}</label>
                      <div>
                        <TagsInput
                          value={tags}
                          onChange={this.handleChange}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsForm);

ClassicEditor.create(
  
)