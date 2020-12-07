import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { isEmpty } from "lodash";
class NewsItem extends Component {
  onDelete = (category_id) => {
    confirmAlert({
      title: "Thông báo?",
      message: "Bạn có chắc muốn xóa không",
      buttons: [
        {
          label: "Có",
        },
        {
          label: "Không",
          onClick: () => "",
        },
      ],
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
      status,
    } = news;
    var list_tag = tags.map((t) => {
      return t.name;
    });
    var list_category = categories.map((t) => {
      return t.name;
    });
    var status_news = "";
    var style;
    switch (status) {
      case 0:
        status_news = "Chờ xử lý";
        style = {
            color: "#CCCC00"
        }
        break;
      case 1:
        status_news = "Đã duyệt";
        style = {
            color: " #00ff00"
        }
        break;
      case 2:
        status_news = "Đã hủy bỏ";
        style = {
            color: " #ff0000"
        }
        break;
      default:
        break;
    }
    return (
      <tr role="row">
        <td className="sorting_1">{id}</td>
        <td>{title}</td>
        <td>
          <img style={{ width: "200px" }} src={title_img} alt="title img"/>
        </td>
        <td>{summary}</td>
        <td>{!isEmpty(html_content) ? html_content.substring(1, 50) + "..." : ""}</td>
        <td>{list_tag.toString()}</td>
        <td>{list_category.toString()}</td>
        <td>{hot_or_nor === 1 ? "Có" : "Không"}</td>
        <td style={style}>{status_news}</td>
        <td>
          <Link
            to={{
              pathname: `/management/news/${news.id}`,
              state: {
                news: news,
              }
            }}
          >
            <i
              className="fas fa-edit fa-1x mr-3"
              style={{ color: "#ffa500" }}
            ></i>
          </Link>
          <i
            className="fas fa-trash-alt fa-1x"
            onClick={() => this.onDelete()}
            style={{ color: "#d11a2a" }}
          ></i>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);
