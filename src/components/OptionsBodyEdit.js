import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ButtonToggle from "./ButtonToggle";

import LabelContainer from "./LabelContainer";
import RadioList from "./RadioList";
import {
  ColorsApp,
  colors_difficulty,
} from "../utils/app_properties";
import { onPressDays } from "../scripts/buttonAction";

const OptionsBodyEdit = ({ workout, setWorkout }) => {
  const states_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const states_difficulty = [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
  ];

  return (
    <View>
      <LabelContainer text={"Schedule"} />
      <View style={styles.ctn_boxes}>
        <View style={styles.ctn_flex_boxes}>
          {states_days.map((day, id) => {
            return (
              <ButtonToggle
                key={id}
                text={day}
                txt_colors={ColorsApp.font_third}
                state={workout.days[id]}
                onChange={() => onPressDays(id, workout, setWorkout)}
                style_active={styles.btn_tgl_active}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.ctn_boxes}>
        <LabelContainer text={"Difficulty"}/>
        <RadioList
          items={states_difficulty}
          current_checked={states_difficulty[workout.difficulty - 1].key}
          onChange={(v) => setWorkout({ ...workout, difficulty: v })}
          bd_colors={colors_difficulty}
        />
      </View>
    </View>
  );
};

export default OptionsBodyEdit;

const styles = StyleSheet.create({
  ctn_flex_boxes: {
    flexDirection: "row",
  },

  btn_tgl_active: {
    borderColor: ColorsApp.cta,
  },
});
