import * as types from "../constants/ActionTypes";
var initialState = [];

const tags = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_TAGS:
      state = action.tags;
      return state;
    default:
      return state;
  }
};

export default tags;
