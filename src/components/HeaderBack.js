// Import Librairies.
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// Import Customs Components.
import ButtonImage from "./ButtonImage";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { ICON } from "../utils/ConstantImages";
import { Button } from "react-native";

const HeaderBack = ({ onPress, text }) => {
  return (
    <View style={styles.ctn_header}>
      <ButtonImage onPress={onPress} path={ICON.white.back} />
      <Text style={styles.txt}>{text}</Text>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  ctn_header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 30,
    width: "100%",
    alignItems: "center",
  },

  txt: {
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: -1,
    textAlign: "center",
    fontSize: 30,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
  },
});
