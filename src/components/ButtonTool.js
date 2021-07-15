// Import Librairies
import React from "react";
import { View } from "react-native";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const ButtonTool = ({ navigation, screen, path_img, text }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      style={styles.btn}
    >
      <Image source={path_img} style={styles.btn_img} />
      <Text style={styles.btn_txt}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonTool;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS_APP.background_secs,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    flex: 1,
    maxHeight: 80,
    paddingVertical: 10,
  },

  btn_img: {
    width: 24,
    height: 24,
  },

  btn_txt: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: FONT_FAMILY.main,
    textTransform: "uppercase",
  },
});
