import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS_APP } from '../utils/ConstantColors';

const ButtonText = ({text, onPress}) => {
  return (
    <Text onPress={onPress} style={styles.txt}>{text}</Text>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  txt:{
    color: COLORS_APP.font_third,
    fontWeight: "bold",
    textDecorationLine: 'underline'
  }
})