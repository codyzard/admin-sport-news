import * as types from "../constants/ActionTypes";
import callApiWithAuth from "../utils/apiCallerWithAuth";

export const getWhiteListNewsRequest = (header) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/get_white_list_news",
      "GET",
      null,
      header
    ).then((res) => {
      if (res) {
        return dispatch(getWhiteListNews(res.data.white_list_news));
      }
    });
  };
};

export const getWhiteListNews = (white_list_news) => {
  return {
    type: types.GET_WHITELIST_NEWS,
    white_list_news,
  };
};

export const searchWhiteListNewsRequest = (header, keyword) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/search_white_list_news",
      "POST",
      {
        keyword: keyword,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(searchWhiteListNews(res.data.search_white_list_news, keyword));
      }
    });
  };
};

export const searchWhiteListNewsNextPageRequest = (header, keyword, pageNumber) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/search_white_list_news?page="+pageNumber,
      "POST",
      {
        keyword: keyword,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(searchWhiteListNews(res.data.search_white_list_news, keyword));
      }
    });
  };
};

export const searchWhiteListNews = (search_white_list_news, keyword) => {
  return {
    type: types.SEARCH_WHITELIST_NEWS,
    search_white_list_news,
    keyword
  };
};

export const pushNewsToPendingRequest = (header, news_id, status) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/push_to_pending",
      "POST",
      {
        news_id: news_id,
        status: status
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(pushNewsToPending(res.data.news));
      }
    });
  };
};

export const pushNewsToPending = (news) => {
  return {
    type: types.PUSH_NEWS_TO_PENDING,
    news,    
  };
};
