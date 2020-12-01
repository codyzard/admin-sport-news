import React, { Component } from "react";

class NotFound404 extends Component {
  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="error-section">
              <img
                src="/images/404-page-web.jpg"
                alt=""
                className="img-fluid"
                style={{width: '100%'}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFound404;
