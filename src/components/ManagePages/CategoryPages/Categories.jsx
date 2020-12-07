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
  searchCategoriesRequest,
  searchNextPage,
  unmountSearchKeyword,
} from "../../../actions/index";
import Pagination from "react-js-pagination";
import { ThreeDots } from "@agney/react-loading";
class Categories extends Component {
  state = {
    access_token: null,
    user: null,
    categories: null,
    loading: true,
    search: "",
  };
  async componentDidMount() {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var user = JSON.parse(localStorage.getItem("user"));
    var {search} = this.props;
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
  componentWillUnmount(){
    this.props.unmountSearchKeyword();
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
    if (!isEmpty(data)) {
      var list_category = data.map((c, index) => {
        return <CategoryItem key={index} category={c} />;
      });
    }
    return list_category;
  };
  nextPage = async (pageNumber) => {
    let {search} = this.state;
    this.setState({
      loading: true,
    });
    await new Promise((r) => setTimeout(r, 200));
    if (!isEmpty(search)) {
      await this.props.searchNextPage(search, pageNumber);
    }
    else await this.props.nextPage(pageNumber);
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
    this.setState({ loading: true });
    await this.props.searchCategories(search);
  };
  render() {
    var { per_page, total, from, to } = this.state.categories;
    var { loading, search } = this.state;
    var inShowing =
      "Showing " + from + " to " + to + " of " + total + " entries";
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
                            {"Trang chủ"}
                          </Link>
                        </li>
                        <li className="breadcrumb-item">{"Quản lý"}</li>
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
                                  placeholder={"Nhập tên danh mục"}
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
                          <div className="col-sm-12 col-md-6 col-lg-4 mb-2">
                            <div
                              id="DataTables_Table_0_filter"
                              className="dataTables_filter"
                            >
                              <Link
                                to="/management/categories/create"
                                data-toggle="tooltip"
                                title={"Thêm danh mục"}
                              >
                                <i
                                  className="fa fa-plus fa-2x"
                                  style={{
                                    float: "right",
                                    marginTop: "6%",
                                    color: "#00ff00",
                                  }}
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
                                    style={{ width: "250px" }}
                                  >
                                    Mô tả
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Office: activate to sort column ascending"
                                    style={{ width: "100px" }}
                                  >
                                    Số bài viết
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
    search: state.search,
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
    searchCategories: (keyword) => {
      return dispatch(searchCategoriesRequest(keyword));
    },
    searchNextPage: (keyword, pageNumber) => {
      return dispatch(searchNextPage(keyword, pageNumber));
    },
    unmountSearchKeyword: () => {
      return dispatch(unmountSearchKeyword());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
