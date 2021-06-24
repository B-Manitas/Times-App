import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import { ColorsApp, FontFamily } from "../utils/app_properties";
import ButtonPlus from "../components/ButtonPlus";

import { onPressAddSeries } from "../scripts/buttonAction";

const FooterBodyEdit = ({workout, setWorkout}) => {
  return (
    <View style={styles.ctn_footer}>
      <ButtonPlus
        action={() => onPressAddSeries(workout, setWorkout)}
        style={{position: "relative", alignSelf: "center"}}
        bg_color={ColorsApp.light_font}
      />
      <Text style={styles.txt}>
        Create a new exercices
      </Text>
    </View>
  );
};

export default FooterBodyEdit;

const styles = StyleSheet.create({
  ctn_footer:{
    marginTop: 30,
  },

  txt: {
    fontFamily: FontFamily.main,
    color: ColorsApp.light_font,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  }
});

