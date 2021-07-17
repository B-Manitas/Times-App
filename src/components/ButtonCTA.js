// Import Libraries.
import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import TextTraduction from "./TextTraduction";

const ButtonCTA = ({
  source,
  style,
  onPress,
  key_text,
  is_main = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, is_main ? styles.is_main : styles.is_secs, style]}
    >
      {source && <Image source={source} style={styles.img} />}
      <TextTraduction key_text={key_text} style={styles.txt} />
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
    paddingHorizontal: 10,
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
    marginLeft: 10,
  },
});
