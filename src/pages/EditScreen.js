import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import Logo from "../components/Logo";
import { ColorsApp } from "../utils/app_properties";
import ButtonCross from "../components/ButtonCross";
import { ViewMode } from "../utils/app_type";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import SeriesField from "../components/SeriesField";
import ButtonPlus from "../components/ButtonPlus";
import ContainerPage from "../components/containers/ContainerPage";
import { onPressAddSeries } from "../scripts/buttonAction";
import HeaderBodyEdit from "../components/HeaderBodyEdit";
import {
  editWorkoutCreator,
  removeWorkoutCreator,
} from "../redux/actionCreators";
import { Alert } from "react-native";
import { orientToPortrait } from "../scripts";

const EmptyMessage = () => {
  return (
    <View>
      <Text style={styles.emptyText}>
        Tap to '+' button to create a new exercises.
      </Text>
    </View>
  );
};

const EditScreen = ({ navigation, route }) => {
  const workouts_store = useSelector((state) => state);
  const dispatch = useDispatch();
  const id = workouts_store.findIndex(
    (workout) => workout.id === route.params.workout_UID
  );
  const [workout, setWorkout] = useState(workouts_store[id]);
  const [showOptions, setShowOptions] = useState(false);
  const [addRest, setAddRest] = useState(true);
  const [isTimer, setIsTimer] = useState(true);
  orientToPortrait();

  const onPressEditWorkout = () => {
    dispatch(editWorkoutCreator(workout.id, workout));
    navigation.navigate("Home", { workoutId: workout.id });
  };

  const onPressCancel = () => {
    navigation.navigate("Home", { workoutId: workout.id });
  };

  const onPressCross = () => {
    Alert.alert(
      "Unsaved changes",
      "You are about to leave this page without saving your workout.",
      [
        { text: "Leave", onPress: onPressCancel, style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const renderItem = useCallback(
    ({ item }) => (
      <SeriesField
        series_state={item}
        setWorkout={setWorkout}
        default_state_rest={addRest}
        default_state_timer={isTimer}
      />
    ),
    []
  );

  const ListHeaderComponent = useCallback(
    () => (
      <HeaderBodyEdit
        addRest={addRest}
        setAddRest={setAddRest}
        isTimer={isTimer}
        setIsTimer={setIsTimer}
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        workout={workout}
        setWorkout={(v) => setWorkout(v)}
      />
    ),
    [showOptions, workout.days, workout.difficulty]
  );

  const ListFooterComponent = useCallback(() => <EmptyMessage />, []);
  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <ContainerPage style={styles.ctn_main}>
      <View style={styles.ctn_header}>
        <Logo />
        <Text style={styles.txt_header}>Edit your workout</Text>
        <ButtonCross action={onPressCross} />
      </View>

      <KeyboardAvoidingView behavior={"padding"} style={styles.ctn_body}>
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          data={workout.series}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity
        onPress={() => onPressEditWorkout()}
        style={styles.btn_save}
      >
        <Text style={styles.btn_txt_save}>Save</Text>
      </TouchableOpacity>
      <ButtonPlus
        action={() => onPressAddSeries(workout, setWorkout)}
        positionX={20}
        positionY={20}
      />
    </ContainerPage>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  ctn_main: {
    flex: 1,
    backgroundColor: "#fff",
  },

  ctn_header: {
    position: "absolute",
    top: 0,
    paddingTop: 40,
    padding: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  txt_header: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: ColorsApp.light_font,
  },

  ctn_body: {
    width: "90%",
    alignSelf: "center",
    marginTop: 140,
    height: "100%",
  },

  emptyText: {
    color: ColorsApp.body,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    margin: 20,
  },

  btn_save: {
    position: "absolute",
    bottom: 20,
    left: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: ColorsApp.light_font,
  },

  btn_txt_save: {
    color: "#fff",
    fontWeight: "bold",
  },
});
