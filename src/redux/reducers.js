// Redux store
import { ADD_WORKOUT, REMOVE_WORKOUT } from "./actionTypes";

const initialState = []

const workoutReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_WORKOUT:
      return [...state, action.payload];
  
    case REMOVE_WORKOUT:
      // console.log(state.filter(item => item.id !== action.id));
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
};

export default workoutReducer;