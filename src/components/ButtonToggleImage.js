// Import Librairies
import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";

const ButtonToggleImage = (
  action,
  path,
  style,
  style_active,
  size = 64,
  default_state = false,
) => {

  const [state, setState] = useState(default_state)
  const onPress = () => {
    setState((v) => !v);
    // action();
  };

  return (
    <TouchableOpacity onPress={action} style={style}>
      <Image source={path} style={{width:size, height:size, opacity:1}} />
    </TouchableOpacity>
  );
};

export default ButtonToggleImage;
