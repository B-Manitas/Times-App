import React, { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { ColorsApp } from "../utils/app_properties";

const ButtonToggle = ({
  text,
  txt_active,
  state,
  onChange,
  style,
  style_active,
  style_txt_active,
  font_size=15,
  shadow=true
}) => {
  const [isActive, setIsActive] = useState(state);

  const isPressed = () => {
    setIsActive((isActive) => !isActive);
    onChange();
  };

  return (
    <Pressable
      onPress={isPressed}
      style={[
        styles.btn_boxes,
        style,
        shadow && styles.shadow,
        isActive && style_active,
      ]}
    >
      <Text style={[styles.txt, {fontSize:font_size}, isActive && style_txt_active]}>
        {isActive && txt_active ? txt_active : text}
      </Text>
    </Pressable>
  );
};

export default ButtonToggle;

const styles = StyleSheet.create({
  btn_boxes: {
    flex: 1,
    borderWidth: 2,
    borderColor: ColorsApp.border,
    borderRadius: 5,
    paddingHorizontal: 2,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 2,
    marginHorizontal: 2,

    backgroundColor: "#fff",
    justifyContent: "center",
  },
  
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  txt: {
    textAlign: "center",
    color: ColorsApp.light_font,
    width: "100%",
    fontWeight: "bold",
  },
});
