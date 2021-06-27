import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ButtonImage = ({action, path, size, style}) => {
  return (
    <TouchableOpacity onPress={action} style={style}>
      <Image source={path} style={{width:size, height:size}} />
    </TouchableOpacity>
  );
};

export default ButtonImage;