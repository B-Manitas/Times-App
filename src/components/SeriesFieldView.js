// Librairies
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { useDispatch } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Custom components
import ButtonPlus from "./ButtonPlus";

// Main app properties
import {
  ColorsApp,
  colors_difficulty,
  FontFamily,
  path_icn_edit_bl,
} from "../utils/app_properties";
import {
  onPressToggleOptions,
  onPressRemoveWorkout,
  onPressToTimer,
  onPressToEdit,
} from "../scripts/buttonAction";
import ButtonImage from "./ButtonImage";
import { useRef } from "react";
import {
  getDuration,
  isLastHorizontalField,
  sumValueInObject,
} from "../scripts";

const RightSwipe = ({ navigation, dispatch, workout_UID }) => {
  let path_icn_remove = require("../../assets/icon/icn_remove_bl.png");

  return (
    <View style={styles.ctn_right}>
      <ButtonImage
        action={() => navigation.navigate("Edit", { workout_UID })}
        path={path_icn_edit_bl}
        size={30}
        style={styles.btn_swipe_right}
      />

      <ButtonImage
        action={() => onPressRemoveWorkout(dispatch, workout_UID)}
        path={path_icn_remove}
        size={30}
        style={[styles.btn_swipe_right, styles.btn_remove]}
      />
    </View>
  );
};

const SeriesFieldView = ({
  navigation,
  workout,
  workouts_len,
  index,
  horizontal = false,
}) => {
  const dispatch = useDispatch();

  const color_difficulty = colors_difficulty[workout.difficulty - 1];

  return (
    <View style={styles.ctn_main}>
      <Swipeable
        renderRightActions={() => (
          <RightSwipe
            navigation={navigation}
            dispatch={dispatch}
            workout_UID={workout.uid}
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
            onPress={() => onPressToTimer(navigation, workout)}
            style={styles.ctn_title}
          >
            <Text style={[styles.txt_workout_name, horizontal && styles.txt_workout_name_horz]} numberOfLines={2}>
              {workout.title == "" ? "No name" : workout.title}
            </Text>

            {!horizontal && 
              <Text style={styles.txt_descrition} numberOfLines={1}>
                Duration: {getDuration(workout.series, workout.round)}
                {isLastHorizontalField(workouts_len, index) &&
                  ` | Round: ${workout.round} | Exercice: ${workouts_len}`}
              </Text>
            }
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
    margin: 8,

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
    backgroundColor: ColorsApp.background_secs,
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

  txt_workout_name_horz:{
    color:ColorsApp.font_third,
    textAlign: "center",
  },

  ctn_title: {
    width: "100%",
    flex: 1,
    padding: 10,
  },

  txt_workout_name: {
    color: ColorsApp.font_secs,
    fontFamily: FontFamily.main,
    fontWeight: "bold",
  },

  txt_descrition: {
    fontSize: 12,
    fontFamily: FontFamily.main_reg,
    paddingTop: 3,
  },

  ctn_right: {
    flexDirection: "row",
    width: "50%",
  },

  btn_swipe_right: {
    marginLeft: 5,
    zIndex: -1,
    backgroundColor: ColorsApp.background_secs,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  btn_remove: {
    backgroundColor: ColorsApp.destructible,
  },

  img: {
    width: 30,
    height: 30,
  },
});
