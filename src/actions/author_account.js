import * as types from "../constants/ActionTypes";
import callApiWithAuth from "../utils/apiCallerWithAuth";

export const getAuthorAccountRequest = (header) => {
  return (dispatch) => {
    return callApiWithAuth("api/admin/get_all_author_account", "GET", header).then((res) => {
      if (res) {
        return dispatch(getAuthorAccount(res.data.list_author_account));
      }
    });
  };
};
export const getAuthorAccount = (list_author_account) => {
  return {
    type: types.GET_AUTHOR_ACCOUNT,
    list_author_account,
  };
};


export const handleBlockorActiveRequest = (header, user_id, value) => {
    return (dispatch) => {
      return callApiWithAuth("api/admin/block_or_active", "POST",{
        user_id: user_id,
        value: value,
      } ,header).then((res) => {
        if (res) {
          return dispatch(handleBlockorActive(res.data.author_account));
        }
      });
    };
  };
  export const handleBlockorActive = (author_account) => {
    return {
      type: types.BLOCK_OR_ACTIVE,
      author_account,
    };
  };
  
  
