import * as types from "../constants/ActionTypes";
var initialState = {};

const approval_news = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_APPROVAL_NEWS:
      state = action.approval_news;
      return { ...state };
    case types.APPROVAL_NEWS:
      let index = state.data.findIndex((news) => {
        return news.id === action.news.id;
      });
      state.data.splice(index);
      return { ...state };
    case types.SEARCH_APPROVAL_NEWS:
      state = action.search_approval_news;
      return {...state};
    default:
      return { ...state };
  }
};

export default approval_news;
