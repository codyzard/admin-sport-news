import * as types from "../constants/ActionTypes";
var initialState = true;

const loading = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      state = true;
      return state;
    case types.UNLOADING:
      state = false;
      return state;
    default:
      return state;
  }
};

export default loading;
