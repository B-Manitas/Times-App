// Import Libraries.
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

const ButtonCTA = ({ disabled, text, onPress, flex=1, fontSize=17 }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.btn, {flex}, disabled && styles.disabled]}
    >
      <Text style={[styles.txt, {fontSize}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCTA;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    paddingHorizontal: 2,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 2,
    marginHorizontal: 2,

    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS_APP.cta,
    backgroundColor: COLORS_APP.background_third,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  txt: {
    textAlign: "center",
    color: COLORS_APP.font_main,
    width: "100%",
    fontWeight: "bold",
  },

  disabled: {
    opacity: 0.3,
  },
});
