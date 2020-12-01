import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import callApiWithAuth from "../utils/apiCallerWithAuth";

export const getTagsAndParentCategoriesRequest = () => {
  return (dispatch) => {
    return callApi("api/news_author/init_available_data", "GET").then((res) => {
      if (res) {
        return dispatch(getAvailableParentCategory(res.data.parent_category));
      }
    });
  };
};
export const getAvailableTags = (tags) => {
  return {
    type: types.GET_ALL_TAGS,
    tags,
  };
};

export const getAvailableParentCategory = (parent_categories) => {
  return {
    type: types.GET_PARENT_CATEGORIES,
    parent_categories,
  };
};

export const getChildCategoriesRequest = (parent_id) => {
  return (dispatch) => {
    return callApi("api/news_author/parent_category_res_child_category/" + parent_id, "GET").then((res) => {
      if (res) return dispatch(getChildCategories(res.data.child_categories))
    });
  };
};

export const getChildCategories = (child_categories) => {
    return {
      type: types.PARENT_GET_CHILD_CATEGORIES,
      child_categories,
    };
  };
