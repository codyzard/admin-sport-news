
import * as types from "../constants/ActionTypes";
var initialState = {};

const session = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      state = action.session
      var {user, user_info, access_token} = state;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access_token', JSON.stringify(access_token));
      return state;
    case types.LOGGED:
      var user = JSON.parse(localStorage.getItem('user'));
      var access_token = JSON.parse(localStorage.getItem('access_token'));
      if(user && access_token){
        state = {
          user: user,
          user_info: user_info,
          access_token: access_token,
        }
      }
      return state;
    case types.LOGOUT:
      state = {};
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      return state;
    default:
      return state;
  }
};

export default session;