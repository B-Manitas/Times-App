// Import Librairies
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Import Constants
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";
import { View } from "react-native";

const ButtonRound = ({
  onPress,
  text,
  container_style,
  style,
  size_ctn,
  size = 80,
}) => {
  return (
    <View
      style={[
        styles.ctn,
        container_style,
        { width: size_ctn, height: size_ctn },
      ]}
    >
      <TouchableOpacity
        style={[styles.btn, style, { width: size, height: size }]}
        onPress={onPress}
      >
        <Text style={styles.btn_txt}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonRound;

const styles = StyleSheet.create({
  ctn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: COLORS_APP.background,
  },

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
