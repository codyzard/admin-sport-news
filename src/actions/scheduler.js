import * as types from "../constants/ActionTypes";
import callApiWithAuth from "../utils/apiCallerWithAuth";

export const setScheduleRequest = (header, cronValue) => {
  return (dispatch) => {
    return callApiWithAuth(
      "api/admin/set_schedule",
      "POST",
      {
        cronValue: cronValue,
      },
      header
    ).then((res) => {
      if (res) {
        return dispatch(setSchedule(res.data.schedule));
      }
    });
  };
};
export const setSchedule = (schedule) => {
  return {
    type: types.SET_SCHEDULE,
    schedule,
  };
};

export const getScheduleRequest = () => {
  return (dispatch) => {
    return callApiWithAuth("api/admin/get_schedule", "GET", null).then(
      (res) => {
        if (res) {
          return dispatch(setSchedule(res.data.schedule));
        }
      }
    );
  };
};

export const getSchedule = (schedule) => {
  return {
    type: types.GET_SCHEDULE,
    schedule,
  };
};
