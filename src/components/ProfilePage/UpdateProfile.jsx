import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { isEmpty } from "lodash";
import { updateInfoRequest } from "../../actions";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class UpdateProfile extends Component {
  state = {
    name: null,
    gender: null,
    birthday: null,
    address: null,
    phone: null,
    access_token: '',
    user: null,
  };
  async componentDidMount() {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var user = JSON.parse(localStorage.getItem("user"));
    if (isEmpty(access_token) || isEmpty(user)) {
      this.props.history.push("/login");
    }
    var {user_info} = user;
    this.setState({
      name: user.name,
      access_token: access_token,
    })
    if(user_info){
      var {gender, birthday, address, phone} = user_info;
      await this.setState({
        gender: gender,
        birthday: birthday,
        address: address,
        phone: phone,
        user: user,
        loading: false,
      });
    
    }
   }
  onChange = (e) => {
    var target = e.target;
    var { name, value } = target;
    console.log(value);
    this.setState({
      [name]: value,
    });
  };
  onChangeGender = (e) => {
    var target = e.target;
    var {value } = target;
    if(parseInt(value) === 1){
      this.setState({
        gender: 1,
      })
    }
    else{
      this.setState({
        gender: 0,
      })
    }
  };
  onSubmit = async (e) => {
    e.preventDefault();
    if(isEmpty(this.state.name)){
      confirmAlert({
        title: "Lỗi",
        message: "Tên không được để trống",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
      return;
    }
    var { access_token } = this.state;
    const headers = { Authorization: `Bearer ${access_token}` }
    var {name, gender, birthday, address, phone} = this.state;
    await this.props.updateInfo(name, gender, birthday, address, phone, headers).then(() => {
      confirmAlert({
        title: "Thông báo",
        message: "Cập nhật thông tin thành công",
        buttons: [
          {
            label: "OK",
            onClick: () => this.props.history.goBack()
          },
        ],
      });
    }).catch( () => {
      confirmAlert({
        title: "Lỗi",
        message: "Lỗi chưa xác định",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
    });
  };
  render() {
    var {name, gender, birthday, address, phone} = this.state;
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
                      <label>{"Tên"}</label>
                      <input
                        className="form-control"
                        id="name"
                        name="name"
                        defaultValue={name ? name : ""}
                        onKeyUp = {(e) => {this.onChange(e)}}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="input-select" className="d-block">
                        {"Giới tính"}
                      </label>
                      <label className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          name="gender"
                          className="custom-control-input"
                          checked={gender === 1 ? "checked" : ""}
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
                          checked={gender === 0 ? "checked" : ""}
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
                        name="birthday"
                        className="form-control"
                        max={new Date().toISOString().split("T")[0]}
                        defaultValue={birthday ? (birthday) : ""}
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
    updateInfo: (name, gender, birthday, address, phone, headers) => {
      return dispatch(updateInfoRequest(name, gender, birthday, address, phone, headers));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
