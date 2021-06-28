import React from "react";
import { View, StyleSheet } from "react-native";
import TextField from "./TextField";
import LabelContainer from "./LabelContainer";
import { ColorsApp, FontFamily } from "../utils/app_properties";

const HeaderBodyEdit = ({addRest, setAddRest, isTimer, setIsTimer, workout, setWorkout, showOptions, setShowOptions}) => {
    return (
      <View style={styles.ctn_main}>
        <LabelContainer text={"Workout options"} />

        <TextField
          txt_label={"Workout name"}
          txt_placeholder={"Upper Body Workout"}
          max_len={40}
          value={workout.title}
          onChange={(v) => setWorkout((p) => ({ ...p, title: v }))}
          key={"wourkout-name"}
          />
        <View style={styles.ctn_input}>
          <TextField
            txt_label={"Round"}
            txt_placeholder={"1"}
            max_len={3}
            is_center={true}
            is_numeric={true}
            value={workout.round}
            onChange={(v) => setWorkout((p) => ({ ...p, round: v }))}
            key={"wourkout-round"}
          />
          <TextField
            txt_label={"Rest time"}
            txt_placeholder={"10s"}
            max_len={4}
            is_center={true}
            is_numeric={true}
            value={workout.rest_time}
            onChange={(v) => setWorkout((p) => ({ ...p, rest_time: v }))}
            key={"wourkout-rest"}
          />
          <TextField
            txt_label={"Final rest"}
            txt_placeholder={"60s"}
            max_len={4}
            is_center={true}
            is_numeric={true}
            value={workout.final_rest}
            onChange={(v) => setWorkout((p) => ({ ...p, final_rest: v }))}
            key={"wourkout-final-rest"}
          />
        </View>
        <LabelContainer text={"Program"} />
      </View>
    );
  };

export default HeaderBodyEdit;

const styles = StyleSheet.create({
  ctn_main:{
    backgroundColor: ColorsApp.background_,
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
    fontFamily: FontFamily.main
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
    fontFamily: FontFamily.main
  },

  btn_tgl_active:{
    borderColor: ColorsApp.logo
  }
});