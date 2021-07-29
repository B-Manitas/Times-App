// Import Librairies.
import React from "react";
import { useDispatch } from "react-redux";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Import Functions.
import { getDuration, getAlertText } from "../scripts";
import { downloadWorkoutCreator } from "../redux/actionCreators";

// Import Customs Components.
import ButtonImage from "./ButtonImage";
import WorkoutFieldViewUnit from "./WorkoutFieldViewUnit";

// Import Constants.
import { ICON } from "../utils/ConstantImages";
import { COLORS_APP, COLORS_DIFFICULTY } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { WORKOUT_PREVIEW } from "../utils/ConstantPage";

const WorkoutFieldSearchView = ({ navigation, workout, language }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={[
        styles.ctn_workout,
        { borderColor: COLORS_DIFFICULTY[workout.difficulty - 1] },
      ]}
      onPress={() =>
        navigation.navigate(WORKOUT_PREVIEW, {
          workout,
          language,
          download,
        })
      }
    >
      <Text style={styles.txt_title}>{workout.title}</Text>
      <ButtonImage
        size={20}
        path={ICON.black.download}
        style={styles.btn_download}
        onPress={download}
      />
      <View style={styles.ctn_info}>
        <WorkoutFieldViewUnit
          source={ICON.black.timer}
          data={getDuration(workout.series, workout.round)}
          suffix={"min"}
          workout_len={1}
          index={0}
        />
        <WorkoutFieldViewUnit
          source={ICON.black.loop}
          data={workout.round ? workout.round : 0}
          key_text={"round"}
          suffix={"s"}
          workout_len={1}
          index={0}
        />
        <WorkoutFieldViewUnit
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

  /** Download the workout in local list. */
  function download() {
    Alert.alert(
      getAlertText(language, "success_download_ttl"),
      getAlertText(language, "success_download_body")
    );
    dispatch(downloadWorkoutCreator(workout));
  }
};

export default WorkoutFieldSearchView;

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
  },

  ctn_info: {
    flexDirection: "row",
    paddingTop: 8,
    justifyContent: "center",
  },
});
