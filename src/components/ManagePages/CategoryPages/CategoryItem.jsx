import React, { Component } from "react";

class CategoryItem extends Component {
  render() {
    var {category} = this.props
    return (
      <tr role="row">
        <td className="sorting_1">{category.id}</td>
        <td>{category.name}</td>
        <td>{category.description ? category.description : "N/A" }</td>
        <td>{category.parent_id ? category.parent_id : "cha" }</td>
        <td>
            <i className="fas fa-info-circle fa-1x mr-3" style={{color: "#0000FF"}}></i>
            <i className="fas fa-edit fa-1x mr-3" style={{color: "#ffa500"}} ></i>
            <i className="fas fa-trash-alt fa-1x mr-3" style={{color: "#d11a2a"}}></i>
        </td>
      </tr>
    );
  }
}
export default CategoryItem;
