// Redux store
import {
  ADD_WORKOUT,
  EDIT_WORKOUT,
  NEW_SERIES,
  REMOVE_SERIES,
  REMOVE_WORKOUT
} from './actionTypes';
import { seriesState, workoutState } from './state';

const initWorkoutState = [];

const workoutReducer = (state = initWorkoutState, action) => {
  switch (action.type) {
    case ADD_WORKOUT:
      return [...state, workoutState(action.id)];

    case EDIT_WORKOUT:
      return state.map((item) => {
        if (item.id === action.id) {
          return action.payload;
        } else return item;
      });

    case REMOVE_WORKOUT:
      return state.filter((item) => item.id !== action.id);

    case NEW_SERIES:
      return state.map((workout) => {
        if (workout.id === action.workoutId) {
          return {
            ...workout,
            series: [...workout.series, seriesState(action.idSeries)]
          };
        } else return workout;
      });

    case REMOVE_SERIES:
      return state.map((workout) => {
        if (workout.id === action.workoutId) {
          return {
            ...workout,
            series: workout.series.filter((item) => item.id != action.idSeries)
          };
        } else return workout;
      });

    default:
      return state;
  }
};

export default workoutReducer;
