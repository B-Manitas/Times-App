// Import Librairies
import React from "react";
import { StyleSheet, View } from "react-native";

// Import Customs Components.
import TextField from "./TextField";
import LabelContainer from "./LabelContainer";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { getTradText } from "../scripts";

const HeaderBodyEdit = ({ language, workout, setWorkout }) => {
  const propsNumeric = {
    max_len: 4,
    is_center: true,
    is_numeric: true,
  };

  return (
    <View style={styles.ctn_main}>
      <LabelContainer key_text={"workout_options"} />

      <TextField
        key_text={"workout_name"}
        txt_placeholder={getTradText(language, "plh_workout_name")}
        max_len={40}
        value={workout.title}
        onChange={(v) => setWorkout((p) => ({ ...p, title: v }))}
        key={"wourkout-name"}
      />
      <View style={styles.ctn_input}>
        <TextField
          key_text={"round"}
          txt_placeholder={"1"}
          value={workout.round}
          onChange={(v) => setWorkout((p) => ({ ...p, round: v }))}
          {...propsNumeric}
          key={"wourkout-round"}
          is_center={true}
          flex={1 / 2}
        />
        <TextField
          flex={1 / 2}
          key_text={"rest_time"}
          txt_placeholder={"10s"}
          value={workout.rest_time}
          onChange={(v) => setWorkout((p) => ({ ...p, rest_time: v }))}
          key={"wourkout-rest"}
          {...propsNumeric}
        />
        <TextField
          key_text={"final_rest"}
          txt_placeholder={"60s"}
          value={workout.final_rest}
          onChange={(v) => setWorkout((p) => ({ ...p, final_rest: v }))}
          key={"wourkout-final-rest"}
          {...propsNumeric}
        />
      </View>
      <LabelContainer key_text={"program"} />
    </View>
  );
};

export default HeaderBodyEdit;

const styles = StyleSheet.create({
  ctn_main: {
    backgroundColor: COLORS_APP.background,
  },

  ctn_input: {
    flexDirection: "row",
  },
});
