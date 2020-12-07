import * as types from "../constants/ActionTypes";
var initialState = "";

const message = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CATEGORY:
      state = action.message;
      console.log(state);
      return state;
    case types.UPDATE_CATEGORY:
      state = action.message;
      return state;
    default:
      return state;
  }
};

export default message;
