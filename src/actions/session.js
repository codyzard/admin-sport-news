import * as types from "../constants/ActionTypes";
import callApiWithAuth from "../utils/apiCallerWithAuth";

export const loginRequest = (email, password) => {
  return (dispatch) => {
    return callApiWithAuth("api/auth/login", "POST", {
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

export const updateAvatarRequest = (avatar_src, headers) => {
  return (dispatch) => {
    return callApiWithAuth("api/auth/update_avatar", "POST", avatar_src, headers).then((res) => {
        if(res) return dispatch(updateAvatar(res.data.user))
    })
  };
};
export const updateAvatar = (user) => {
  return{
    type: types.UPDATE_AVATAR,
    user
  };
}


export const updateInfoRequest = (name, gender, birthday, address, phone, headers) => {
  return (dispatch) => {
    return callApiWithAuth("api/auth/update_info", "POST",{
      name: name,
      gender: gender,
      birthday: birthday,
      address: address,
      phone: phone,
    }, headers).then((res) => {
        if(res) return dispatch(updateInfo(res.data.user))
    })
  };
};
export const updateInfo = (user) => {
  return{
    type: types.UPDATE_INFO,
    user,
  };
}

export const errorMessage = (status) => {
  return{
    type: types.MANY_REQUEST,
    status,
  }
}

export const clearError = () => {
  return{
    type: types.CLEAR_ERROR,
  }
}
