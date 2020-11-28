import { isEmpty } from "lodash";
import * as types from "../constants/ActionTypes";
var initialState = [];

const categories = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES:
      state = action.categories;
      return state;
    case types.CREATE_CATEGORY:
      state.data.push(action.category);
      return {...state};
    case types.DESTROY_CATEGORY:
      var index = state.data.findIndex((c) => {
        return c === action.category_delete;
      })
      state.data.splice(index);
      return {...state};
    default:
      return state;
  }
};

export default categories;
