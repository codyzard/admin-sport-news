import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
export const loginRequest = (email, password) => {
  return (dispatch) => {
    return callApi("api/auth/login", "POST", {
        email: email,
        password: password,
    }).then((res) => {
        if(res) return dispatch(login(res.data))
    })
  };
};
export const login = (session) => {
  return {
    type: types.LOGIN,
    session,
  };
};

export const isLogged = () => {
    return {
      type: types.LOGGED,
    };
};

export const logout = () => {
  return{
    type: types.LOGOUT,
  };
}