import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ButtonImage = ({action, path, style, size=24, opacity=1}) => {
  return (
    <TouchableOpacity onPress={action} style={style}>
      <Image source={path} style={{width:size, height:size, opacity:opacity}} />
    </TouchableOpacity>
  );
};

export default ButtonImage;