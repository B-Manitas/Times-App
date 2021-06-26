// Librairies
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useDispatch } from "react-redux";

// Custom components
import ButtonPlus from "./ButtonPlus";

// Main app properties
import {
  ColorsApp,
  colors_difficulty,
  FontFamily,
} from "../utils/app_properties";
import {
  onPressToggleOptions,
  onPressRemoveWorkout,
  onPressToTimer,
  onPressToEdit,
} from "../scripts/buttonAction";

const SeriesFieldView = ({ navigation, workout, horizontal = false }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [txtBtnOptions, setTxtBtnOptions] = useState("+");

  const color_difficulty = colors_difficulty[workout.difficulty - 1];

  return (
    <View
      style={[
        styles.ctn_main,
        { borderColor: color_difficulty },
        horizontal && styles.ctn_main_horizontal,
      ]}
    >
      <TouchableOpacity
        onPress={() => onPressToTimer(navigation, workout)}
        style={styles.ctn_title}
      >
        <Text style={styles.txt_workout_name} numberOfLines={2}>
          {workout.title == "" ? "No name" : workout.title}
        </Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.ctn_action}>
          <TouchableOpacity
            style={[styles.btn_action, { borderColor: color_difficulty }]}
            onPress={() => onPressRemoveWorkout(dispatch, workout.uid)}
          >
            <Text style={[styles.btn_txt_action]}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn_action, { borderColor: color_difficulty }]}
            onPress={() =>
              onPressToEdit(
                navigation,
                workout,
                setShowOptions,
                setTxtBtnOptions
              )
            }
          >
            <Text style={styles.btn_txt_action}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
      <ButtonPlus
        action={() =>
          onPressToggleOptions(showOptions, setShowOptions, setTxtBtnOptions)
        }
        size={22}
        positionY={-10}
        positionX={-8}
        text={txtBtnOptions}
        bg_color={color_difficulty}
        txt_color={ColorsApp.light_font}
      />
    </View>
  );
};

export default SeriesFieldView;

// Style Component
const styles = StyleSheet.create({
  ctn_main: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderRadius: 5,

    margin: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    justifyContent: "center",
    flex: 1,
    height: 60,
  },

  ctn_main_horizontal: {
    flex: 0,
    width: 150,
    height: 50,
  },

  ctn_title: {
    width: "100%",
    flex: 1,
    padding: 10,
  },

  ctn_action: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#fff",
    alignSelf: "center",
  },

  txt_workout_name: {
    color: ColorsApp.light_font,
    fontWeight: "bold",
    fontFamily: FontFamily.main,
  },

  btn_action: {
    flex: 1,
    borderRadius: 3,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },

  btn_txt_action: {
    color: ColorsApp.light_font,
    fontSize: 15,
    fontFamily: FontFamily.main_reg,
    fontWeight: "500",
  },
});
