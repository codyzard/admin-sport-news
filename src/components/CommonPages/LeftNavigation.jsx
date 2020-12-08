import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
class LeftNavigation extends Component {
  state = { access_token: null, user: null };
  author_menu = () => {
    return (
      <>
        <li className="nav-item ">
          <a
            className="nav-link"
            href="#"
            data-toggle="collapse"
            aria-expanded="false"
            data-target="#management-author"
            aria-controls="submenu-author"
          >
            <i className="fa fa-cog" aria-hidden="true"></i>
            {"Quản lý"} <span className="badge badge-success">6</span>
          </a>
          <div id="management-author" className="collapse submenu" style={{}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/management/news">
                  {"Bài viết cá nhân"}
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-sales.html">
                  {"Đang phát triển"}
                </a>
              </li>
            </ul>
          </div>
        </li>
      </>
    );
  };
  admin_menu = () => {
    return (
      <>
        <li className="nav-item ">
          <a
            className="nav-link active"
            href="#"
            data-toggle="collapse"
            aria-expanded="false"
            data-target="#submenu-1"
            aria-controls="submenu-1"
          >
            <i className="fas fa-chart-bar"></i>
            {"Thống kê"} <span className="badge badge-success">6</span>
          </a>
          <div id="submenu-1" className="collapse submenu" style={{}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu-1-2"
                  aria-controls="submenu-1-2"
                >
                  {"Đang phát triển"}
                </a>
                <div id="submenu-1-2" className="collapse submenu" style={{}}>
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link" href="index.html">
                        1
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="ecommerce-product.html">
                        2
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item ">
          <a
            className="nav-link"
            href="#"
            data-toggle="collapse"
            aria-expanded="false"
            data-target="#management"
            aria-controls="submenu-1"
          >
            <i className="fa fa-cog" aria-hidden="true"></i>
            {"Quản lý"} <span className="badge badge-success">6</span>
          </a>
          <div id="management" className="collapse submenu" style={{}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/management/categories">
                  {"Danh mục"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/management/white_list_news">
                  {"Bài viết"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/management/author_account">
                  {"Tác giả"}
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-sales.html">
                  {"Nhãn"}
                </a>
              </li>
              <li className="nav-item">
                <Link to="/management/approval_news" className="nav-link">
                  {"Kiểm duyệt bài viết"}
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </>
    );
  };
  leftNav = (user) => {
    return (
      <div className="nav-left-sidebar sidebar-dark">
        <div className="menu-list">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="d-xl-none d-lg-none" href="#">
              Dashboard
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav flex-column">
                <li className="nav-divider">Menu</li>
                {user.role === 1 ? this.admin_menu() : this.author_menu()}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  };
  componentDidMount() {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var user = JSON.parse(localStorage.getItem("user"));
    if (access_token && user) {
      this.setState({
        access_token: access_token,
        user: user,
      });
    }
  }
  static getDerivedStateFromProps(props, state) {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var user = JSON.parse(localStorage.getItem("user"));
    if (isEmpty(access_token)) {
      return {
        access_token: null,
        user: null,
      };
    } else if (!isEmpty(access_token)) {
      return {
        access_token: access_token,
        user: user,
      };
    }
    return null;
  }
  render() {
    var { access_token, user } = this.state;
    return <>{!isEmpty(access_token) ? this.leftNav(user) : ""}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavigation);
