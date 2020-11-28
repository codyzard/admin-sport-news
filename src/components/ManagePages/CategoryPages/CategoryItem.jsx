import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { destroyCategoryRequest } from "../../../actions";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
class CategoryItem extends Component {
  onDelete = (category_id) => {
    confirmAlert({
      title: "Thông báo?",
      message: "Bạn có chắc muốn xóa không",
      buttons: [
        {
          label: "Có",
          onClick: () => this.props.destroyCategory(category_id),
        },
        {
          label: "Không",
          onClick: () => "",
        },
      ],
    });
  };
  render() {
    var { category } = this.props;
    return (
      <tr role="row">
        <td className="sorting_1">{category.id}</td>
        <td>{category.name}</td>
        <td>{category.description ? category.description : "N/A"}</td>
        <td>{category.parent_id ? category.parent_id : "cha"}</td>
        <td>
          <Link
            to={{
              pathname: `/management/categories/${category.id}`,
              state: {
                category: category,
              },
            }}
          >
            <i
              className="fas fa-info-circle fa-1x mr-3"
              style={{ color: "#0000FF" }}
            ></i>
          </Link>
          <Link
            to={{
              pathname: `/management/categories/${category.id}`,
              state: {
                category: category,
              },
            }}
          >
            <i
              className="fas fa-edit fa-1x mr-3"
              style={{ color: "#ffa500" }}
            ></i>
          </Link>
          <i
            className="fas fa-trash-alt fa-1x mr-3"
            onClick={() => this.onDelete(category.id)}
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
    destroyCategory: (category_id) => {
      return dispatch(destroyCategoryRequest(category_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
