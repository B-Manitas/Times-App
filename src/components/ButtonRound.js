// Import Librairies
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Import Constants
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";

const ButtonRound = ({ action, text, style, size = 80 }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, style, { width: size, height: size }]}
      onPress={action}
    >
      <Text style={styles.btn_txt}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonRound;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 200,
    backgroundColor: COLORS_APP.background_third,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderColor: COLORS_APP.outline_third,
    borderWidth: 3,
    borderColor: COLORS_APP.outline_secs,
  },

  btn_txt: {
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    fontSize: 30,
  },
});
