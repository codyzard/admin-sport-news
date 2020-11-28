import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import callApiWithAuth from "../utils/apiCallerWithAuth";

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

export const updateAvatarRequest = (avatar_src, headers) => {
  return (dispatch) => {
    return callApiWithAuth("api/auth/update_avatar", "POST", avatar_src, headers).then((res) => {
        if(res) return dispatch(updateAvatar(res.data.user))
    }).catch(error => {
        if(error.response.status === 429){
          console.log(error);
          return dispatch(errorMessage(429));
        }
    })
  };
};
export const updateAvatar = (user) => {
  return{
    type: types.UPDATE_AVATAR,
    user
  };
}


export const updateInfoRequest = (gender, dob, address, phone) => {
  let token = JSON.parse(localStorage.get('access_token'));
  const headers = { Authorization: `Bearer ${token}` }
  return (dispatch) => {
    return callApi("api/admin/update_info", "POST",{
      gender: gender,
      dob: dob,
      address: address,
      phone: phone,
    }, headers).then((res) => {
        // if(res) return dispatch(updateInfo(res.data.profile))
        console.log(res);
    })
  };
};
export const updateInfo = (profile) => {
  return{
    type: types.UPDATE_INFO_PROFILE,
    profile,
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
