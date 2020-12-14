import { isEmpty } from "lodash";
import React, { Component } from "react";
import Footer from "../CommonPages/Footer";
class Homepage extends Component {
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
            <h1 style={{marginBottom: "520px"}}>Hệ thống tin tức thể thao STE</h1>
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

export default Homepage;
