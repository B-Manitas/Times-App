// Import Librairies
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import TextTraduction from "./TextTraduction";

const ButtonTextMenu = ({
  src_img,
  key_text,
  id,
  is_active,
  onPress,
  flex = 1,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress(id)}
      style={[styles.btn, { flex }, is_active && styles.btn_atv]}
    >
      <Image style={styles.btn_img} source={src_img} />
      <TextTraduction style={styles.btn_txt} key_text={key_text} />
    </TouchableOpacity>
  );
};

export default ButtonTextMenu;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
    marginRight: 10,
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
