import { useDispatch } from "react-redux";
import { seriesState } from "../redux/state";
import { EditMode, ViewMode } from "../utils/app_type";
import { randUID } from "./index";

import {
  editWorkoutCreator,
  newSeriesCreator,
  removeWorkoutCreator,
} from "../redux/actionCreators";


/**
 * Create and add a workout to the redux store.
 * @param {Function} switcherMode function called to change the page
 * to the edit page.
 */
export const onPressAddWorkout = (switcherMode) => {
  const uid = "_" + randUID();
  // const dispatch = useDispatch();
  // dispatch(addWorkoutCreator(uid));
  switcherMode(EditMode, uid);
}

/**
 * Modify the workout in the redux store.
 * @param {Function} switcherMode the function called to change the page to the View page.
 * @param {Number} uid the uid of the workout to edit.
 * @param {Object} state the dictionary containing the state of the workout.
 */
export const onPressEditWorkout = (switcherMode, uid, state) => {
  // const dispatch = useDispatch();
  // dispatch(editWorkoutCreator(uid, state));
  switcherMode(ViewMode, uid);
}

/**
 * Remove the workout in the redux store.
 * @param {int} uid the uid of the workout to remove.
 */
export const onPressRemoveWorkout = (uid) => {
  const dispatch = useDispatch();
  dispatch(removeWorkoutCreator(uid));
}

/**
 * Remove the workout in the redux store and bact to view page.
 * @param {Number} uid the id of the workout to remove.
 * @param {Function} switcherMode the function called to change the page to the View page.
 */
export const onPressCancel = (uid, switcherMode) => {
  const dispatch = useDispatch();
  dispatch(removeWorkoutCreator(uid));
  switcherMode(ViewMode, uid);
}

/**
 * Create and add a series to the workout state in the redux store.
 * @param {Object} state the dictionary containing the state of the workout.
 * @param {function} setState the hooks function called to modify workout state.
 */
export function onPressAddSeries (state, setState) {
  const uid = randUID(16) + "_";
  
  // const dispatch = useDispatch();
  // useDispatch(newSeriesCreator(state.id, id));
  
  setState({
    ...state,
    series: [...state.series, seriesState(uid)],
  });

}

/**
 * Remove a series of workout in the redux store.
 * @param {Function} setState the hooks function called to modify workout state.
 * @param {Number} idWorkout the id of the workout.
 * @param {Number} idSeries the id of the series.
 */
export const onPressRemoveSeries = (setState, idWorkout, idSeries) => {
  setState((prevState) => ({
    ...prevState,
    series: prevState.series.filter((series) => idSeries !== series.id),
  }));
  
  const dispatch = useDispatch();
  dispatch(removeSeriesCreator(idWorkout, idSeries));
}

/**
 * Modify the state of the series.
 * @param {Function} setWorkoutState the hooks function called to modify workout state.
 * @param {Function} setSeriesState the hooks function called to modify series state.
 * @param {Object} state the new state of the series.
 */
export const onChangeEditSeries = (setWorkoutState, setSeriesState, state) => {
  const stateUpdated = { ...state, ...newState };
  setSeriesState(stateUpdated);

  setWorkoutState((prevState) => ({
    ...prevState,
    series: prevState.series.map((series) => {
      if (state.id === series.id) return stateUpdated;
      else return series;
    }),
  }));
}

/**
 * Update properties of a series.
 * @param {String} key The key of the series to update.
 * @param {String} e The new value of the series.
 * @param {Function} setWorkout The hooks function called to update the workout state.
 */
export const onChangeUpdateSeries = (key, value, uid, setWorkout) => {
  setWorkout((p) => ({
    ...p,
    series: p.series.map((item) => {
      if (item.id === uid)
        return { ...item, [key]: value };

      return item;
    }),
  }));
};

/**
 * Show/Hide options componnent.
 * @param {Boolean} state The current state of the componnent.
 * @param {Function} setState The hooks function called to update the state.
 * @param {Function} setText The hooks function called to update the text of the state.
 */
export const onPressToggleOptions = (state, setState, setText) => {
  if (state) {
    setState(false);
    setText("+");
  } 
  
  else {
    setState(true);
    setText("-");
  }
}
