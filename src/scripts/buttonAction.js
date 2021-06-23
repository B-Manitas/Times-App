import { useDispatch } from "react-redux";
import { seriesState } from "../redux/state";
import { EditMode, ViewMode } from "../utils/app_type";
import { randUID } from "./index";

import {
  editWorkoutCreator,
  newSeriesCreator,
  removeWorkoutCreator,
  addWorkoutCreator,
} from "../redux/actionCreators";
import { Alert } from "react-native";

/**
 * Create and add a workout to the redux store.
 * @param {Function} navigation function called to change the page.
 * @param {Function} dispatch The useDispatch hooks.
 */
export const onPressAddWorkout = (navigation, dispatch) => {
  const newId = "_" + Math.random().toString(36).substr(2, 9);
  dispatch(addWorkoutCreator(newId));
  navigation.navigate("Edit", { workout_UID: newId });
};

/**
 * Modify the workout in the redux store.
 * @param {Function} navigation the function called to change the page to the View page.
 * @param {Function} uid the uid of the workout to edit.
 */
export const onPressEditWorkout = (navigation, dispatch, workout) => {
  dispatch(editWorkoutCreator(workout.id, workout));
  navigation.navigate("Home", { workoutId: workout.id });
};

/**
 * Remove the workout in the redux store.
 * @param {int} uid the uid of the workout to remove.
 */
export const onPressRemoveWorkout = (uid) => {
  const dispatch = useDispatch();
  dispatch(removeWorkoutCreator(uid));
};

/**
 * Remove the workout in the redux store and bact to view page.
 * @param {Number} uid the id of the workout to remove.
 * @param {Function} switcherMode the function called to change the page to the View page.
 */
export const onPressCancel = (uid, switcherMode) => {
  const dispatch = useDispatch();
  dispatch(removeWorkoutCreator(uid));
  switcherMode(ViewMode, uid);
};

/**
 * Create and add a series to the workout state in the redux store.
 * @param {Object} state the dictionary containing the state of the workout.
 * @param {function} setState the hooks function called to modify workout state.
 */
export function onPressAddSeries(state, setState) {
  const uid = randUID(16) + "_";

  // const dispatch = useDispatch();
  // useDispatch(newSeriesCreator(state.id, id));

  setState({
    ...state,
    series: [...state.series, seriesState(uid)],
  });
}

/**
 * Remove a series of workout.
 * @param {Function} setWorkout the hooks function called to update workout state.
 * @param {String} series_UID the id of the series.
 */
export const onPressRemoveSeries = (setWorkout, series_UID) =>{
  setWorkout((p) => ({
    ...p,
    series: p.series.filter((series) => series.id !== series_UID),
  }));
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
};

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
      if (item.id === uid) return { ...item, [key]: value };

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
  } else {
    setState(true);
    setText("-");
  }
};

/**
 * Show an alert when the users clicks the cross button to leave the edit page.
 * @param {Object} navigation Component containing propreties to navigate between screen.
 */
export const onPressCancelAlrtUnsvd = (navigation, workout_UID) => {
  Alert.alert(
    "Unsaved changes",
    "You are about to leave this page without saving your workout.",
    [
      {
        text: "Leave",
        onPress: () => navigation.navigate("Home", { workoutId: workout_UID }),
        style: "destructive",
      },
      { text: "Cancel", style: "cancel" },
    ]
  );
};

/**
 * Update training days.
 * @param {String} id The id of the day.
 * @param {Object} workout The state of the workout.
 * @param {Function} setWorkout The hooks function called to update the workout state.
 */
export const onPressDays = (id, workout, setWorkout) => {
  const new_state = workout.days.map((item, index) => {
    if (index === id) return !item;

    return item;
  });

  setWorkout({ ...workout, days: new_state });
};

/**
 * Update the value of the default option.
 * @param {String} key The key of the options.
 * @param {Boolean} bool_state The state of the options.
 * @param {Function} setState The hooks function called to update the state.
 */
export const onPressDefaultOptionsBool = (key, bool_state, setState) => {
  setState(!bool_state);
  onChangeUpdateSeries(key, !bool_state, series_state.id, setWorkout);
};
