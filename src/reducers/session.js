import * as types from "../constants/ActionTypes";
var initialState = {};

const session = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      state = action.session;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("access_token", JSON.stringify(state.access_token));
      return state;
    case types.LOGGED:
      let user = JSON.parse(localStorage.getItem("user"));
      let access_token = JSON.parse(localStorage.getItem("access_token"));
      if (user && access_token) {
        state = {
          user: user,
          access_token: access_token,
        };
      }
      return { ...state };
    case types.LOGOUT:
      state = {};
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      return { ...state };
    case types.UPDATE_AVATAR:
      state = {
        user: action.user,
      };
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state };
    default:
      return { ...state };
  }
};

export default session;
