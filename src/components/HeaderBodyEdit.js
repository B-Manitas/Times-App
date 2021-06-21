import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import TextField from "./TextField";
import ButtonSquare from "./ButtonSquare";
import RadioList from "./RadioList";
import LabelContainer from "./LabelContainer";
import { ColorsApp } from "../utils/app_properties";

const HeaderBodyEdit = ({addRest, setAddRest, isTimer, setIsTimer, workout, setWorkout, showOptions, setShowOptions}) => {
    const states_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const states_difficulty = [
      { key: 1 },
      { key: 2 },
      { key: 3 },
      { key: 4 },
      { key: 5 },
    ];

    const updateDays = (id, setWorkout) => {
      const new_state = workout.days.map((item, index) => {
        if (index === id) return !item;

        return item;
      });

      setWorkout({ ...workout, days: new_state });
    };

    return (
      <View>
        <LabelContainer text={"Workout options"} />

        <TextField
          txt_label={"The workout name"}
          txt_placeholder={"Upper Body Workout"}
          max_len={26}
          value={workout.title}
          onChange={(v) => setWorkout((p) => ({ ...p, title: v }))}
          key={"wourkout-name"}
          />
        <View style={styles.ctn_input}>
          <TextField
            txt_label={"Round"}
            txt_placeholder={"1"}
            max_len={6}
            is_center={true}
            is_numeric={true}
            value={workout.round}
            onChange={(v) => setWorkout((p) => ({ ...p, round: v }))}
            key={"wourkout-round"}
          />
          <TextField
            txt_label={"Rest time"}
            txt_placeholder={"10s"}
            max_len={6}
            is_center={true}
            is_numeric={true}
            value={workout.rest_time}
            onChange={(v) => setWorkout((p) => ({ ...p, rest_time: v }))}
            key={"wourkout-rest"}
          />
          <TextField
            txt_label={"Final rest"}
            txt_placeholder={"60s"}
            max_len={6}
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
                    <ButtonSquare
                      key={id}
                      text={day}
                      state={workout.days[id]}
                      onChange={() => updateDays(id, setWorkout)}
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
              />
            </View>

            <View style={styles.ctn_boxes}>
              <Text style={styles.lbl_ctn}>The default values</Text>
              <View style={styles.ctn_flex_boxes}>
                <ButtonSquare
                  text={"Add a rest"}
                  state={addRest}
                  onChange={() => setAddRest(!addRest)}
                />
                <ButtonSquare
                  text={"Timer"}
                  state={isTimer}
                  onChange={() => setIsTimer(!isTimer)}
                />
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.btn_option}
          onPress={() => setShowOptions((showOptions) => !showOptions)}
        >
          <Text style={styles.btn_txt_option}>
            {showOptions ? "Hide options" : "Show more options"}
          </Text>
        </TouchableOpacity>

        <LabelContainer text={"Your program"} />
      </View>
    );
  };

export default HeaderBodyEdit;

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