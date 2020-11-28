import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
export const getAllCategoriesRequest = () => {
  return (dispatch) => {
    return callApi("api/admin/categories", "GET").then((res) => {
      if (res) return dispatch(getAllCategories(res.data.categories));
    });
  };
};
export const nextPage = (pageNumber) => {
  return (dispatch) => {
    return callApi("api/admin/categories?page=" + pageNumber, "GET").then(
      (res) => {
        if (res) return dispatch(getAllCategories(res.data.categories));
      }
    );
  };
};
export const getAllCategories = (categories) => {
  return {
    type: types.GET_ALL_CATEGORIES,
    categories,
  };
};

export const getParentCategoriesRequest = () => {
  return (dispatch) => {
    return callApi("api/admin/get_parent_category", "GET").then((res) => {
      if (res) return dispatch(getParentCategories(res.data.parent_categories));
    });
  };
};
export const getParentCategories = (parent_categories) => {
  return {
    type: types.GET_PARENT_CATEGORIES,
    parent_categories,
  };
};

export const createCategoryRequest = (name, description, parent_id) => {
  return (dispatch) => {
    return callApi("api/admin/categories", "POST", {
      name: name,
      description: description,
      parent_id: parent_id,
    }).then((res) => {
      if (res) {
          return dispatch(createCategory(res.data));
      }
    });
  };
};
export const createCategory = (data) => {
  return {
    type: types.CREATE_CATEGORY,
    category: data.category,
    message: data.message,
  };
};

export const destroyCategoryRequest = (category_id) => {
  return (dispatch) => {
    return callApi("api/admin/destroy_category", "POST", {
      category_id: category_id
    }).then((res) => {
      if (res) {
          return dispatch(destroyCategory(res.data));
      }
    });
  };
};
export const destroyCategory = (data) => {
  return {
    type: types.DESTROY_CATEGORY,
    category: data.category_delete,
    message: data.message,
  };
};

export const getCategoryDetailRequest = (category_id) => {
  return (dispatch) => {
    return callApi("api/admin/categories/"+category_id, "GET").then((res) => {
      if (res) {
          return dispatch(getCategoryDetail(res.data));
      }
    });
  };
};
export const getCategoryDetail = (category_detail) => {
  return {
    type: types.GET_CATEGORY_DETAIL,
    category_detail,
  };
};

export const updateCategoryDetailRequest = (category_id, name, description, parent_id) => {
  return (dispatch) => {
    return callApi("api/admin/update_category/", "POST", {
      category_id: category_id,
      name: name,
      description: description,
      parent_id: parent_id,
    }).then((res) => {
      if (res) {
          return dispatch(updateCategoryDetail(res.data));
      }
    });
  };
};
export const updateCategoryDetail = (data) => {
  return {
    type: types.UPDATE_CATEGORY,
    category_update: data.category_update,
    message: data.message,
  };
};
