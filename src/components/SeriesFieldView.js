// Import Librairies
import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Import Customs Components.
import ButtonImage from "./ButtonImage";

// Import Functions.
import { getDuration, isLastHorizontalField } from "../scripts";

// Import Constants.
import { COLORS_APP, COLORS_DIFFICULTY } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { ICON, LOGO } from "../utils/ConstantImages";
import TextTraduction from "./TextTraduction";

const RightSwipe = ({ onPressRemove, onPressEdit }) => {
  return (
    <View style={styles.ctn_right}>
      <ButtonImage
        onPress={onPressEdit}
        path={ICON.black.edit}
        size={30}
        style={styles.btn_swipe_right}
      />

      <ButtonImage
        onPress={onPressRemove}
        path={ICON.white.remove}
        size={30}
        style={[styles.btn_swipe_right, styles.btn_remove]}
      />
    </View>
  );
};

const WorkoutInformation = ({
  source,
  data,
  workouts_len,
  index,
  key_text,
  suffix,
}) => {
  return (
    <View
      style={[
        styles.ctn_info_sub,
        !isLastHorizontalField(workouts_len, index) && {
          marginHorizontal: 3,
        },
      ]}
    >
      <Image source={source} style={styles.info_img} />
      <Text style={styles.txt_info}>{data}</Text>
      {isLastHorizontalField(workouts_len, index) && (
        <TextTraduction
          key_text={key_text}
          suffix={suffix}
          style={styles.txt_info}
        />
      )}
    </View>
  );
};

const SeriesFieldView = ({
  onPressRemove,
  onPressEdit,
  onPressTimer,
  workout,
  workouts_len,
  index,
  horizontal = false,
}) => {
  const color_difficulty = COLORS_DIFFICULTY[workout.difficulty - 1];

  return (
    <View style={styles.ctn_main}>
      <Swipeable
        renderRightActions={() => (
          <RightSwipe
            onPressRemove={() => onPressRemove(workout.uid)}
            onPressEdit={() => onPressEdit(workout.uid)}
          />
        )}
      >
        <View
          style={[
            styles.ctn,
            { borderColor: color_difficulty },
            horizontal && styles.ctn_main_horizontal,
          ]}
        >
          <TouchableOpacity
            onPress={() => onPressTimer(workout)}
            style={styles.ctn_title}
          >
            <TextTraduction
              style={[
                styles.txt_workout_name,
                horizontal && styles.txt_workout_name_horz,
              ]}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              key_text={"no_workout_name"}
              text={workout.title}
            />

            {!horizontal && (
              <View
                style={[
                  styles.ctn_info,
                  !isLastHorizontalField(workouts_len, index) && {
                    justifyContent: "center",
                  },
                ]}
              >
                <WorkoutInformation
                  source={ICON.black.timer}
                  workouts_len={workouts_len}
                  index={index}
                  data={getDuration(workout.series, workout.round)}
                  suffix={"min"}
                />
                <WorkoutInformation
                  source={ICON.black.loop}
                  workouts_len={workouts_len}
                  data={workout.round ? workout.round : 0}
                  key_text={"round"}
                  index={index}
                  suffix={"s"}
                />
                <WorkoutInformation
                  source={ICON.black.workout}
                  workouts_len={workouts_len}
                  data={workouts_len}
                  key_text={"exercice"}
                  index={index}
                  suffix={"s"}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Swipeable>
    </View>
  );
};

export default SeriesFieldView;

// Style Component
const styles = StyleSheet.create({
  ctn_main: {
    margin: 5,

    height: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flex: 1,
  },

  ctn: {
    backgroundColor: COLORS_APP.background_secs,
    borderWidth: 3,
    borderRadius: 5,
    height: "100%",
    justifyContent: "center",
  },

  ctn_main_horizontal: {
    flex: 0,
    width: 150,
    height: 45,
    borderWidth: 2,
  },

  txt_workout_name_horz: {
    color: COLORS_APP.font_third,
    textAlign: "center",
  },

  ctn_title: {
    width: "100%",
    flex: 1,
    padding: 10,
  },

  txt_workout_name: {
    color: COLORS_APP.font_secs,
    fontFamily: FONT_FAMILY.main,
    fontWeight: "bold",
  },

  ctn_info: {
    flexDirection: "row",
    paddingTop: 8,
  },

  ctn_info_sub: {
    flexDirection: "row",
    marginHorizontal: 10,
  },

  txt_info: {
    paddingLeft: 2,
    color: COLORS_APP.font_third,
    fontFamily: FONT_FAMILY.main,
    textTransform: "lowercase",
  },

  info_img: {
    width: 18,
    height: 18,
  },

  ctn_right: {
    flexDirection: "row",
    width: "50%",
  },

  btn_swipe_right: {
    marginLeft: 5,
    zIndex: -1,
    backgroundColor: COLORS_APP.background_secs,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  btn_remove: {
    backgroundColor: COLORS_APP.background_destructible,
  },

  img: {
    width: 30,
    height: 30,
  },
});
