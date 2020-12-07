import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { ThreeDots } from "@agney/react-loading";
import {getAuthorAccountRequest} from "../../../actions";
import AuthorAccountItem from "./AuthorAccountItem";
class AuthorAccount extends Component {
  state = {
    access_token: null,
    loading: true,
    search: "",
    author_account: {},
  };
  async componentDidMount() {
    let access_token = JSON.parse(localStorage.getItem("access_token"));
    const header = { Authorization: `Bearer ${access_token}` };
    await this.props.getAuthorAccount(header);
    let { author_account } = this.props;
    this.setState({ loading: false, author_account });
  }
  componentWillUnmount() {
    // this.props.unmountSearchKeyword();
  }
  nextPage = async (pageNumber) => {
    let { search } = this.state;
    this.setState({
      loading: true,
    });
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    const header = { Authorization: `Bearer ${access_token}` };

    await new Promise((r) => setTimeout(r, 200));
    await this.props.searchNextPage(header, search, pageNumber).catch((err) => {
      console.log(err);
      this.alertError(
        "Lỗi",
        "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
      );
      this.setState({
        loading: false,
      });
      // this.props.history.push('/login')
    });
  };
  static getDerivedStateFromProps(props, state) {
    if (props.author_account !== state.author_account) {
      return {
        author_account: props.author_account,
        loading: false,
        // search: props.search,
      };
    }
    return null;
  }
  renderPagination = () => {
    // var { approval_news } = this.state;
    // var { current_page, per_page, total } = approval_news;
    // return (
    //   <Pagination
    //     activePage={current_page}
    //     totalItemsCount={total}
    //     itemsCountPerPage={per_page}
    //     onChange={(pageNumber) => this.nextPage(pageNumber)}
    //     itemClass="page-item"
    //     linkClass="page-link"
    //     firstPageText={"Đầu"}
    //     lastPageText={"Cuối"}
    //   />
    // );
  };
  onEnter = async (e) => {
    if (e.keyCode === 13) {
      await this.onSearch();
    }
  };
  onChange = (e) => {
    var search = e.target.value;
    this.setState({ search });
  };
  onSumbit = async (e) => {
    await this.onSearch();
  };
  onSearch = async () => {
    var { search } = this.state;
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    const header = { Authorization: `Bearer ${access_token}` };
    this.setState({ loading: true });
    await this.props.searchApprovalNews(header, search).catch((err) => {
      console.log(err);
      this.alertError(
        "Lỗi",
        "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
      );
      this.setState({
        loading: false,
      });
      // this.props.history.push('/login')
    });
  };
  render() {
    var { loading, search, author_account } = this.state;
    var { from, to, total } = author_account;
    // var inShowing =
    //   "Showing " + from + " to " + to + " of " + total + " entries";
    if (author_account.data) {
      var list_author_account = author_account.data.map((user, index) => {
        return <AuthorAccountItem user={user} key={index} />;
      });
    }
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
                  <h2 className="pageheader-title">{"Tài khoản tác giả"}</h2>
                  <div className="page-breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/" className="breadcrumb-link">
                            {"Thống kê"}
                          </Link>
                        </li>
                        <li className="breadcrumb-item">{"Quản lý"}</li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {"Tài khoản tác giả"}
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
                          <div className="col-sm-12 col-md-6 col-lg-8 mb-2">
                            <div
                              id="DataTables_Table_0_filter"
                              className="dataTables_filter"
                            >
                              <label>
                                Tìm kiếm:
                                <input
                                  type="search"
                                  className="form-control form-control-sm"
                                  placeholder={"Nhập tên hoặc email tác giả"}
                                  aria-controls="DataTables_Table_0"
                                  onKeyDown={(e) => this.onEnter(e)}
                                  onChange={(e) => this.onChange(e)}
                                  defaultValue={search}
                                />
                              </label>
                              <button
                                className="ml-2"
                                onClick={(e) => this.onSumbit(e)}
                              >
                                <i
                                  className="fa fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
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
                                    style={{ width: "200px" }}
                                  >
                                    Tên
                                  </th>
                                  <th
                                    className="sorting_asc"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="ascending"
                                    aria-label="Name: activate to sort column descending"
                                    style={{ width: "200px" }}
                                  >
                                    Ảnh đại diện
                                  </th>
                                  <th
                                    className="sorting_asc"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="ascending"
                                    aria-label="Name: activate to sort column descending"
                                    style={{ width: "75px" }}
                                  >
                                    Giới tính
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
                                    Ngày sinh
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Position: activate to sort column ascending"
                                    style={{ width: "300px" }}
                                  >
                                    Địa chỉ
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Position: activate to sort column ascending"
                                    style={{ width: "100px" }}
                                  >
                                    Số điện thoại
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Position: activate to sort column ascending"
                                    style={{ width: "125px" }}
                                  >
                                    Vai trò
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Position: activate to sort column ascending"
                                    style={{ width: "125px" }}
                                  >
                                    Trạng thái
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Start date: activate to sort column ascending"
                                    style={{ width: "6%" }}
                                  >
                                    Hành động
                                  </th>
                                </tr>
                              </thead>
                              <tbody>{list_author_account}</tbody>
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
                              {/* {inShowing} */}
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="DataTables_Table_0_paginate"
                            >
                              {/* {this.renderPagination()} */}
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
    author_account: state.author_account,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAuthorAccount: (header) => {
      return dispatch(getAuthorAccountRequest(header));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorAccount);
