// Import Librairies
import React from "react";
import { View } from "react-native";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import TextTraduction from "./TextTraduction";

const ButtonMore = ({ navigation, screen, path_img, text, key_text }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      style={styles.btn}
    >
      <Image source={path_img} style={styles.btn_img} />
      {key_text ? (
        <TextTraduction
          style={styles.btn_txt}
          adjustsFontSizeToFit={true}
          key_text={key_text}
        />
      ) : (
        <Text style={styles.btn_txt} adjustsFontSizeToFit={true}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonMore;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS_APP.background_secs,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    maxHeight: 80,
    paddingVertical: 10,
    flex: 1,
  },

  btn_img: {
    width: 30,
    height: 30,
  },

  btn_txt: {
    marginTop: 10,
    marginHorizontal: 5,
    fontFamily: FONT_FAMILY.main,
    textTransform: "uppercase",
  },
});
