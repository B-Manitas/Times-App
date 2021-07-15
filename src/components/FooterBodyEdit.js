// Import Librairies
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Import Functions.
import ButtonImage from "./ButtonImage";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { ICON } from "../utils/ConstantImages";

const FooterBodyEdit = ({ onPressAddSeries }) => {
  return (
    <View style={styles.ctn_footer}>
      <ButtonImage
        path={ICON.white.add}
        size={45}
        style={styles.btn}
        opacity={0.5}
        onPress={onPressAddSeries}
      />
      <Text style={styles.txt}>New exercice</Text>
    </View>
  );
};

export default FooterBodyEdit;

const styles = StyleSheet.create({
  ctn_footer: {
    marginVertical: 30,
  },

  btn: {
    position: "relative",
    alignSelf: "center",
  },

  txt: {
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_secs,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
