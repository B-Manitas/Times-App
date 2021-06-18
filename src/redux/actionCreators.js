// Redux Store
import {
  ADD_WORKOUT,
  EDIT_SERIES,
  EDIT_WORKOUT,
  NEW_SERIES,
  REMOVE_SERIES,
  REMOVE_WORKOUT,
} from "./actionTypes";

export const addWorkoutCreator = (id) => {
  return {
    type: ADD_WORKOUT,
    id,
  };
};

export const editWorkoutCreator = (id, payload) => {
  return {
    type: EDIT_WORKOUT,
    id,
    payload,
  };
};

export const removeWorkoutCreator = (id) => {
  return {
    type: REMOVE_WORKOUT,
    id,
  };
};

export const newSeriesCreator = (workoutId, idSeries) => {
  return {
    type: NEW_SERIES,
    workoutId,
    idSeries,
  };
};

export const removeSeriesCreator = (workoutId, idSeries) => {
  return {
    type: REMOVE_SERIES,
    workoutId,
    idSeries,
  };
};
