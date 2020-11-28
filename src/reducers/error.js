import * as types from "../constants/ActionTypes";
var initialState = 200;

const message = (state = initialState, action) => {
  switch (action.type) {
    case types.MANY_REQUEST:
      state = action.status;
      return state;
    case types.CLEAR_ERROR:
      state = 200;
      return state;
    default:
      return state;
  }
};

export default message;
