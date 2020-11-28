import { isEmpty } from "lodash";
import * as types from "../constants/ActionTypes";
var initialState = [];

const parent_categories = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PARENT_CATEGORIES:
      state = action.parent_categories;
      return state;
    default:
      return state;
  }
};

export default parent_categories;
