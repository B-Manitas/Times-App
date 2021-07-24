// Import Librairies
import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

const ButtonImage = ({
  onPress,
  path,
  style,
  is_cheched,
  size = 24,
  opacity = 1,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, is_cheched && styles.active]}
    >
      <Image
        source={path}
        style={{ width: size, height: size, opacity: opacity }}
      />
    </TouchableOpacity>
  );
};

export default ButtonImage;

const styles = StyleSheet.create({
  active: {
    borderColor: COLORS_APP.cta,
  },
});
