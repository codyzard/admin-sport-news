import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer" style={{position: "absolute", bottom: "" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              Copyright © 2020 STE-News. Bản quyền bởi
              <a href="https://fb.com/mrahn123">{" Lê Hoàng Tú "}</a>.
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="text-md-right footer-links d-none d-sm-block">
                <a href="https://fb.com/mrahn123">Thông tin</a>
                <a href="https://fb.com/mrahn123">Hỗ trợ</a>
                <a href="https://fb.com/mrahn123">Liên hệ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
