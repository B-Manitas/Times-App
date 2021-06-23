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
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import SeriesField from "../components/SeriesField";
import ButtonPlus from "../components/ButtonPlus";
import ContainerPage from "../components/ContainerPage";
import { onPressAddSeries, onPressCancelAlrtUnsvd, onPressEditWorkout } from "../scripts/buttonAction";
import HeaderBodyEdit from "../components/HeaderBodyEdit";
import { setOrient } from "../scripts";

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
  // Set the orientation to portrait.
  setOrient();

  const workouts_store = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  const id = workouts_store.findIndex(
    (workout) => workout.uid === route.params.workout_UID
  );
  const [workout, setWorkout] = useState(workouts_store[id]);
  const [showOptions, setShowOptions] = useState(false);
  const [addRest, setAddRest] = useState(true);
  const [isTimer, setIsTimer] = useState(true);

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
  const keyExtractor = useCallback((item) => item.uid, []);

  return (
    <ContainerPage style={styles.ctn_main}>
      <View style={styles.ctn_header}>
        <Logo />
        <Text style={styles.txt_header}>Edit your workout</Text>
        <ButtonCross action={() => onPressCancelAlrtUnsvd(dispatch, navigation, workout)} />
      </View>

      <KeyboardAvoidingView keyboardVerticalOffset={20} behavior={"padding"} style={styles.ctn_body}>
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          contentContainerStyle={{paddingBottom: 150}}
          extraData={workout.series}
          data={workout.series}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity
        onPress={() => onPressEditWorkout(navigation, dispatch, workout)}
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
    paddingBottom: 75,
  },

  ctn_header: {
    position: "absolute",
    top: 0,
    paddingTop: 20,
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
    marginTop: 100,
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
