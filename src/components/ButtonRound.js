import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ColorsApp, FontFamily } from "../utils/app_properties";

const ButtonRound = ({action, text, style, size=80, bd_color}) => {
  return (
    <TouchableOpacity style={[styles.btn, style, {width: size, height: size}]} onPress={action}>
      <Text style={styles.btn_txt}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonRound;


const styles = StyleSheet.create({
  btn:{
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 200,
    backgroundColor: ColorsApp.background_third,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderColor: ColorsApp.logo,
    borderWidth: 3,
    borderColor: ColorsApp.outline_secs
  },
  
  btn_txt:{
    color: ColorsApp.font_main,
    fontFamily: FontFamily.main,
    fontSize: 30,
  }
})