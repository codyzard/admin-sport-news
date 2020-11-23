import { isEmpty } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { loginRequest } from "../../actions/index";
class Login extends Component {
  state = {
    email: "",
    password: "",
    isChecked: false,
    loggedIn: false,
  };
  constructor(props) {
    super(props);
  }
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
    await this.props.login(email, password);
    if(!isEmpty(this.props.session)){
      this.props.history.push("/")
    }
  };
  onCheckedChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };
  componentDidMount() {
    var { user, access_token } = this.props.session;
    if (user && access_token) {
      this.setState({
        loggedIn: true,
      });
    }
  }
  formLogin = () => {
    return (
      <div className="splash-container">
        <div className="card mt-5">
          <div className="card-header text-center">
            <a href="../index.html">
              <img className="logo-img" src="/images/logo.png" alt="logo" />
            </a>
            <span className="splash-description">
              Please enter your user information.
            </span>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => this.onChangeInput(e)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => this.onChangeInput(e)}
                />
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    value={this.state.isChecked}
                    onClick={this.onCheckedChange}
                  />
                  <span className="custom-control-label">Remember Me</span>
                </label>
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
      </div>
    );
  };
  isLogged = () => {
    var access_token = JSON.parse(localStorage.getItem('access_token'));
    if(!isEmpty(access_token)) return true;
    return false;
  }
  render() {
    var { loggedIn } = this.state;
    return(
      this.isLogged() ? "" : this.formLogin()
    );
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
