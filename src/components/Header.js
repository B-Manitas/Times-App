// Import Librairies
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const Header = ({ text, path_img }) => {
  return (
    <View style={styles.ctn}>
      <Image source={path_img} style={styles.logo} />
      <Text style={styles.txt}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  ctn: {
    padding: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  txt: {
    marginLeft: 15,
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
  },

  logo: {
    width: 60,
    height: 60,
  },
});
