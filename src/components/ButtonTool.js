// Import Librairies
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";;

const ButtonTool = ({navigation, screen, path_img, text}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(screen)} style={styles.btn}>
      <Image source={path_img} style={styles.btn_img} />
      <Text style={styles.btn_txt}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonTool;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 60,
    backgroundColor: COLORS_APP.background_secs,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  btn_img: {
    width: 43,
    height: 43,
  },

  btn_txt: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: FONT_FAMILY.main,
  },
});
