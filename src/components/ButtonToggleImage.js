import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS_APP } from "../utils/ConstantColors";

const ButtonToggleImage = ({ source, size, onPress, state = false }) => {
  const [isActive, setIsActive] = useState(state);

  useEffect(() => {
    setIsActive(state);
  }, [state]);

  return (
    <TouchableOpacity
      style={[styles.btn, isActive && styles.is_active]}
      onPress={isPressed}
    >
      <Image source={source} style={{ width: size, height: size }} />
    </TouchableOpacity>
  );

  function isPressed() {
    setIsActive((isActive) => !isActive);
    onPress();
  }
};

export default ButtonToggleImage;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 2,
    marginHorizontal: 2,

    borderWidth: 2,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: "#fff",
  },

  is_active: {
    borderColor: COLORS_APP.cta,
  },
});
