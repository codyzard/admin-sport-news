import * as types from "../constants/ActionTypes";
var initialState = {};

const author_news = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_AUTHOR_NEWS:
      state = action.list_news;
      return {...state};
    case types.AUTHOR_UPLOAD_NEWS:
      state.push(action.news);
      return {...state}
    case types.AUTHOR_UPDATE_NEWS:
      let index = state.findIndex((news) => {
        return news.id === action.news.id
      })
      state[index] = action.news;
    case types.SEARCH_NEWS: 
      state = action.news;
      return {...state};
    default:
      return {...state};
  }
};

export default author_news;
