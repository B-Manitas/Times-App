import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ColorsApp, FontFamily } from '../utils/app_properties';

const ButtonCross = ({ style, action }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={action}>
      <Text style={[styles.txt, style]}>x</Text>
    </TouchableOpacity>
  );
};

export default ButtonCross;

const styles = StyleSheet.create({
  btn:{
    position: 'absolute',
    top: 3,
    right: 0,
  },
  
  txt: {
    color: ColorsApp.light_font,
    fontSize: 40,
    padding: 15,
    fontFamily: FontFamily.main,
  }
});
