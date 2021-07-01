// Redux store
import {
  EDIT_USER,
  RESET_USER,
  ADD_WORKOUT,
  EDIT_WORKOUT,
  NEW_SERIES,
  REMOVE_SERIES,
  REMOVE_WORKOUT,
  RESET_WORKOUT,
} from "./actionTypes";
import { seriesState, userState, workoutState } from "./state";

const initWorkoutState = [];
const initUserState = userState;

export const userReducer = (state = initUserState, action) => {
  switch (action.type) {
    case EDIT_USER:
      return { ...state, ...action.payload };
    
    case RESET_USER:
      return initUserState;

    default:
      return state;
  }
};

export const workoutReducer = (state = initWorkoutState, action) => {
  switch (action.type) {
    case ADD_WORKOUT:
      return [...state, workoutState(action.uid)];

    case EDIT_WORKOUT:
      return state.map((item) => {
        if (item.uid === action.uid) {
          return action.payload;
        } else return item;
      });

    case REMOVE_WORKOUT:
      return state.filter((item) => item.uid !== action.uid);

    case NEW_SERIES:
      return state.map((workout) => {
        if (workout.uid === action.workout_UID) {
          return {
            ...workout,
            series: [...workout.series, seriesState(action.series_UID)],
          };
        } else return workout;
      });

    case REMOVE_SERIES:
      return state.map((workout) => {
        if (workout.uid === action.workout_UID) {
          return {
            ...workout,
            series: workout.series.filter(
              (item) => item.uid != action.series_UID
            ),
          };
        } else return workout;
      });

    case RESET_WORKOUT:
      return initWorkoutState;

    default:
      return state;
  }
};
