import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { ThreeDots } from "@agney/react-loading";
import {
  getApprovalNewsRequest,
  nextPageApprovalNewsRequest,
  searchApprovalNewsRequest,
  searchNextPageApprovalNewsRequest,
  unmountSearchKeyword,
} from "../../../actions";
import {alertMessage} from '../../../utils/help_function'
import ApprovalNewsItem from "./ApprovalNewsItem";
class ApprovalListNews extends Component {
  state = {
    access_token: null,
    loading: true,
    approval_news: {},
    search: "",
  };
  async componentDidMount() {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    const header = { Authorization: `Bearer ${access_token}` };
    await this.props.getApprovalNews(header).catch(err => {
      if(err.response.status === 401){
        alertMessage('Lỗi', 'phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
      }
    });
    this.setState({
      approval_news: this.props.approval_news,
      loading: false,
    });
  }
  componentWillUnmount() {
    this.props.unmountSearchKeyword();
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
      alertMessage(
        "Lỗi",
        "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
      );
      this.setState({
        loading: false,
      });
      // this.props.history.push('/login')
    });;
  };
  static getDerivedStateFromProps(props, state) {
    if (props.approval_news !== state.approval_news) {
      return {
        approval_news: props.approval_news,
        loading: false,
        search: props.search,
      };
    }
    return null;
  }
  renderPagination = () => {
    var { approval_news } = this.state;
    var { current_page, per_page, total } = approval_news;
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
      alertMessage(
        "Lỗi",
        "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
      );
      this.setState({
        loading: false,
      });
      // this.props.history.push('/login')
    });;
  };
  render() {
    var { loading, approval_news, search } = this.state;
    var {from, to, total} = approval_news;
    var inShowing =
      "Showing " + from + " to " + to + " of " + total + " entries";
    if (approval_news.data) {
      var approval_list_news = approval_news.data.map((news, index) => {
        return <ApprovalNewsItem news={news} key={index} />;
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
                  <h2 className="pageheader-title">{"Kiểm duyệt bài viết"}</h2>
                  <div className="page-breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/" className="breadcrumb-link">
                            {"Thống kê"}
                          </Link>
                        </li>
                        <li className="breadcrumb-item">
                            {"Quản lý"}
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {"Kiểm duyệt bài viết"}
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
                                  placeholder={"Nhập tiêu đề, tóm tắt"}
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
                                    style={{ width: "30px" }}
                                  >
                                    ID
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
                                    Tiêu đề
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
                                    Ảnh tiêu đề
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
                                    Tóm tắt
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
                                    Nội dung
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
                                    Nhãn
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Position: activate to sort column ascending"
                                    style={{ width: "150px" }}
                                  >
                                    Danh mục
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Position: activate to sort column ascending"
                                    style={{ width: "10px" }}
                                  >
                                    Tin nóng
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
                              <tbody>{approval_list_news}</tbody>
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
    approval_news: state.approval_news,
    search: state.search,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getApprovalNews: (header) => {
      return dispatch(getApprovalNewsRequest(header));
    },
    nextPage: (header, pageNumber) => {
      return dispatch(nextPageApprovalNewsRequest(header, pageNumber));
    },
    searchApprovalNews: (header, keyword) => {
      return dispatch(searchApprovalNewsRequest(header, keyword));
    },
    unmountSearchKeyword: () =>{
      return dispatch(unmountSearchKeyword())
    },
    searchNextPage: (header, keyword, pageNumber) => {
      return dispatch(searchNextPageApprovalNewsRequest(header, keyword, pageNumber))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalListNews);
