import React from "react";
import { useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-elements";

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
