// Librairies
import React from 'react';

// Redux Store
import { ADD_WORKOUT, REMOVE_WORKOUT } from "./actionTypes";


export const addWorkoutCreator = data => {
  return {
    type: ADD_WORKOUT,
    data,
  };
};

export const removeWorkoutCreator = id => {
  return {
    type: REMOVE_WORKOUT,
    id,
  };
};
