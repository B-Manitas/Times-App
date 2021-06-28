import React from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  ColorsApp,
  FontFamily,
  path_icn_add_wh,
} from "../utils/app_properties";
import ButtonPlus from "../components/ButtonPlus";

import { onPressAddSeries } from "../scripts/buttonAction";
import ButtonImage from "./ButtonImage";

const FooterBodyEdit = ({workout, setWorkout}) => {
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
    fontFamily: FontFamily.main,
    color: ColorsApp.font_secs,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
