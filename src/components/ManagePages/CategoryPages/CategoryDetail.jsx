import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createCategoryRequest,
  getCategoryDetailRequest,
  getParentCategoriesRequest,
  updateCategoryDetailRequest,
} from "../../../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "@agney/react-loading";
class CategoryDetail extends Component {
  state = {
    parent_categories: [],
    name: "",
    description: "",
    parent_id: "",
    parent_category: "",
    category: "",
    loading: true,
  };
  notify = (message) => {
    if (message === "parent category is not exists") {
      toast.error("Danh mục cha không tồn tại", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (message === "updated success") {
      toast.success("Cập nhật thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.warning("Lỗi do chưa nhập tên danh mục hoặc chọn danh mục cha", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  async componentDidMount() {
    await this.props.getCategoryDetail(
      this.props.history.location.state.category.id
    );
    var { parent_categories, category_detail } = this.props;
    if (category_detail.parent_id !== null) {
      var index_parent = parent_categories.findIndex((pc) => {
        return pc.id === category_detail.parent_id;
      });
    }
    this.setState({
      parent_categories: parent_categories,
      parent_id: category_detail.parent_id === null ? "" : parent_categories[index_parent].id,
      name: category_detail.name,
      description: category_detail.description,
      loading: false,
    });
  }
  onChange = (e) => {
    var target = e.target;
    var { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { name, description, parent_id } = this.state;
    var category = this.props.history.location.state.category;
    await this.props.updateCategory(category.id, name, description, parent_id);
    var { message, category_update } = this.props;
    console.log(category_update);
    if (message === "updated success") {
      this.setState({
        parent_id: category_update.parent_id,
        name: category_update.name,
        description: category_update.description,
      });
    }
    this.notify(message);
  };
  render() {
    var {
      parent_categories,
      parent_id,
      name,
      description,
      loading,
    } = this.state;
    var list_select = parent_categories.map((c, index) => {
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
              {loading ? (
                <ThreeDots color="#00BFFF" height="800" width="100%" />
              ) : (
                <>
                  <div className="card">
                    <h5 className="card-header">{"Chi tiết danh mục"}</h5>
                    <div className="card-body">
                      <form>
                        {this.props.history.location.state.category
                          .parent_id === null ? (
                          ""
                        ) : (
                          <div className="form-group">
                            <label htmlFor="input-select">
                              {"Danh mục cha"}
                            </label>
                            <select
                              className="form-control"
                              id="input-select"
                              name="parent_id"
                              onChange={(e) => this.onChange(e)}
                              value={parent_id}
                            >
                              {list_select}
                            </select>
                          </div>
                        )}
                        <div className="form-group">
                          <label
                            htmlFor="inputText3"
                            className="col-form-label"
                          >
                            Tên danh mục
                          </label>
                          <input
                            id="inputText3"
                            type="text"
                            name="name"
                            className="form-control"
                            defaultValue={name}
                            onChange={(e) => this.onChange(e)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlTextarea1">
                            {"Mô tả"}
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            name="description"
                            defaultValue={description}
                            onChange={(e) => this.onChange(e)}
                          />
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
                </>
              )}
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
    message: state.message,
    category_update: state.category_detail,
    category_detail: state.category_detail,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getParentCategories: () => {
      return dispatch(getParentCategoriesRequest());
    },
    getCategoryDetail: (category_id) => {
      return dispatch(getCategoryDetailRequest(category_id));
    },
    updateCategory: (category_id, name, description, parent_id) => {
      return dispatch(
        updateCategoryDetailRequest(category_id, name, description, parent_id)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
