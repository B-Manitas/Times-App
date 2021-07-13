// Import Librairies.
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Import Customs Components.
import ButtonRound from "../components/ButtonRound";
import ButtonFooter from "./ButtonFooter";

// Import Constants.
import {
  path_icn_home_wh,
  path_icn_store_wh,
  path_icn_toolbox_wh,
  path_icn_more_wh
} from "../utils/ConstantImages";
import { COLORS_APP } from "../utils/ConstantColors";

const Footer = ({
  navigation,
  current_key_active = "home",
  functionAdd = null,
}) => {
  let flex_number = 1/6;
  return (
    <View style={styles.ctn}>
      <ButtonFooter
        navigation={navigation}
        screen={"Home"}
        button_flex={flex_number}
        key_active={current_key_active}
        text={"home"}
        path_image={path_icn_home_wh}
      />
      <ButtonFooter
        navigation={navigation}
        screen={"Tools"}
        button_flex={flex_number}
        key_active={current_key_active}
        text={"tools"}
        path_image={path_icn_toolbox_wh}
      />
      <ButtonFooter
        navigation={navigation}
        screen={"Tools"}
        button_flex={flex_number}
        key_active={current_key_active}
        text={"store"}
        path_image={path_icn_store_wh}
      />

      <ButtonFooter
        navigation={navigation}
        screen={"Tools"}
        button_flex={flex_number}
        key_active={current_key_active}
        text={"help"}
        path_image={path_icn_more_wh}
      />

      <ButtonRound
        onPress={functionAdd}
        text={"+"}
        size={52}
        size_ctn={76}
        container_style={styles.ctn_btn_add}
        style={styles.btn_add}
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  ctn: {
    backgroundColor: COLORS_APP.background,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    flexDirection: "row",
    borderTopWidth: 2,
    borderColor: COLORS_APP.outline_forth,
  },

  ctn_btn_add: {
    position: "absolute",
    bottom: 25,
    right: 20,
  },

  btn_add: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    backgroundColor: COLORS_APP.cta,
    borderWidth: 0,
    zIndex: 2,
  },
});
