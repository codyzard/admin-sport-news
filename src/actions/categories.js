import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
export const getAllCategoriesRequest = () => {
  return (dispatch) => {
    return callApi("api/admin/categories", "GET").then((res) => {
      if (res) return dispatch(getAllCategories(res.data.categories));
    });
  };
};
export const nextPage = (pageNumber) => {
  return (dispatch) => {
    return callApi("api/admin/categories?page="+pageNumber, "GET").then((res) => {
      if (res) return dispatch(getAllCategories(res.data.categories));
    });
  };
};
export const getAllCategories = (categories) => {
  return {
    type: types.GET_ALL_CATEGORIES,
    categories,
  };
};
