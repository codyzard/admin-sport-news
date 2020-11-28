import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { add } from "lodash";
import { updateInfoRequest } from "../../actions";

class UpdateProfile extends Component {
  state = {
    gender: null,
    dob: null,
    address: null,
    phone: null,
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
    if (option === "Có") {
      this.onClearForm();
    } else {
      this.props.history.goBack();
    }
  };
  async componentDidMount() {}
  onChange = (e) => {
    var target = e.target;
    var { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  onChangeGender = (e) => {
    var target = e.target;
    var { name, value } = target;
    if(value == 1){
      this.setState({
        gender: true,
      })
    }
    else{
      this.setState({
        gender: false,
      })
    }
  };
  onClearForm = () => {};
  onSubmit = async (e) => {
    e.preventDefault();
    var {gender, dob, address, phone} = this.state;
    await this.props.updateInfo(gender, dob, address, phone);
  };
  render() {
    var {gender, dob, address, phone} = this.state;
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
                <h5 className="card-header">{"Cập nhật thông tin cá nhân"}</h5>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="input-select" className="d-block">
                        {"Giới tính"}
                      </label>
                      <label className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          name="gender"
                          className="custom-control-input"
                          checked={gender == true ? "checked" : ""}
                          value="1"
                          onChange = {(e) => {this.onChangeGender(e)}}
                        />
                        <span className="custom-control-label">Nam</span>
                      </label>
                      <label className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          name="gender"
                          className="custom-control-input"
                          checked={gender == false ? "checked" : ""}
                          value="0"
                          onChange = {(e) => {this.onChangeGender(e)}}
                        />
                        <span className="custom-control-label">Nữ</span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputText3" className="col-form-label">
                        Ngày sinh
                      </label>
                      <input
                        id="birthday"
                        type="date"
                        name="dob"
                        className="form-control"
                        max={new Date().toISOString().split("T")[0]}
                        defaultValue={dob ? dob : ""}
                        onChange = {(e) => {this.onChange(e)}}
                      />
                    </div>
                    <div className="form-group">
                      <label>{"Địa chỉ"}</label>
                      <input
                        className="form-control"
                        id="address"
                        name="address"
                        defaultValue={address ? address : ""}
                        onChange = {(e) => {this.onChange(e)}}
                      />
                    </div>
                    <div className="form-group">
                      <label>{"Số điện thoại"}</label>
                      <input
                        type="text"
                        className="form-control phone-inputmask"
                        id="phone-mask"
                        im-insert="true"
                        name="phone"
                        defaultValue={phone ? phone : ""}
                        onChange = {(e) => {this.onChange(e)}}
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
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateInfo: (gender, dob, address, phone) => {
      return dispatch(updateInfoRequest(gender, dob, address, phone));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
