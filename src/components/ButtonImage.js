// Import Librairies
import React from "react";
import { Image, TouchableOpacity } from "react-native";

const ButtonImage = ({
  onPress,
  path,
  style,
  is_cheched,
  style_active,
  size = 24,
  opacity = 1,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, is_cheched && style_active]}
    >
      <Image
        source={path}
        style={{ width: size, height: size, opacity: opacity }}
      />
    </TouchableOpacity>
  );
};

export default ButtonImage;
