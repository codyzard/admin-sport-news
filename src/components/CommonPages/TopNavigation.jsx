import { isEmpty } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {logout} from '../../actions/index';
class TopNavigation extends Component {
  state = {
    access_token: null,
    user: null
  };
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login')
  }
  loadInfo = (name) => {
    return (
      <li className="nav-item dropdown nav-user">
        <a
          className="nav-link nav-user-img"
          href="#"
          id="navbarDropdownMenuLink2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src="/images/avatar-1.jpg"
            alt=""
            className="user-avatar-md rounded-circle"
          />
        </a>
        <div
          className="dropdown-menu dropdown-menu-right nav-user-dropdown"
          aria-labelledby="navbarDropdownMenuLink2"
        >
          <div className="nav-user-info">
            <h5 className="mb-0 text-white nav-user-name"> {name} </h5>
            <span className="status" />
            <span className="ml-2">Đang hoạt động</span>
          </div>
          <a className="dropdown-item" href="#">
            <i className="fas fa-user mr-2" />
            Tài khoản
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-cog mr-2" />
            Cài đặt
          </a>
          <a className="dropdown-item" href="#" onClick={(e) => this.handleLogout(e)} >
            <i className="fas fa-power-off mr-2" />
            {"Đăng xuất"}
          </a>
        </div>
      </li>
    );
  };
  loadLogInBtn = () => {
    return (
      // <li className="nav-item">
      //   <Link
      //     className="nav-link"
      //     to="/login"
      //     id="navbarDropdownMenuLink2"
      //     data-toggle="dropdown"
      //     aria-haspopup="true"
      //     aria-expanded="false"
      //   >
      //     {"Đăng nhập"}
      //   </Link>
      // </li>
      ""
    );
  };
  componentDidMount(){
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var user = JSON.parse(localStorage.getItem("user"));
    if(access_token && user){
      this.setState({
        access_token: access_token,
        user: user,
      })
    } 
  }
  static getDerivedStateFromProps(props, state){
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var user = JSON.parse(localStorage.getItem("user"));
    if(isEmpty(access_token)){
      return {
        access_token: null,
        user: null
      }
    }
    else if (!isEmpty(access_token)){
      return {
        access_token: access_token,
        user: user
      }
    }
    return null;
  }
  render() {
    var { access_token, user } = this.state;
    return (
      <div className="dashboard-header">
        <nav className="navbar navbar-expand-lg bg-white fixed-top">
          <Link className="navbar-brand" to="/">
            Concept
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto navbar-right-top">
              {!isEmpty(access_token) ? this.loadInfo(user ? user.name : "") : this.loadLogInBtn()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: ()=>{
      return dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopNavigation));

