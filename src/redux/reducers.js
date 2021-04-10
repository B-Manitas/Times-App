// Redux store
import { ADD_WORKOUT } from "./actionTypes";

const initialState = []

const workoutReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_WORKOUT:
      return [...state, action.payload];
  
    default:
      return state;
  }
};

export default workoutReducer;