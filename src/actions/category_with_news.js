import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";

export const getCategoryWithNewsRequest = () => {
  return (dispatch) => {
    return callApi("api/admin/category_with_amount_of_news", "GET").then((res) => {
      if (res) return dispatch(getCategoryWithNews(res.data.cate_news));
    });
  };
};

export const getCategoryWithNews = (cate_news) => {
  return {
    type: types.CATEGORY_AMOUNT_OF_NEWS,
    cate_news,
  };
};