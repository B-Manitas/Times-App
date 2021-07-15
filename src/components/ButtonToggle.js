// Import Librairies
import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

const ButtonToggle = ({
  text,
  txt_active,
  onPress,
  style,
  style_txt_active,
  state,
  txt_colors = COLORS_APP.font_main,
  font_size = 15,
  shadow = true,
  disabled = false,
}) => {
  const [isActive, setIsActive] = useState(state);


  useEffect(() => {
    setIsActive(state);
  }, [state]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={isPressed}
      style={[
        styles.btn_boxes,
        style,
        shadow && styles.shadow,
        isActive && styles.active,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.txt,
          { fontSize: font_size },
          { color: txt_colors },
          isActive && style_txt_active,
        ]}
      >
        {isActive && txt_active ? txt_active : text}
      </Text>
    </TouchableOpacity>
  );

  function isPressed() {
    setIsActive((isActive) => !isActive);
    onPress();
  }
};

export default ButtonToggle;

const styles = StyleSheet.create({
  btn_boxes: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 2,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 2,
    marginHorizontal: 2,

    borderWidth: 2,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: "#fff",
  },

  active: {
    borderColor: COLORS_APP.cta,
    backgroundColor: COLORS_APP.cta,
  },

  shadow: {
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
    color: COLORS_APP.font_main,
    width: "100%",
    fontWeight: "bold",
  },

  txt_active: {
    color: "#fff",
  },

  disabled: {
    opacity: 0.3,
  },
});
