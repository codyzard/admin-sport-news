import * as types from "../constants/ActionTypes";
import callApiWithAuth from "../utils/apiCallerWithAuth";

export const getAuthorAccountRequest = (header) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/get_all_author_account",
      "GET",
      header
    ).then((res) => {
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
    return callApiWithAuth(
      "api/admin/block_or_active",
      "POST",
      {
        user_id: user_id,
        value: value,
      },
      header
    ).then((res) => {
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


export const searchAuthorAccountRequest = (header, keyword) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/search_author_account",
      "POST",
      {
        keyword: keyword,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(searchAuthorAccount(res.data.search_author_account, keyword));
      }
    });
  };
};

export const searchAuthorAccountNextPageRequest = (header, keyword, pageNumber) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/search_author_account?page="+pageNumber,
      "POST",
      {
        keyword: keyword,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(searchAuthorAccount(res.data.search_author_account ,keyword));
      }
    });
  };
};

export const searchAuthorAccount = (search_author_account, keyword) => {
  return {
    type: types.SEARCH_AUTHOR_ACCOUNT,
    search_author_account,
    keyword
  };
};

export const createAuthorAccountRequest = (header, name, email, password) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/create_author_account",
      "POST",
      {
        name: name,
        email: email,
        password: password,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(createAuthorAccount(res.data.news_author_account));
      }
    });
  };
};

export const createAuthorAccount = (news_author_account) => {
  return {
    type: types.CREATE_AUTHOR_ACCOUNT,
    news_author_account,
  };
};