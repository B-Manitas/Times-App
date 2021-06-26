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
        size={50}
        action={() => onPressAddSeries(workout, setWorkout)}
        style={{position: "relative", alignSelf: "center"}}
        bg_color={ColorsApp.border}
        txt_color={ColorsApp.logo_2}
        shadow={true}
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
    marginVertical: 30,
  },

  txt: {
    fontFamily: FontFamily.main,
    color: ColorsApp.light_font,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  }
});

