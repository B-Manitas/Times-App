// Import Librairies.
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { getDuration } from "../scripts";

// Import Customs Components.
import ButtonImage from "../components/ButtonImage";

// Import Constants.
import { ICON } from "../utils/ConstantImages";
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { LIBRAIRIES_PREVIEW } from "../utils/ConstantPage";

const LibrairiesWorkout = ({ navigation, workout }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(LIBRAIRIES_PREVIEW, {workout_UID: workout.uid})}
      style={styles.ctn_workout}
    >
      <View style={styles.ctn_workout_header}>
        <Text style={styles.txt_workout_header}>{workout.title}</Text>
        <ButtonImage path={ICON.black.download} />
      </View>

      <View style={styles.ctn_info}>
        <View style={styles.ctn_info_sub}>
          <Image style={styles.info_img} source={ICON.black.workout} />
          <Text style={styles.txt_info}>Difficulty: {workout.difficulty}</Text>
        </View>
        <View style={styles.ctn_info_sub}>
          <Image style={styles.info_img} source={ICON.black.timer} />
          <Text style={styles.txt_info}>
            Temps: {getDuration(workout.series, workout.round)}min
          </Text>
        </View>
      </View>

      <View style={styles.ctn_info_sub}>
        <Image style={styles.info_img} source={ICON.black.body} />
        <Text style={styles.txt_info}>Corps: Abdo</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LibrairiesWorkout;

const styles = StyleSheet.create({
  ctn_header: {
    padding: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  ctn_workout: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: COLORS_APP.background_secs,
    height: 100,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },

  ctn_workout_header: {
    flexDirection: "row",
  },

  txt_workout_header: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_third,
    textDecorationLine: "underline",
    flex: 1,
  },

  ctn_info: {
    flexDirection: "row",
  },

  ctn_info_sub: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    padding: 5,
  },

  txt_info: {
    color: COLORS_APP.font_secs,
  },

  info_img: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
});
