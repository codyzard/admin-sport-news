import * as types from "../constants/ActionTypes";
import callApiWithAuth from "../utils/apiCallerWithAuth";

export const getApprovalNewsRequest = (header) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/get_all_approval_news",
      "GET",
      null,
      header
    ).then((res) => {
      if (res) {
        return dispatch(getApprovalNews(res.data.approval_news));
      }
    });
  };
};
export const nextPageApprovalNewsRequest = (header, pageNumber) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/get_all_approval_news?page=" + pageNumber,
      "GET",
      null,
      header
    ).then((res) => {
      if (res) {
        return dispatch(getApprovalNews(res.data.approval_news));
      }
    });
  };
};
export const getApprovalNews = (approval_news) => {
  return {
    type: types.GET_APPROVAL_NEWS,
    approval_news,
  };
};

export const approvalNewsRequest = (header, news_id, status) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/approving_news",
      "POST",
      {
        news_id: news_id,
        status: status,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(approvalNews(res.data.news));
      }
    });
  };
};

export const approvalNews = (news) => {
  return {
    type: types.APPROVAL_NEWS,
    news,
  };
};

export const searchApprovalNewsRequest = (header, keyword) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/search_approval_news",
      "POST",
      {
        keyword: keyword,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(searchApprovalNews(res.data.search_approval_news, keyword));
      }
    });
  };
};

export const searchNextPageApprovalNewsRequest = (header, keyword, pageNumber) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/search_approval_news?page="+pageNumber,
      "POST",
      {
        keyword: keyword,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(searchApprovalNews(res.data.search_approval_news, keyword));
      }
    });
  };
};

export const searchApprovalNews = (search_approval_news, keyword) => {
  return {
    type: types.SEARCH_APPROVAL_NEWS,
    search_approval_news,
    keyword
  };
};
