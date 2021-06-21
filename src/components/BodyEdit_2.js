import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Logo from "./Logo";
import { ColorsApp } from "../utils/app_properties";
import ButtonCross from "./ButtonCross";
import TextField from "./TextField";
import ButtonSquare from "./ButtonSquare";
import RadioList from "./RadioList";
import { ViewMode } from "../utils/app_type";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import SeriesField from "./SeriesField";
import LabelContainer from "./LabelContainer";
import ButtonPlus from "./ButtonPlus";
import {
  onPressAction,
  onPressAddSeries,
  onPressAddWorkout,
  // onPressEditWorkout,
} from "../scripts/buttonAction";
import HeaderBodyEdit from "./HeaderBodyEdit";
import { editWorkoutCreator } from "../redux/actionCreators";

const EmptyMessage = () => {
  return (
    <View>
      <Text style={styles.emptyText}>
        Tap to '+' button to create a new exercises.
      </Text>
    </View>
  );
};

const BodyEdit_2 = (props) => {
  const workouts_store = useSelector((state) => state);
  const dispatch = useDispatch();
  const id = workouts_store.findIndex(
    (workout) => workout.id === props.workoutId
  );
  const [workout, setWorkout] = useState(workouts_store[id]);
  const [showOptions, setShowOptions] = useState(false);
  const [addRest, setAddRest] = useState(true);
  const [isTimer, setIsTimer] = useState(true);

  const onPressEditWorkout = () => {
    dispatch(editWorkoutCreator(workout.id, workout));
    props.switcherMode(ViewMode, workout.id);
  };

  return (
    <View style={styles.ctn_main}>
      <View style={styles.ctn_header}>
        <Logo />
        <Text style={styles.txt_header}>Edit your workout</Text>
        <ButtonCross action={() => props.switcherMode(ViewMode)} />
      </View>
      
      <View style={styles.ctn_body}>
        <FlatList
          ListHeaderComponent={() => 
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
          }
          ListFooterComponent={EmptyMessage}
          contentContainerStyle={{paddingBottom:400}}
          extraData={workout}
          data={workout.series}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SeriesField
              series_state={item}
              setWorkout={setWorkout}
              default_state_rest={addRest}
              default_state_timer={isTimer}
            />
          )}
        />
      </View>

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
    </View>
  );
};

export default BodyEdit_2;

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

  btn_txt_cross: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 20,
  },

  ctn_body: {
    width: "90%",
    alignSelf: "center",
    marginTop: 140,
    height: "100%",
  },

  ctn_input: {
    flexDirection: "row",
  },

  ctn_boxes: {
    marginBottom: 20,
  },

  lbl_ctn: {
    color: ColorsApp.light_font,
    fontWeight: "bold",
    fontSize: 13,
  },

  ctn_flex_boxes: {
    flexDirection: "row",
  },

  btn_option: {
    borderColor: ColorsApp.border,
    borderWidth: 2,
    borderRadius: 5,

    margin: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,

    backgroundColor: "#fff",
    paddingVertical: 10,
  },

  btn_txt_option: {
    textAlign: "center",
    color: ColorsApp.light_font,
    fontWeight: "bold",
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
