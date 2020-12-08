import { isEmpty } from "lodash";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createAuthorAccountRequest } from "../../../actions";
import { alertMessage, validateEmail } from "../../../utils/help_function";

class RegisterAuthorAccount extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    loading: true,
  };
  componentDidMount() {
    this.setState({ loading: false });
  }
 
  onChange = (e) => {
    let target = e.target;
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    let access_token = JSON.parse(localStorage.getItem("access_token"));
    const header = { Authorization: `Bearer ${access_token}` };
    let { name, email, password, confirm_password } = this.state;
    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirm_password)
    ) {
      alertMessage("Lỗi", "Chưa điền đủ trường");
      return;
    }
    if (password !== confirm_password) {
      alertMessage("Lỗi", "Mật khẩu không trùng khớp");
      return;
    } else if (!validateEmail(email)) {
      alertMessage("Lỗi", "Email không hợp lệ");
      return;
    } else {
      this.setState({ loading: true });
      this.props
        .registerAuthorAccount(header, name, email, password)
        .catch((err) => {
          this.setState({ loading: false });
          if (!isEmpty(err.response)) {
            if (err.response.status === 401) {
              alertMessage(
                "Lỗi",
                "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
              );
            } else if (err.response.status === 400) {
              let data = JSON.parse(err.response.data);
              if ("email" in data) {
                alertMessage("Lỗi", "Email đã tồn tại");
                return;
              } else if ("password" in data) {
                alertMessage("Lỗi", "Mật khẩu phải có 6 ký trở lên");
              } else if ("email" in data && "password" in data) {
                alertMessage(
                  "Lỗi",
                  "Email đã tồn tại \n  Mật khẩu phải có 6 ký trở lên"
                );
                return;
              } else return;
            } else alertMessage("Lỗi", "Lỗi chưa xác định");
          }
        });
      this.setState({ loading: false });
      confirmAlert({
        title: "Thông báo",
        message: "Tạo tài khoản thành công",
        buttons: [
          {
            label: "OK",
            onClick: () => {
              this.props.history.goBack();
            },
          },
        ],
      });
      return;
    }
  };
  onClick = async (e) => {
    await this.onSubmit(e);
  };
  onEnter = async (e) => {
    if (e.keyCode === 13) {
      await this.onSubmit();
    }
  };
  render() {
    var { name, email, password, confirm_password } = this.state;
    return (
      <div className="dashboard-wrapper">
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
                <h5 className="card-header">{"Tạo tài khoản tác giả"}</h5>
                <div className="card-body m-auto">
                  <div className="form-v2-content">
                    <div className="form-left">
                      <img
                        src="images/vertical_bg1.jpg"
                        alt="form"
                        width="427"
                        height="100%"
                      />
                    </div>
                    <form
                      className="form-detail"
                      action="#"
                      method="post"
                      id="myform"
                      noValidate="novalidate"
                    >
                      <div className="card-header text-center mb-3">
                        <a href="../index.html">
                          <img
                            className="logo-img"
                            src="/images/logoSTE.png"
                            width="135px"
                            alt="logo"
                          />
                        </a>
                        <h2>Tạo tài khoản</h2>
                      </div>
                      <div className="form-group">
                        <label>Tên</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="vd: Nguyễn Văn A"
                          defaultValue={name}
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          name="email"
                          className="input-text"
                          required
                          pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                          aria-required="true"
                          defaultValue={email}
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                          type="password"
                          name="password"
                          className="input-text"
                          required
                          aria-required="true"
                          defaultValue={password}
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input
                          type="password"
                          name="confirm_password"
                          className="input-text"
                          required
                          aria-required="true"
                          defaultValue={confirm_password}
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Tạo tài khoản"
                          name="register"
                          className="register"
                          defaultValue="Register"
                          onClick={(e) => this.onClick(e)}
                          onKeyDown={(e) => this.onEnter(e)}
                        />
                      </div>
                    </form>
                  </div>
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
    registerAuthorAccount: (header, name, email, password) => {
      return dispatch(
        createAuthorAccountRequest(header, name, email, password)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterAuthorAccount);
