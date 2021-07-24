// Import Libraries.
import React from "react";
import { Image, StyleSheet, View } from "react-native";

// Import Customs Components.
import ButtonCTA from "./ButtonCTA";
import TextTraduction from "./TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { ICON, LOGO } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { HOME } from "../utils/ConstantPage";

const FeedbackBodySent = ({ navigation, status }) => {
  return (
    <View style={styles.ctn_body}>
      {status == 200 ? (
        <View style={styles.ctn_centered}>
          <Image style={styles.img_delivering} source={LOGO.delivering} />
          <TextTraduction key_text={"contact_sent"} style={styles.txt_sent} />
        </View>
      ) : (
        <View style={styles.ctn_centered}>
          <Image style={styles.img_delivering} source={LOGO.network_error} />
          <TextTraduction key_text={"contact_error"} style={styles.txt_sent} />
        </View>
      )}

      <ButtonCTA
        key_text={"home"}
        onPress={() => navigation.navigate(HOME)}
        style={styles.btn_footer}
        source={ICON.white.home}
      />
    </View>
  );
};

export default FeedbackBodySent;

const styles = StyleSheet.create({
  ctn_body: {
    flex: 1,
  },

  ctn_centered: {
    alignItems: "center",
    backgroundColor: COLORS_APP.background,
    paddingTop: 20,
    marginHorizontal: 20,
  },

  txt_sent: {
    fontSize: 20,
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    marginTop: 20,
  },

  img_delivering: {
    width: 200,
    height: 200,
  },

  btn_footer: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
