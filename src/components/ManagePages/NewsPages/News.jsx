import { isEmpty } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
} from "../../../actions/index";
import Pagination from "react-js-pagination";
import { ThreeDots } from "@agney/react-loading";
class News extends Component {
  state = {
    access_token: null,
    user: null,
    categories: null,
    loading: false,
  };
  render() {
    var {loading} = this.state;
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
                          <div className="col-sm-12 col-md-6 mb-2">
                            <div
                              id="DataTables_Table_0_filter"
                              className="dataTables_filter"
                            >
                              <Link to="/management/news/create" data-toggle="tooltip" title={"Thêm danh mục"}>
                                <i
                                  className="fa fa-plus fa-2x"
                                  style={{ float: "right", marginTop: "6%", color: "#00ff00" }}
                                  aria-hidden="true"
                                ></i>
                              </Link>
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
                              <tbody>
                                  
                             </tbody>
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
                             
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="DataTables_Table_0_paginate"
                            >
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
    
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
