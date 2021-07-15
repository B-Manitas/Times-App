// Import Librairies
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const ButtonMenu = ({ src_img, text, id, is_active, onPress, flex=1, disabled=false }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={()=>onPress(id)} style={[styles.btn, {flex}, is_active && styles.btn_atv]}>
      <Image style={styles.btn_img} source={src_img} />
      <Text style={styles.btn_txt}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonMenu;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
    // marginRight: 10,
    // marginHorizontal: 5,
    paddingHorizontal: 5,
  },

  btn_atv: {
    borderBottomWidth: 2,
    borderColor: COLORS_APP.cta,
  },

  btn_img: {
    width: 24,
    height: 24,
  },

  btn_txt: {
    color: COLORS_APP.font_main,
    fontSize: 18,
    fontFamily: FONT_FAMILY.main,
    marginLeft: 10,
  },
});
