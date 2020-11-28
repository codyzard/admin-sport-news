import * as types from "../constants/ActionTypes";
var initialState = "";

const category_detail = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY_DETAIL:
      state = action.category_detail;
      return state;
    case types.UPDATE_CATEGORY:
      state = action.category_update;
      return state;
    default:
      return state;
  }
};

export default category_detail;
