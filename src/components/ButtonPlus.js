import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ColorsApp } from '../utils/app_properties';

const ButtonPlus = ({action, size=40, positionX=0, positionY=0}) => {
  return (
    <TouchableOpacity 
    onPress={action}
    style={[styles.btn_add_series, {width: size, height: size, bottom: positionY, right: positionX}]} 
    >
      <Text style={styles.txt_add_series}>+</Text>
    </TouchableOpacity>
  );
};

export default ButtonPlus;

const styles = StyleSheet.create({
  btn_add_series:{
    position: "absolute",
    
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    
    backgroundColor: ColorsApp.light_font,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: ColorsApp.light_font,
  },

  txt_add_series:{
    color: "#fff",
    fontWeight: "bold",
  },
});