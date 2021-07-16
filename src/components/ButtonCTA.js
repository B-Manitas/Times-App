// Import Libraries.
import React from "react";
import { View } from "react-native";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const ButtonCTA = ({ text, source, style, onPress, is_main = true }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, is_main ? styles.is_main : styles.is_secs, style]}
    >
      {source && <Image source={source} style={styles.img} />}
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCTA;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 2,
  },

  is_main: {
    backgroundColor: COLORS_APP.cta,
    justifyContent: "space-between",
    flexDirection: "row",
    width: 100,
  },

  is_secs: {
    backgroundColor: COLORS_APP.background_third,
    width: 50,
    height: 60,
  },

  img: { width: 36, height: 36 },

  txt: {
    fontWeight: "bold",
    fontFamily: FONT_FAMILY.main,
    color: "#fff",
    fontSize: 16,
  },
});
