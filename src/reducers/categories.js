import * as types from "../constants/ActionTypes";
var initialState = [];

const categories = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES:
      state = action.categories;
      return state;
    default:
      return state;
  }
};

export default categories;
