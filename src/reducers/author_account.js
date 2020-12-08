import * as types from "../constants/ActionTypes";
var initialState = {};

const author_account = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AUTHOR_ACCOUNT:
      state = action.list_author_account;
      return { ...state };
    case types.BLOCK_OR_ACTIVE:
      let index = state.data.findIndex((author) => {
        return author.id === action.author_account.id;
      });
      state.data[index] = action.author_account;
      return { ...state };
    case types.SEARCH_AUTHOR_ACCOUNT:
      state = action.search_author_account;
      return { ...state };
    case types.CREATE_AUTHOR_ACCOUNT:
      console.log(state);
      state.data.push(action.news_author_account);
      return { ...state };
    default:
      return { ...state };
  }
};

export default author_account;
