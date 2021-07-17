// Import Librairies.
import React from "react";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";

// Import Constants.
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";
import TextTraduction from "./TextTraduction";

const ButtonFooter = ({
  navigation,
  screen,
  active,
  path_image,
  button_flex,
  key_text,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => navigation.navigate(screen)}
      style={[styles.btn, { flex: button_flex }, disabled && { opacity: 0.6 }]}
    >
      <Image source={path_image} style={styles.img} />
      {active === true ? (
        <View style={styles.shape_active} />
      ) : (
        <TextTraduction style={styles.txt} key_text={key_text} />
      )}
    </TouchableOpacity>
  );
};

export default ButtonFooter;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: COLORS_APP.background,
    borderColor: COLORS_APP.outline_main,
  },

  shape_active: {
    backgroundColor: COLORS_APP.cta,
    width: 15,
    height: 2,
  },

  img: {
    width: 30,
    height: 30,
  },

  txt: {
    fontSize: 9,
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    textTransform: "uppercase",
  },
});
