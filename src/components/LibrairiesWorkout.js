// Import Librairies.
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { getDuration } from "../scripts";

// Import Customs Components.
import ButtonImage from "../components/ButtonImage";

// Import Constants.
import { ICON, LOGO, MUSCLES } from "../utils/ConstantImages";
import { COLORS_APP, COLORS_DIFFICULTY } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { LIBRAIRIES_PREVIEW } from "../utils/ConstantPage";
import SeriesFieldViewInformation from "./SeriesFieldViewInformation";
import {
  addWorkoutCreator,
  downloadWorkoutCreator,
} from "../redux/actionCreators";
import { useDispatch } from "react-redux";

const LibrairiesWorkout = ({ navigation, workout }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={[
        styles.ctn_workout,
        { borderColor: COLORS_DIFFICULTY[workout.difficulty - 1] },
      ]}
      onPress={() =>
        navigation.navigate(LIBRAIRIES_PREVIEW, { workout_UID: workout.uid })
      }
    >
      <Text style={styles.txt_title}>{workout.title}</Text>
      <ButtonImage
        size={20}
        path={ICON.black.upload}
        style={styles.btn_download}
      />
      <View style={styles.ctn_info}>
        <SeriesFieldViewInformation
          source={ICON.black.timer}
          data={getDuration(workout.series, workout.round)}
          suffix={"min"}
          workout_len={1}
          index={0}
        />
        <SeriesFieldViewInformation
          source={ICON.black.loop}
          data={workout.round ? workout.round : 0}
          key_text={"round"}
          suffix={"s"}
          workout_len={1}
          index={0}
        />
        <SeriesFieldViewInformation
          source={ICON.black.workout}
          data={workout.series.length}
          key_text={"exercice"}
          suffix={"s"}
          workout_len={1}
          index={0}
        />
      </View>
    </TouchableOpacity>
  );

  function download() {
    dispatch(downloadWorkoutCreator());
  }
};

export default LibrairiesWorkout;

const styles = StyleSheet.create({
  ctn_workout: {
    marginVertical: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flex: 1,
    backgroundColor: COLORS_APP.background_secs,
    borderWidth: 3,
    borderRadius: 5,
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  txt_title: {
    color: COLORS_APP.font_secs,
    fontFamily: FONT_FAMILY.main,
    fontWeight: "bold",
  },

  btn_download: {
    position: "absolute",
    right: 5,
    top: 5,
    transform: [{ rotate: "180deg" }],
  },

  ctn_info: {
    flexDirection: "row",
    paddingTop: 8,
    justifyContent: "center",
  },
});
