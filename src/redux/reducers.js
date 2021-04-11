// Redux store
import { ADD_WORKOUT, EDIT_WORKOUT, REMOVE_WORKOUT } from "./actionTypes";

const initialState = []

const workoutReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_WORKOUT:
      return [...state, action.payload];
    
    case EDIT_WORKOUT:
      return state.map(item => {
        if(item.id === action.payload.id){
          return action.payload;
        }
        else return item;
      })

    case REMOVE_WORKOUT:
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
};

export default workoutReducer;