// Import Librairies
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Import Customs Components
import { onPressAddSeries } from "../scripts/buttonAction";

// Import Functions.
import ButtonImage from "./ButtonImage";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { path_icn_add_wh } from "../utils/ConstantImages";

const FooterBodyEdit = ({ workout, setWorkout }) => {
  return (
    <View style={styles.ctn_footer}>
      <ButtonImage
        path={path_icn_add_wh}
        size={45}
        style={styles.btn}
        opacity={0.5}
        action={() => onPressAddSeries(workout, setWorkout)}
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
