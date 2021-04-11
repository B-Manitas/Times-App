// Librairies
import React from 'react';

// Redux Store
import { ADD_WORKOUT, EDIT_WORKOUT, REMOVE_WORKOUT } from "./actionTypes";


export const addWorkoutCreator = data => {
  return {
    type: ADD_WORKOUT,
    data,
  };
};

export const editWorkoutCreator = (id, data) => {
  return {
    type: EDIT_WORKOUT,
    id,
    data,
  };
};

export const removeWorkoutCreator = id => {
  return {
    type: REMOVE_WORKOUT,
    id,
  };
};
