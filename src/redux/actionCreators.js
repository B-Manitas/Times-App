// Librairies
import React from 'react';

// Redux Store
import { ADD_WORKOUT } from "./actionTypes";


export const addWorkoutCreator = data => {
  return {
    type: ADD_WORKOUT,
    data,
  };
};
