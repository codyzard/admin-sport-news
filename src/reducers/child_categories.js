import * as types from "../constants/ActionTypes";
var initialState = [];

const child_categories = (state = initialState, action) => {
  switch (action.type) {
    case types.PARENT_GET_CHILD_CATEGORIES:
      state = action.child_categories;
      return [...state];
    default:
      return state;
  }
};

export default child_categories;
