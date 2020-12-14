import { isEmpty } from "lodash";
import React, { Component } from "react";
import Footer from "../CommonPages/Footer";
class ChartPage extends Component {
  componentDidMount() {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    if (isEmpty(access_token)) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard-ecommerce">
          <div className="container-fluid dashboard-content ">
            {/* ============================================================== */}
            {/* pageheader  */}
            {/* ============================================================== */}
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="page-header">
                  <h2 className="pageheader-title">
                    E-commerce Dashboard Template{" "}
                  </h2>
                  <p className="pageheader-text">
                    Nulla euismod urna eros, sit amet scelerisque torton lectus
                    vel mauris facilisis faucibus at enim quis massa lobortis
                    rutrum.
                  </p>
                  <div className="page-breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <a href="#" className="breadcrumb-link">
                            Dashboard
                          </a>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          E-Commerce Dashboard Template
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            {/* ============================================================== */}
            {/* end pageheader  */}
            {/* ============================================================== */}
            <div className="ecommerce-widget">
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-muted">Total Revenue</h5>
                      <div className="metric-value d-inline-block">
                        <h1 className="mb-1">$12099</h1>
                      </div>
                      <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                        <span>
                          <i className="fa fa-fw fa-arrow-up" />
                        </span>
                        <span>5.86%</span>
                      </div>
                    </div>
                    <div id="sparkline-revenue" />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-muted">Affiliate Revenue</h5>
                      <div className="metric-value d-inline-block">
                        <h1 className="mb-1">$12099</h1>
                      </div>
                      <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                        <span>
                          <i className="fa fa-fw fa-arrow-up" />
                        </span>
                        <span>5.86%</span>
                      </div>
                    </div>
                    <div id="sparkline-revenue2" />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-muted">Refunds</h5>
                      <div className="metric-value d-inline-block">
                        <h1 className="mb-1">0.00</h1>
                      </div>
                      <div className="metric-label d-inline-block float-right text-primary font-weight-bold">
                        <span>N/A</span>
                      </div>
                    </div>
                    <div id="sparkline-revenue3" />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-muted">Avg. Revenue Per User</h5>
                      <div className="metric-value d-inline-block">
                        <h1 className="mb-1">$28000</h1>
                      </div>
                      <div className="metric-label d-inline-block float-right text-secondary font-weight-bold">
                        <span>-2.00%</span>
                      </div>
                    </div>
                    <div id="sparkline-revenue4" />
                  </div>
                </div>
              </div>
              <div className="row">
                {/* ============================================================== */}
                {/* ============================================================== */}
                {/* recent orders  */}
                {/* ============================================================== */}
                <div className="col-xl-9 col-lg-12 col-md-6 col-sm-12 col-12">
                  <div className="card">
                    <h5 className="card-header">Recent Orders</h5>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="bg-light">
                            <tr className="border-0">
                              <th className="border-0">#</th>
                              <th className="border-0">Image</th>
                              <th className="border-0">Product Name</th>
                              <th className="border-0">Product Id</th>
                              <th className="border-0">Quantity</th>
                              <th className="border-0">Price</th>
                              <th className="border-0">Order Time</th>
                              <th className="border-0">Customer</th>
                              <th className="border-0">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <div className="m-r-10">
                                  <img
                                    src="/images/product-pic.jpg"
                                    alt="user"
                                    className="rounded"
                                    width={45}
                                  />
                                </div>
                              </td>
                              <td>Product #1 </td>
                              <td>id000001 </td>
                              <td>20</td>
                              <td>$80.00</td>
                              <td>27-08-2018 01:22:12</td>
                              <td>Patricia J. King </td>
                              <td>
                                <span className="badge-dot badge-brand mr-1" />
                                InTransit{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                <div className="m-r-10">
                                  <img
                                    src="/images/product-pic-2.jpg"
                                    alt="user"
                                    className="rounded"
                                    width={45}
                                  />
                                </div>
                              </td>
                              <td>Product #2 </td>
                              <td>id000002 </td>
                              <td>12</td>
                              <td>$180.00</td>
                              <td>25-08-2018 21:12:56</td>
                              <td>Rachel J. Wicker </td>
                              <td>
                                <span className="badge-dot badge-success mr-1" />
                                Delivered{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>
                                <div className="m-r-10">
                                  <img
                                    src="/images/product-pic-3.jpg"
                                    alt="user"
                                    className="rounded"
                                    width={45}
                                  />
                                </div>
                              </td>
                              <td>Product #3 </td>
                              <td>id000003 </td>
                              <td>23</td>
                              <td>$820.00</td>
                              <td>24-08-2018 14:12:77</td>
                              <td>Michael K. Ledford </td>
                              <td>
                                <span className="badge-dot badge-success mr-1" />
                                Delivered{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>
                                <div className="m-r-10">
                                  <img
                                    src="/images/product-pic-4.jpg"
                                    alt="user"
                                    className="rounded"
                                    width={45}
                                  />
                                </div>
                              </td>
                              <td>Product #4 </td>
                              <td>id000004 </td>
                              <td>34</td>
                              <td>$340.00</td>
                              <td>23-08-2018 09:12:35</td>
                              <td>Michael K. Ledford </td>
                              <td>
                                <span className="badge-dot badge-success mr-1" />
                                Delivered{" "}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={9}>
                                <a
                                  href="#"
                                  className="btn btn-outline-light float-right"
                                >
                                  View Details
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============================================================== */}
                {/* end recent orders  */}
                {/* ============================================================== */}
                {/* ============================================================== */}
                {/* customer acquistion  */}
                {/* ============================================================== */}
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card">
                    <h5 className="card-header">Customer Acquisition</h5>
                    <div className="card-body">
                      <div
                        className="ct-chart ct-golden-section"
                        style={{ height: "354px" }}
                      />
                      <div className="text-center">
                        <span className="legend-item mr-2">
                          <span className="fa-xs text-primary mr-1 legend-tile">
                            <i className="fa fa-fw fa-square-full" />
                          </span>
                          <span className="legend-text">Returning</span>
                        </span>
                        <span className="legend-item mr-2">
                          <span className="fa-xs text-secondary mr-1 legend-tile">
                            <i className="fa fa-fw fa-square-full" />
                          </span>
                          <span className="legend-text">First Time</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============================================================== */}
                {/* end customer acquistion  */}
                {/* ============================================================== */}
              </div>
              <div className="row">
                {/* ============================================================== */}
                {/* product category  */}
                {/* ============================================================== */}
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card">
                    <h5 className="card-header"> Product Category</h5>
                    <div className="card-body">
                      <div
                        className="ct-chart-category ct-golden-section"
                        style={{ height: "315px" }}
                      />
                      <div className="text-center m-t-40">
                        <span className="legend-item mr-3">
                          <span className="fa-xs text-primary mr-1 legend-tile">
                            <i className="fa fa-fw fa-square-full " />
                          </span>
                          <span className="legend-text">Man</span>
                        </span>
                        <span className="legend-item mr-3">
                          <span className="fa-xs text-secondary mr-1 legend-tile">
                            <i className="fa fa-fw fa-square-full" />
                          </span>
                          <span className="legend-text">Woman</span>
                        </span>
                        <span className="legend-item mr-3">
                          <span className="fa-xs text-info mr-1 legend-tile">
                            <i className="fa fa-fw fa-square-full" />
                          </span>
                          <span className="legend-text">Accessories</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============================================================== */}
                {/* end product category  */}
                {/* product sales  */}
                {/* ============================================================== */}
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-header">
                      {/* <div class="float-right">
                                            <select class="custom-select">
                                                <option selected>Today</option>
                                                <option value="1">Weekly</option>
                                                <option value="2">Monthly</option>
                                                <option value="3">Yearly</option>
                                            </select>
                                        </div> */}
                      <h5 className="mb-0"> Product Sales</h5>
                    </div>
                    <div className="card-body">
                      <div className="ct-chart-product ct-golden-section" />
                    </div>
                  </div>
                </div>
                {/* ============================================================== */}
                {/* end product sales  */}
                {/* ============================================================== */}
                <div className="col-xl-3 col-lg-12 col-md-6 col-sm-12 col-12">
                  {/* ============================================================== */}
                  {/* top perfomimg  */}
                  {/* ============================================================== */}
                  <div className="card">
                    <h5 className="card-header">Top Performing Campaigns</h5>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table no-wrap p-table">
                          <thead className="bg-light">
                            <tr className="border-0">
                              <th className="border-0">Campaign</th>
                              <th className="border-0">Visits</th>
                              <th className="border-0">Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Campaign#1</td>
                              <td>98,789 </td>
                              <td>$4563</td>
                            </tr>
                            <tr>
                              <td>Campaign#2</td>
                              <td>2,789 </td>
                              <td>$325</td>
                            </tr>
                            <tr>
                              <td>Campaign#3</td>
                              <td>1,459 </td>
                              <td>$225</td>
                            </tr>
                            <tr>
                              <td>Campaign#4</td>
                              <td>5,035 </td>
                              <td>$856</td>
                            </tr>
                            <tr>
                              <td>Campaign#5</td>
                              <td>10,000 </td>
                              <td>$1000</td>
                            </tr>
                            <tr>
                              <td>Campaign#5</td>
                              <td>10,000 </td>
                              <td>$1000</td>
                            </tr>
                            <tr>
                              <td colSpan={3}>
                                <a
                                  href="#"
                                  className="btn btn-outline-light float-right"
                                >
                                  Details
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* ============================================================== */}
                  {/* end top perfomimg  */}
                  {/* ============================================================== */}
                </div>
              </div>
              <div className="row">
                {/* ============================================================== */}
                {/* sales  */}
                {/* ============================================================== */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="card border-3 border-top border-top-primary">
                    <div className="card-body">
                      <h5 className="text-muted">Sales</h5>
                      <div className="metric-value d-inline-block">
                        <h1 className="mb-1">$12099</h1>
                      </div>
                      <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                        <span className="icon-circle-small icon-box-xs text-success bg-success-light">
                          <i className="fa fa-fw fa-arrow-up" />
                        </span>
                        <span className="ml-1">5.86%</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============================================================== */}
                {/* end sales  */}
                {/* ============================================================== */}
                {/* ============================================================== */}
                {/* new customer  */}
                {/* ============================================================== */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="card border-3 border-top border-top-primary">
                    <div className="card-body">
                      <h5 className="text-muted">New Customer</h5>
                      <div className="metric-value d-inline-block">
                        <h1 className="mb-1">1245</h1>
                      </div>
                      <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                        <span className="icon-circle-small icon-box-xs text-success bg-success-light">
                          <i className="fa fa-fw fa-arrow-up" />
                        </span>
                        <span className="ml-1">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============================================================== */}
                {/* end new customer  */}
                {/* ============================================================== */}
                {/* ============================================================== */}
                {/* visitor  */}
                {/* ============================================================== */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="card border-3 border-top border-top-primary">
                    <div className="card-body">
                      <h5 className="text-muted">Visitor</h5>
                      <div className="metric-value d-inline-block">
                        <h1 className="mb-1">13000</h1>
                      </div>
                      <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                        <span className="icon-circle-small icon-box-xs text-success bg-success-light">
                          <i className="fa fa-fw fa-arrow-up" />
                        </span>
                        <span className="ml-1">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============================================================== */}
                {/* end visitor  */}
                {/* ============================================================== */}
                {/* ============================================================== */}
                {/* total orders  */}
                {/* ============================================================== */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="card border-3 border-top border-top-primary">
                    <div className="card-body">
                      <h5 className="text-muted">Total Orders</h5>
                      <div className="metric-value d-inline-block">
                        <h1 className="mb-1">1340</h1>
                      </div>
                      <div className="metric-label d-inline-block float-right text-danger font-weight-bold">
                        <span className="icon-circle-small icon-box-xs text-danger bg-danger-light bg-danger-light ">
                          <i className="fa fa-fw fa-arrow-down" />
                        </span>
                        <span className="ml-1">4%</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============================================================== */}
                {/* end total orders  */}
                {/* ============================================================== */}
              </div>
              <div className="row">
                {/* ============================================================== */}
                {/* total revenue  */}
                {/* ============================================================== */}
                {/* ============================================================== */}
                {/* ============================================================== */}
              </div>
            </div>
          </div>
        </div>
        {/* ============================================================== */}
        {/* footer */}
        {/* ============================================================== */}
        <Footer />
        {/* ============================================================== */}
        {/* end footer */}
        {/* ============================================================== */}
      </div>
    );
  }
}

export default ChartPage;
