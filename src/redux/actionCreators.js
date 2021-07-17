// Redux Store
import {
  ADD_WORKOUT,
  EDIT_USER,
  RESET_USER,
  EDIT_WORKOUT,
  NEW_SERIES,
  REMOVE_SERIES,
  REMOVE_WORKOUT,
  RESET_WORKOUT,
} from "./actionTypes";

export const resetUserCreator = () => {
  return {
    type: RESET_USER,
  };
};

export const editUserCreator = (payload) => {
  return {
    type: EDIT_USER,
    payload,
  };
};

export const resetWorkoutCreator = () => {
  return {
    type: RESET_WORKOUT,
  };
};

export const addWorkoutCreator = (uid) => {
  return {
    type: ADD_WORKOUT,
    uid,
  };
};

export const editWorkoutCreator = (uid, payload) => {
  return {
    type: EDIT_WORKOUT,
    uid,
    payload,
  };
};

export const removeWorkoutCreator = (uid) => {
  return {
    type: REMOVE_WORKOUT,
    uid,
  };
};

export const newSeriesCreator = (workout_UID, series_UID) => {
  return {
    type: NEW_SERIES,
    workout_UID,
    series_UID,
  };
};

export const removeSeriesCreator = (workout_UID, series_UID) => {
  return {
    type: REMOVE_SERIES,
    workout_UID,
    series_UID,
  };
};
