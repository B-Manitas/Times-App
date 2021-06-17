import { useDispatch, useSelector } from 'react-redux';
import { seriesState } from '../redux/state';
import { EditMode, ViewMode } from '../utils/app_type';
import { randUID } from './workout';

import {
  editWorkoutCreator,
  newSeriesCreator,
  removeWorkoutCreator
} from '../redux/actionCreators';

const dispatch = useDispatch();

/**
 * Create and add a workout to the redux store.
 * @param {Function} switcherMode function called to change the page
 * to the edit page.
 */
export function onPressAddWorkout(switcherMode) {
  const id = '_' + randUID();
  dispatch(addWorkoutCreator(id));
  switcherMode(EditMode, id);
}

/**
 * Modify the workout in the redux store.
 * @param {Function} switcherMode the function called to change the page to the View page.
 * @param {Number} uid the uid of the workout to edit.
 * @param {Object} state the dictionary containing the state of the workout.
 */
export function onPressEditWorkout(switcherMode, uid, state) {
  dispatch(editWorkoutCreator(uid, state));
  switcherMode(ViewMode, uid);
}

/**
 * Remove the workout in the redux store.
 * @param {int} uid the uid of the workout to remove.
 */
export function onPressRemoveWorkout(uid) {
  dispatch(removeWorkoutCreator(uid));
}

/**
 * Remove the workout in the redux store and bact to view page.
 * @param {Number} uid the id of the workout to remove.
 * @param {Function} switcherMode the function called to change the page to the View page.
 */
export function onPressCancel(uid, switcherMode) {
  dispatch(removeWorkoutCreator(uid));
  switcherMode(ViewMode, uid);
}

/**
 * Create and add a series to the workout state in the redux store.
 * @param {Object} state the dictionary containing the state of the workout.
 * @param {function} setState the hooks function called to modify workout state.
 */
export function onPressAddSeries(state, setState) {
  const id = randUID(16) + '_';
  dispatch(newSeriesCreator(parentState.id, id));
  setState({
    ...state,
    series: [...state.series, seriesState(id)]
  });
}

/**
 * Remove a series of workout in the redux store.
 * @param {Function} setState the hooks function called to modify workout state.
 * @param {Number} idWorkout the id of the workout.
 * @param {Number} idSeries the id of the series.
 */
export function onPressRemoveSeries(setState, idWorkout, idSeries) {
  setState((prevState) => ({
    ...prevState,
    series: prevState.series.filter((series) => idSeries !== series.id)
  }));

  dispatch(removeSeriesCreator(idWorkout, idSeries));
}

/**
 * Modify the state of the series.
 * @param {Function} setWorkoutState the hooks function called to modify workout state.
 * @param {Function} setSeriesState the hooks function called to modify series state.
 * @param {Object} state the new state of the series.
 */
export function onChangeEditSeries(setWorkoutState, setSeriesState, state) {
  const stateUpdated = { ...state, ...newState };
  setSeriesState(stateUpdated);

  setWorkoutState((prevState) => ({
    ...prevState,
    series: prevState.series.map((series) => {
      if (state.id === series.id) return stateUpdated;
      else return series;
    })
  }));
}
