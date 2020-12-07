import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import callApiWithAuth from "../utils/apiCallerWithAuth";

export const getTagsAndParentCategoriesRequest = () => {
  return (dispatch) => {
    return callApi("api/news_author/init_available_data", "GET").then((res) => {
      if (res) {
        return dispatch(getAvailableParentCategory(res.data.parent_category));
      }
    });
  };
};
export const getAvailableTags = (tags) => {
  return {
    type: types.GET_ALL_TAGS,
    tags,
  };
};

export const getAvailableParentCategory = (parent_categories) => {
  return {
    type: types.GET_PARENT_CATEGORIES,
    parent_categories,
  };
};

export const getChildCategoriesRequest = (parent_id) => {
  return (dispatch) => {
    return callApi(
      "api/news_author/parent_category_res_child_category/" + parent_id,
      "GET"
    ).then((res) => {
      if (res) return dispatch(getChildCategories(res.data.child_categories));
    });
  };
};

export const getChildCategories = (child_categories) => {
  return {
    type: types.PARENT_GET_CHILD_CATEGORIES,
    child_categories,
  };
};

export const getAuthorNewsRequest = (header) => {
  return (dispatch) => {
    return callApiWithAuth("api/news_author/get_all_news", "GET", null , header).then(
      (res) => {
        if(res) return dispatch(getAuthorNews(res.data.author_news))
      }
    );
  };
};
export const nextPageAuthorNewsRequest = (header, pageNumber) => {
  return (dispatch) => {
    return callApiWithAuth("api/news_author/get_all_news?page=" + pageNumber, "GET", null , header).then(
      (res) => {
        if(res) return dispatch(getAuthorNews(res.data.author_news))
      }
    );
  };
};
export const getAuthorNews = (list_news) => {
  return {
    type: types.GET_ALL_AUTHOR_NEWS,
    list_news,
  };
};


export const updateNewsRequest = (id, data, header) => {
  return (dispatch) => {
    return callApiWithAuth("api/news_author/update/"+id, "POST", data , header).then(
      (res) => {
        if(res) return dispatch(uploadNews(res.data))
      }
    );
  };
};
export const updateNews = (news) => {
  return {
    type: types.AUTHOR_UPLOAD_NEWS,
    news,
  };
};


export const uploadNewsRequest = (data, header) => {
  return (dispatch) => {
    return callApiWithAuth("api/news_author/upload_news", "POST", data , header).then(
      (res) => {
        if(res) return dispatch(uploadNews(res.data))
      }
    );
  };
};
export const uploadNews = (news) => {
  return {
    type: types.AUTHOR_UPLOAD_NEWS,
    news,
  };
};

export const searchAuthorNewsRequest = (header, keyword) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/news_author/search_author_news",
      "POST",
      {
        keyword: keyword,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(searchAuthorNews(res.data.search_author_news, keyword));
      }
    });
  };
};

export const searchNextPageAuthorNewsRequest = (header, keyword, pageNumber) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/news_author/search_author_news?page="+pageNumber,
      "POST",
      {
        keyword: keyword,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(searchAuthorNews(res.data.search_author_news, keyword));
      }
    });
  };
};

export const searchAuthorNews = (news, keyword) => {
  return {
    type: types.SEARCH_NEWS,
    news,
    keyword
  };
};