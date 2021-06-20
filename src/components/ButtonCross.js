import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ColorsApp } from '../utils/app_properties';

const ButtonCross = ({ style, action }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={action}>
      <Text style={[styles.btn_txt, style]}>x</Text>
    </TouchableOpacity>
  );
};

export default ButtonCross;

const styles = StyleSheet.create({
  btn:{
    position: 'absolute',
    top: 0,
    right: 0,
  },
  
  btn_txt: {
    color: ColorsApp.light_font,
    fontSize: 40,
    padding: 15,
  }
});
