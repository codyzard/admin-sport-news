import * as types from "../constants/ActionTypes";
var initialState = {};

const white_list_news = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_WHITELIST_NEWS:
      state = action.white_list_news;
      return { ...state };
    case types.SEARCH_WHITELIST_NEWS:
      state = action.search_white_list_news;
      return { ...state };
    case types.PUSH_NEWS_TO_PENDING:
      console.log(action.news);
      let index = state.data.findIndex((news) => {
        return news.id === action.news.id;
      });
      state.data[index] = action.news;
      return { ...state };
    default:
      return { ...state };
  }
};

export default white_list_news;
