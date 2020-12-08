import { isEmpty } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { loading, loginRequest } from "../../actions/index";
import { Puff } from "@agney/react-loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { alertMessage, validateEmail } from "../../utils/help_function";
class Login extends Component {
  state = {
    email: "",
    password: "",
    isChecked: false,
    loading: true,
  };
  onChangeInput = (e) => {
    var target = e.target;
    var { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    var { email, password } = this.state;
    this.setState({ loading: true });
    if (!validateEmail(email)) {
      alertMessage("Lỗi", "Email không hợp lệ");
      this.setState({ loading: false });
      return;
    }
    await this.props.login(email, password).catch((err) => {
      this.setState({ loading: false });
      if (!isEmpty(err.response)) {
        if (err.response.data.error === "Account is block") {
          confirmAlert({
            title: "Lỗi",
            message: "Tài khoản đã bị khóa",
            buttons: [
              {
                label: "OK",
              },
            ],
          });
        } else if (err.response.status === 422) {
          confirmAlert({
            title: "Lỗi",
            message: "Tài khoản đã bị khóa",
            buttons: [
              {
                label: "OK",
              },
            ],
          });
        } else if (err.response.status === 401) {
          confirmAlert({
            title: "Người dùng không hợp lệ",
            message: "Sai email hoặc mật khẩu",
            buttons: [
              {
                label: "OK",
              },
            ],
          });
        }
      }
    });
    if (!isEmpty(this.props.session)) {
      this.props.history.push("/");
    }
  };
  componentDidMount() {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    this.setState({ loading: false });
    if (access_token) {
      this.props.history.push("/");
    }
  }
  renderLoading = () => {
    return <Puff color="#00BFFF" height="600" width="100%" />;
  };
  formLogin = () => {
    let { loading, email, password } = this.state;
    return (
      <div className="splash-container">
        {loading ? (
          this.renderLoading()
        ) : (
          <div className="card mt-5">
            <div className="card-header text-center">
              <a href="../index.html">
                <img
                  className="logo-img"
                  src="/images/logoSTE.png"
                  width="135px"
                  alt="logo"
                />
              </a>
              <span className="splash-description">Nhập email và mật khẩu</span>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control form-control-lg"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    defaultValue={email}
                    onChange={(e) => this.onChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    className="form-control form-control-lg"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    defaultValue={password}
                    onChange={(e) => this.onChangeInput(e)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={(e) => this.onSubmit(e)}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  renderLoading = () => {
    return <Puff color="#00BFFF" height="800" width="100%" />;
  };
  isLogged = () => {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    if (!isEmpty(access_token)) return true;
    return false;
  };
  render() {
    return this.isLogged() ? "" : this.formLogin();
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (email, password) => {
      return dispatch(loginRequest(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
