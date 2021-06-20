import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

import Logo from "./Logo";
import { ColorsApp } from "../utils/app_properties";
import ButtonCross from "./ButtonCross";
import TextField from "./TextField";
import ButtonSquare from "./ButtonSquare";
import RadioList from "./RadioList";
import { ViewMode } from "../utils/app_type";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import SeriesField from "./SeriesField";
import LabelContainer from "./LabelContainer";
import ButtonPlus from "./ButtonPlus";

const HeaderFlatlist = () => {
  const states = [{key:1}, {key:2}, {key:3}, {key:4}, {key:5}]
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const [idCheckedRadioBtn, setIdCheckedRadioBtn] = useState(states[0].key);
  const [addRest, setAddRest] = useState(true);
  const [isTimer, setIsTimer] = useState(true);
  
  return (
    <View>
      <LabelContainer text={"Workout options"}/>

      <TextField
        txt_label={"The workout name"}
        txt_placeholder={"Upper Body Workout"}
        max_len={26}
      />
      <View style={styles.ctn_input}>
        <TextField
          txt_label={"Round"}
          txt_placeholder={"1"}
          max_len={6}
          is_center={true}
          is_numeric={true}
        />
        <TextField
          txt_label={"Rest time"}
          txt_placeholder={"10s"}
          max_len={6}
          is_center={true}
          is_numeric={true}
        />
        <TextField
          txt_label={"Final rest"}
          txt_placeholder={"60s"}
          max_len={6}
          is_center={true}
          is_numeric={true}
        />
      </View>

      {isShowingOptions && (
        <View>
          <LabelContainer text={"Advanced options"}/>
          <View style={styles.ctn_boxes}>
            <Text style={styles.lbl_ctn}>The days</Text>
            <View style={styles.ctn_flex_boxes}>
              <ButtonSquare text={"Mon"} />
              <ButtonSquare text={"Tue"} />
              <ButtonSquare text={"Wed"} />
              <ButtonSquare text={"Thu"} />
              <ButtonSquare text={"Fri"} />
              <ButtonSquare text={"Sat"} />
              <ButtonSquare text={"Sun"} />
            </View>
          </View>

          <View style={styles.ctn_boxes}>
            <Text style={styles.lbl_ctn}>The difficulty</Text>
            <RadioList items={states} current_checked={idCheckedRadioBtn} onChange={setIdCheckedRadioBtn} />
          </View>

          <View style={styles.ctn_boxes}>
            <Text style={styles.lbl_ctn}>The default values</Text>
            <View style={styles.ctn_flex_boxes}>
              <ButtonSquare text={"Add a rest"} state={addRest} />
              <ButtonSquare text={"Timer"} state={isTimer} />
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.btn_option}
        onPress={() =>
          setIsShowingOptions((isShowingOptions) => !isShowingOptions)
        }
      >
        <Text style={styles.btn_txt_option}>
          {isShowingOptions ? "Hide options" : "Show more options"}
        </Text>
      </TouchableOpacity>
      
      <View>
        <LabelContainer text={"Your program"}/>
        <SeriesField />
      </View>
    </View>
  );
}

const EmptyMessage = () => {
  return (
    <View style={styles.containerEmpty}>
      <Text style={styles.emptyText}>
        Tap to '+' button to create your first workout.
      </Text>
    </View>
  );
};

const BodyEdit_2 = (props) => {
  const workouts_store = useSelector((state) => state);
  const id = workouts_store.findIndex(
    (workout) => workout.id === props.workoutId
  );
  const [workout, setWorkout] = useState(workouts_store[id]);

  return (
    <View style={styles.ctn_main}>
      <View style={styles.ctn_header}>
        <Logo />
        <Text style={styles.txt_header}>Edit your workout</Text>
        <ButtonCross action={() => props.switcherMode(ViewMode)} />
      </View>

      <View style={styles.ctn_body}>
        <FlatList 
          ListHeaderComponent={HeaderFlatlist}
          ListEmptyComponent={EmptyMessage}
          data={workout.series}
          keyExtractor={series => series.id}
          renderItem={({ series }) => (
            <SeriesField default_state_rest={addRest} default_state_timer={isTimer} />
          )}
        />
      </View>
      
      <ButtonPlus positionX={25} positionY={20} />
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

  containerEmpty:{
  },

  emptyText: {
    color: ColorsApp.body,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    margin: 20,
  },
});
