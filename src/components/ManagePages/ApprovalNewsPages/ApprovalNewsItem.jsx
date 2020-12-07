import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { approvalNewsRequest } from "../../../actions";
import { isEmpty } from "lodash";
class ApprovalNewsItem extends Component {
  alertMessage = (title, message) => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: "OK",
        },
      ],
    });
  };
  onApproval = (e, news_id) => {
    var node = e.target;
    var value = null;
    if (node.parentNode.nodeName === "BUTTON") {
      value = node.parentNode.value;
    } else if (node.parentNode.nodeName === "SPAN") {
      value = node.parentNode.parentNode.value;
    } else value = node.value;
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    const header = { Authorization: `Bearer ${access_token}` };
    this.props.approvalNews(header, news_id, value).then(()=>{
      this.alertMessage(
        "Thông báo",
        "Phê duyệt thành công"
      );
    }).catch(err => {
      console.log(err);
      this.alertMessage(
        "Lỗi",
        "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
      );
    });

  };
  render() {
    var { news } = this.props;
    var {
      id,
      title,
      title_img,
      summary,
      html_content,
      hot_or_nor,
      tags,
      categories,
    } = news;
    var list_tag = tags.map((t) => {
      return t.name;
    });
    var list_category = categories.map((t) => {
      return t.name;
    });
    return (
      <tr role="row">
        <td className="sorting_1">{id}</td>
        <td>{title}</td>
        <td>
          <img style={{ width: "200px" }} src={title_img} alt="title img" />
        </td>
        <td>{summary}</td>
        <td>{!isEmpty(html_content) ? html_content.substring(1, 50) + "..." : ""}</td>
        <td>{list_tag.toString()}</td>
        <td>{list_category.toString()}</td>
        <td>{hot_or_nor === 1 ? "Có" : "Không"}</td>
        <td>
          <div className="dropdown show">
            <a
              className="btn btn-info dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Duyệt bài viết
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <button
                onClick={(e) => this.onApproval(e, news.id)}
                value="1"
                className="dropdown-item text-center text-success font-weight-bold"
                href="#"
              >
                <span>
                  <i className="fas fa-check" /> Duyệt
                </span>
              </button>
              <button
                onClick={(e) => this.onApproval(e, news.id)}
                value="2"
                className="dropdown-item text-center text-danger font-weight-bold"
                href="#"
              >
                <span>
                  <i className="fa fa-times" aria-hidden="true" /> Hủy bỏ
                </span>
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    approvalNews: (header, news_id, status) => {
      return dispatch(approvalNewsRequest(header, news_id, status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalNewsItem);
