// Redux Store
import { ADD_WORKOUT, EDIT_WORKOUT, REMOVE_WORKOUT } from "./actionTypes";


export const addWorkoutCreator = payload => {
  return {
    type: ADD_WORKOUT,
    payload,
  };
};

export const editWorkoutCreator = (id, payload) => {
  return {
    type: EDIT_WORKOUT,
    id: id,
    payload,
  };
};

export const removeWorkoutCreator = id => {
  return {
    type: REMOVE_WORKOUT,
    id,
  };
};
