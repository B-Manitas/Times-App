// Import Librairies.
import React from "react";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";

// Import Constants.
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";

const ButtonFooter = ({navigation, screen, key_active, path_image, text, button_flex}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(screen)} style={[styles.btn, {flex:button_flex}]}>
      <Image source={path_image} style={styles.img} />
      {key_active==text ? (
        <View style={styles.shape_active} />
      ) : (
        <Text style={styles.txt}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonFooter;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
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
