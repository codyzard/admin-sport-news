import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createCategoryRequest,
  getParentCategoriesRequest,
} from "../../../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class CreateCategoryForm extends Component {
  state = {
    parent_categories: [],
    name: "",
    description: "",
    parent_id: "",
  };
  notify = (message) => {
    if (message === "already have") {
      toast.error("Đã có", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (message === "created success") {
      toast.success("Thêm thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.warning("Lỗi do chưa nhập tên danh mục hoặc chọn danh mục cha", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  afterSave = (option) => {
    if(option === "Có"){
      this.onClearForm();
    }
    else{
      this.props.history.goBack();
    }
  }
  async componentDidMount() {
    await this.props.getParentCategories();
    this.setState({
      parent_categories: this.props.parent_categories,
      parent_id: this.props.parent_categories[0].id,
    });
  }
  onChange = (e) => {
    var target = e.target;
    var { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  onClearForm = () => {
    this.setState({
      parent_id: this.props.parent_categories[0].id,
      name: "",
      description: "",
    });
  }
  onSubmit = async (e) => {
    e.preventDefault();
    var { name, description, parent_id } = this.state;
    await this.props.createCategory(name, description, parent_id);
    var { message } = this.props;
    this.notify(message);
    if (message === "created success") {
      confirmAlert({
        title: "Thông báo",
        message: "Thêm nữa không ?",
        buttons: [
          {
            label: "Có",
            onClick: () => {this.afterSave("Có"); this.onClearForm()}
          },
          {
            label: "Không",
            onClick: () => this.afterSave('Không'),
          },
        ],
      });
    }
  };
  render() {
    var { parent_categories, parent_id, name, description } = this.state;
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
                <h5 className="card-header">{"Thêm danh mục"}</h5>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="input-select">{"Danh mục cha"}</label>
                      <select
                        className="form-control"
                        id="input-select"
                        name="parent_id"
                        value={parent_id}
                        onChange={(e) => this.onChange(e)}
                      >
                        {list_select}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputText3" className="col-form-label">
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
                      <label htmlFor="exampleFormControlTextarea1">{"Mô tả"}</label>
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
                        className="btn btn-warning mr-3 ml-3"
                        type="reset"
                        onClick={this.onClearForm}
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
    message: state.message,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getParentCategories: () => {
      return dispatch(getParentCategoriesRequest());
    },
    createCategory: (name, description, parent_id) => {
      return dispatch(createCategoryRequest(name, description, parent_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryForm);
