// Import Librairies
import React from "react";
import { Text, StyleSheet, View } from "react-native";

// Import Custom Components.
import TextTraduction from "./TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const LabelContainer = ({ text, key_text, size = 15 }) => {
  return (
    <View style={styles.ctn_main}>
      {key_text != undefined ? (
        <TextTraduction
          style={[styles.text, { fontSize: size }]}
          key_text={key_text}
          suffix={" :"}
        />
      ) : (
        <Text style={[styles.text, { fontSize: size }]}>{text} :</Text>
      )}
    </View>
  );
};

export default LabelContainer;

const styles = StyleSheet.create({
  ctn_main: {
    marginVertical: 10,
  },

  text: {
    color: COLORS_APP.font_main,
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontFamily: FONT_FAMILY.main,
  },
});
