import * as types from "../constants/ActionTypes";

export const loading = () => {
  return {
    type: types.LOADING,
  };
};

export const unloading = () => {
  return {
    type: types.UNLOADING,
  };
};
