// Import Librairies
import React from "react";
import { View, StyleSheet } from "react-native";

// Import Custom Components.
import ButtonImage from "./ButtonImage";
import TextTraduction from "./TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { ICON } from "../utils/ConstantImages";

const EditFooter = ({ onPressAddSeries }) => {
  return (
    <View style={styles.ctn_footer}>
      <ButtonImage
        path={ICON.white.add}
        size={45}
        style={styles.btn}
        opacity={0.5}
        onPress={onPressAddSeries}
      />
      <TextTraduction key_text={"new_exercice"} style={styles.txt} />
    </View>
  );
};

export default EditFooter;

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
