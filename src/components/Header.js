// Import Librairies
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Import Custom components.
import ButtonImage from "../components/ButtonImage";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { ICON } from "../utils/ConstantImages";

const Header = ({ text, path_img, onPressClose }) => {
  return (
    <View style={styles.ctn}>
      <Image source={path_img} style={styles.logo} />
      <Text style={styles.txt} adjustsFontSizeToFit={true}>
        {text}
      </Text>

      {onPressClose && (
        <ButtonImage
          path={ICON.white.close}
          onPress={onPressClose}
          size={36}
          style={styles.btn_close}
        />
      )}
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

  logo: {
    width: 60,
    height: 60,
  },

  txt: {
    marginHorizontal: 15,
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
  },

  btn_close: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
});
