import React, { Component } from "react";

class NotFound404 extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
            <div className="error-section">
              <img
                src="/images/404-page-web.jpg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFound404;
