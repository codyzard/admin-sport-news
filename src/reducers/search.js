import * as types from "../constants/ActionTypes";
var initialState = "";

const search = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_CATEGORIES:
      state = action.keyword;
      return state;
    case types.SEARCH_APPROVAL_NEWS:
      state = action.keyword;
      return state;
    case types.SEARCH_AUTHOR_ACCOUNT:
      state = action.keyword;
      return state;
    case types.SEARCH_WHITELIST_NEWS:
      state = action.keyword;
      return state;
    case types.UNMOUNT_SEARCH_KEYWORD:
      state = "";
      return state;
    default:
      return state;
  }
};

export default search;
