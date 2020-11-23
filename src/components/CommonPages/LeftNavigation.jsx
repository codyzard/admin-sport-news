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
                <Link className="nav-link" to="/management/categories">
                  {"Bài viết cá nhân"}
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-finance.html">
                  {"News"}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-sales.html">
                  {"Author"}
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
            <i className="fa fa-fw fa-user-circle" />
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
                  E-Commerce
                </a>
                <div id="submenu-1-2" className="collapse submenu" style={{}}>
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link" href="index.html">
                        E Commerce Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="ecommerce-product.html">
                        Product List
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="ecommerce-product-single.html"
                      >
                        Product Single
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="ecommerce-product-checkout.html"
                      >
                        Product Checkout
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-finance.html">
                  Finance
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-sales.html">
                  Sales
                </a>
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
                <a className="nav-link" href="dashboard-finance.html">
                  {"Bài viết"}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-sales.html">
                  {"Tác giả"}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-sales.html">
                  {"Nhãn"}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard-sales.html">
                  {"Kiểm duyệt bài viết"}
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            data-toggle="collapse"
            aria-expanded="false"
            data-target="#submenu-2"
            aria-controls="submenu-2"
          >
            <i className="fa fa-fw fa-rocket" />
            UI Elements
          </a>
          <div id="submenu-2" className="collapse submenu" style={{}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="pages/cards.html">
                  Cards <span className="badge badge-secondary">New</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/general.html">
                  General
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/carousel.html">
                  Carousel
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/listgroup.html">
                  List Group
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/typography.html">
                  Typography
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/accordions.html">
                  Accordions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/tabs.html">
                  Tabs
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            data-toggle="collapse"
            aria-expanded="false"
            data-target="#submenu-3"
            aria-controls="submenu-3"
          >
            <i className="fas fa-fw fa-chart-pie" />
            Chart
          </a>
          <div id="submenu-3" className="collapse submenu" style={{}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="pages/chart-c3.html">
                  C3 Charts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/chart-chartist.html">
                  Chartist Charts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/chart-charts.html">
                  Chart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/chart-morris.html">
                  Morris
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/chart-sparkline.html">
                  Sparkline
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/chart-gauge.html">
                  Guage
                </a>
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
            data-target="#submenu-4"
            aria-controls="submenu-4"
          >
            <i className="fab fa-fw fa-wpforms" />
            Forms
          </a>
          <div id="submenu-4" className="collapse submenu" style={{}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="pages/form-elements.html">
                  Form Elements
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/form-validation.html">
                  Parsely Validations
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/multiselect.html">
                  Multiselect
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/datepicker.html">
                  Date Picker
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/bootstrap-select.html">
                  Bootstrap Select
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            data-toggle="collapse"
            aria-expanded="false"
            data-target="#submenu-5"
            aria-controls="submenu-5"
          >
            <i className="fas fa-fw fa-table" />
            Tables
          </a>
          <div id="submenu-5" className="collapse submenu" style={{}}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="pages/general-table.html">
                  General Tables
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/data-tables.html">
                  Data Tables
                </a>
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
