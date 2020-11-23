import { isEmpty } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import {
  getAllCategoriesRequest,
  nextPage,
  loading,
  unloading,
} from "../../../actions/index";
import Pagination from "react-js-pagination";
import { ThreeDots } from "@agney/react-loading";
class Categories extends Component {
  state = {
    access_token: null,
    user: null,
    categories: null,
    loading: true,
  };
  async componentDidMount() {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var user = JSON.parse(localStorage.getItem("user"));
    if (isEmpty(access_token)) {
      this.props.history.push("/login");
    } else {
      if (!user.role) this.props.history.push("/notfound");
      else if (access_token && user) {
        await this.props.getAllCategories();
        this.setState({
          access_token: access_token,
          user: user,
        });
      }
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.categories !== state.categories) {
      return {
        categories: props.categories,
        loading: false,
      };
    }
    return null;
  }
  componentDidUpdate(preProps, preState) {
    if (preProps.categories !== this.props.categories) {
      this.setState({
        loading: false,
      });
    }
  }
  renderCategories = () => {
    var { categories } = this.state;
    var { data } = categories;
    if (!isEmpty(categories)) {
      var list_category = data.map((c, index) => {
        return <CategoryItem key={index} category={c} />;
      });
    }
    return list_category;
  };
  nextPage = async (pageNumber) => {
    this.setState({
      loading: true,
    });
    await new Promise((r) => setTimeout(r, 200));
    await this.props.nextPage(pageNumber);
  };
  renderPagination = () => {
    var { categories } = this.state;
    var { current_page, per_page, total } = categories;
    return (
      <Pagination
        activePage={current_page}
        totalItemsCount={total}
        itemsCountPerPage={per_page}
        onChange={(pageNumber) => this.nextPage(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
        firstPageText={"Đầu"}
        lastPageText={"Cuối"}
      />
    );
  };
  render() {
    var { per_page, total } = this.state.categories;
    var { loading } = this.state;
    var inShowing = "Showing 1 to " + per_page + " of " + total + " entries";
    return (
      <div className="dashboard-wrapper">
        {loading === true ? (
          <ThreeDots color="#00BFFF" height="800" width="100%" />
        ) : (
          <div className="container-fluid  dashboard-content">
            {/* ============================================================== */}
            {/* pageheader */}
            {/* ============================================================== */}
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="page-header">
                  <h2 className="pageheader-title">{"Danh mục"}</h2>
                  <div className="page-breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/" className="breadcrumb-link">
                            {"Thống kê"}
                          </Link>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="#" className="breadcrumb-link">
                            {"Quản lý"}
                          </a>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {"Danh mục"}
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            {/* ============================================================== */}
            {/* end pageheader */}
            {/* ============================================================== */}
            <div className="row">
              {/* ============================================================== */}
              {/* basic table  */}
              {/* ============================================================== */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <div
                        id="DataTables_Table_0_wrapper"
                        className="dataTables_wrapper dt-bootstrap4"
                      >
                        <div className="row">
                          <div className="col-sm-12 col-md-6 mb-2">
                            <div
                              id="DataTables_Table_0_filter"
                              className="dataTables_filter"
                            >
                              <label>
                                Search:
                                <input
                                  type="search"
                                  className="form-control form-control-sm"
                                  placeholder={"Nhập từ khóa"}
                                  aria-controls="DataTables_Table_0"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-sm-12">
                            <table
                              className="table table-striped table-bordered first dataTable"
                              id="DataTables_Table_0"
                              role="grid"
                              aria-describedby="DataTables_Table_0_info"
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    className="sorting_asc"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="ascending"
                                    aria-label="Name: activate to sort column descending"
                                    style={{ width: "100px" }}
                                  >
                                    ID
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Position: activate to sort column ascending"
                                    style={{ width: "200px" }}
                                  >
                                    Tên danh mục
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Office: activate to sort column ascending"
                                    style={{ width: "350px" }}
                                  >
                                    Mô tả
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Age: activate to sort column ascending"
                                    style={{ width: "100px" }}
                                  >
                                    ID Danh mục cha
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Start date: activate to sort column ascending"
                                    style={{ width: "15%" }}
                                  >
                                    Hành động
                                  </th>
                                </tr>
                              </thead>
                              <tbody>{this.renderCategories()}</tbody>
                            </table>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div
                              className="dataTables_info"
                              id="DataTables_Table_0_info"
                              role="status"
                              aria-live="polite"
                            >
                              {inShowing}
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="DataTables_Table_0_paginate"
                            >
                              {this.renderPagination()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ============================================================== */}
              {/* end basic table  */}
              {/* ============================================================== */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllCategories: () => {
      return dispatch(getAllCategoriesRequest());
    },
    nextPage: (pageNumber) => {
      return dispatch(nextPage(pageNumber));
    },
    loading: () => {
      return dispatch(loading());
    },
    unloading: () => {
      return dispatch(unloading());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
