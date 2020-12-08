import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "../../../actions";
import { isEmpty } from "lodash";
import { handleBlockorActiveRequest } from "../../../actions/author_account";
import { alertMessage } from "../../../utils/help_function";

class AuthorAccountItem extends Component {
  onBlockorActive = (e, user_id) => {
    var node = e.target;
    var value = null;
    if (node.parentNode.nodeName === "BUTTON") {
      value = node.parentNode.value;
    } else if (node.parentNode.nodeName === "SPAN") {
      value = node.parentNode.parentNode.value;
    } else value = node.value;
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    const header = { Authorization: `Bearer ${access_token}` };
    this.props
      .handleBlockorActive(header, user_id, value)
      .then(() => {
        alertMessage("Thông báo", "Phê duyệt thành công");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alertMessage(
            "Lỗi",
            "Phiên hết hạn, vui lòng đăng xuất rồi đăng nhập lại"
          );
        }
      });
  };
  render() {
    var { user } = this.props;
    var { name, email, role, user_info, activation } = user;
    if (!isEmpty(user_info))
      var { avatar_src, gender, birthday, address, phone } = user_info;

    var style, status_account;
    switch (activation) {
      case 0:
        status_account = "Bị khóa";
        style = {
          color: "#ff0000",
        };
        break;
      case 1:
        status_account = "Đã kích hoạt";
        style = {
          color: " #00ff00",
        };
        break;
      default:
        break;
    }
    return (
      <tr role="row">
        <td>{name}</td>
        <td>{email}</td>
        <td>
          <img
            style={{ width: "100px" }}
            src={avatar_src ? avatar_src : "/images/default-avatar.png"}
            alt="title img"
          />
        </td>
        <td>{gender === 1 ? "Nam" : "Nữ"}</td>
        <td>{birthday ? birthday : "N/A"}</td>
        <td>{address ? address : "N/A"}</td>
        <td>{phone ? phone : "N/A"}</td>
        <td>{role !== 1 ? "Tác giả" : "Quản trị viên"}</td>
        <td style={style}>{status_account}</td>
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
              Lựa chọn
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <button
                onClick={(e) => this.onBlockorActive(e, user.id)}
                value="1"
                className="dropdown-item  text-center text-success font-weight-bold"
                href="#"
              >
                <span>
                  <i className="fas fa-check" /> Mở
                </span>
              </button>
              <button
                onClick={(e) => this.onBlockorActive(e, user.id)}
                value="0"
                className="dropdown-item text-center text-danger font-weight-bold"
                href="#"
              >
                <span>
                  <i className="fa fa-times" aria-hidden="true" /> Khóa
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
    handleBlockorActive: (header, user_id, value) => {
      return dispatch(handleBlockorActiveRequest(header, user_id, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorAccountItem);
