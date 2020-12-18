import * as types from "../constants/ActionTypes";
var initialState = {};

const scheduler = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SCHEDULE:
      state = action.schedule;
      return { ...state };
    case types.GET_SCHEDULE:
      if(action.schedule === null) return {};
      state = action.schedule;
      return { ...state };
    default:
      return { ...state };
  }
};

export default scheduler;
