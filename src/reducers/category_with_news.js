import * as types from "../constants/ActionTypes";
var initialState = [];

const category_with_news = (state = initialState, action) => {
  switch (action.type) {
    case types.CATEGORY_AMOUNT_OF_NEWS:
      state = action.cate_news;
      return [...state];
    default:
      return [...state];
  }
};

export default category_with_news;
