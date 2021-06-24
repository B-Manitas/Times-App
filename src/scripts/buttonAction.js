import { seriesState } from "../redux/state";
import { allAreEmpty, isEmpty, keyIsEmpty, randUID } from "./index";

import {
  editWorkoutCreator,
  removeWorkoutCreator,
  addWorkoutCreator,
} from "../redux/actionCreators";
import { Alert } from "react-native";

/**
 * Create and add a workout to the redux store.
 * @param {Object} navigation The object containing function called to change the page to the View page.
 * @param {Function} dispatch The useDispatch hooks.
 */
export const onPressAddWorkout = (navigation, dispatch) => {
  const newId = "_" + Math.random().toString(36).substr(2, 9);
  dispatch(addWorkoutCreator(newId));
  navigation.navigate("Edit", { workout_UID: newId });
};

/**
 * Save the workout in the redux store.
 * @param {Object} navigation The object containing function called to change the page to the View page.
 * @param {Function} dispatch The useDispatch hooks.
 * @param {Function} uid the uid of the workout to edit.
 */
export const onPressSaveWorkout = (navigation, dispatch, workout, setOnSave) => {
  setOnSave(true)
  // console.log(workout);

  dispatch(editWorkoutCreator(workout.uid, workout));
  navigation.navigate("Home");
};

/**
 * Remove the workout in the redux store.
 * @param {Function} dispatch The useDispatch hooks.
 * @param {String} workout_UID The uid of the workout to remove.
 * @param {Object} navigation The object containing function called to change the page to the View page.
 */
export const onPressRemoveWorkout = (
  dispatch,
  workout_UID,
  navigation = null,
  alert = true
) => {
  const on_press_yes = () => {
    dispatch(removeWorkoutCreator(workout_UID));

    if (navigation != null) navigation.navigate("Home");
  };

  if (alert) {
    Alert.alert(
      "Are your sure ?",
      "You will not be able to recover this workout.",
      [
        {
          text: "Yes, delete it !",
          onPress: on_press_yes,
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  } else on_press_yes();
};

/**
 * Create and add a series to the workout state in the redux store.
 * @param {Object} state The dictionary containing the state of the workout.
 * @param {function} setState The hooks function called to modify workout state.
 */
export function onPressAddSeries(state, setState) {
  const uid = randUID(16) + "_";

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
export const onPressRemoveSeries = (setWorkout, series_UID) => {
  setWorkout((p) => ({
    ...p,
    series: p.series.filter((series) => series.uid !== series_UID),
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
      if (item.uid === uid) return { ...item, [key]: value };

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
 * @param {Function} dispatch The useDispatch hooks.
 * @param {Object} navigation Component containing propreties to navigate between screen.
 */
export const onPressCancelAlrtUnsvd = (dispatch, navigation, workout) => {
  // At less one field is field. And title is filled.
  if (!allAreEmpty(workout)) {
    // }) {
    Alert.alert(
      "Unsaved changes",
      "You are about to leave this page without saving your workout.",
      [
        {
          text: "Leave",
          onPress: () => navigation.navigate("Home"),
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  } else {
    onPressRemoveWorkout(dispatch, workout.uid, navigation, (alert = false));
  }
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
 * @param {String} series_UID The UID of the series.
 * @param {Function} setWorkout The hooks function called to update the workout state.
 */
export const onPressDefaultOptionsBool = (
  key,
  bool_state,
  setState,
  series_UID,
  setWorkout
) => {
  setState(!bool_state);
  onChangeUpdateSeries(key, !bool_state, series_UID, setWorkout);
};

/**
 * If the workout is filled, open the timer page. Otherwise, display an alert.
 * @param {Object} navigation The object containing function called to change the page to the View page.
 * @param {Object} workout The dictionary containing the state of the workout.
 */
export const onPressToTimer = (navigation, workout) => {
  if (!isEmpty(workout)) {
    navigation.navigate("Timer", { workout_UID: workout.uid });
  } else
    Alert.alert(
      "Incomplete workout",
      "Please complete all exercise fields before starting the workout.",
      [
        {
          text: "Fill workout",
          onPress: () =>
            navigation.navigate("Edit", { workout_UID: workout.uid }),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
};

export const onPressToEdit = (
  navigation,
  workout,
  setToggleState,
  setTxtState
) => {
  onPressToggleOptions(true, setToggleState, setTxtState);
  navigation.navigate("Edit", { workout_UID: workout.uid });
};
