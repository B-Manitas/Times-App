import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import TextField from "./TextField";
import ButtonToggle from "./ButtonToggle";
import RadioList from "./RadioList";
import LabelContainer from "./LabelContainer";
import { ColorsApp, colors_difficulty, FontFamily } from "../utils/app_properties";
import { onPressDays } from "../scripts/buttonAction";

const HeaderBodyEdit = ({addRest, setAddRest, isTimer, setIsTimer, workout, setWorkout, showOptions, setShowOptions}) => {
    const states_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const states_difficulty = [
      { key: 1 },
      { key: 2 },
      { key: 3 },
      { key: 4 },
      { key: 5 }
    ];

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

        {showOptions && (
          <View>
            <LabelContainer text={"Advanced options"} />
            <View style={styles.ctn_boxes}>
              <Text style={styles.lbl_ctn}>The days</Text>
              <View style={styles.ctn_flex_boxes}>
                {states_days.map((day, id) => {
                  return (
                    <ButtonToggle
                      key={id}
                      text={day}
                      state={workout.days[id]}
                      onChange={() => onPressDays(id, workout, setWorkout)}
                      style_active={styles.btn_tgl_active}
                    />
                  );
                })}
              </View>
            </View>

            <View style={styles.ctn_boxes}>
              <Text style={styles.lbl_ctn}>
                The difficulty
              </Text>
              <RadioList
                items={states_difficulty}
                current_checked={states_difficulty[workout.difficulty - 1].key}
                onChange={(v) => setWorkout({ ...workout, difficulty: v })}
                bd_colors={colors_difficulty}
              />
            </View>

            <View style={styles.ctn_boxes}>
              <Text style={styles.lbl_ctn}>The default values</Text>
              <View style={styles.ctn_flex_boxes}>
                <ButtonToggle
                  text={"Add a rest"}
                  txt_active={"No rest"}
                  state={addRest}
                  onChange={() => setAddRest(!addRest)}
                />
                <ButtonToggle
                  text={"Timer"}
                  txt_active={"Counter"}
                  state={isTimer}
                  onChange={() => setIsTimer(!isTimer)}
                />
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.btn_option}
          onPress={() => setShowOptions((shows) => !shows)}
        >
          <Text style={styles.btn_txt_option}>
            {showOptions ? "Hide options" : "Show more options"}
          </Text>
        </TouchableOpacity>

        <LabelContainer text={"Program"} />
      </View>
    );
  };

export default HeaderBodyEdit;

const styles = StyleSheet.create({
  ctn_main:{
    backgroundColor: ColorsApp.background,
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