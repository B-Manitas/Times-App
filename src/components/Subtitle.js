// Librairies
import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Main app properties
import { ColorsApp } from '../utils/app_properties';

const Subtitle = ({text}) => {
  return (
    <Text style={styles.text}>{text}</Text>
  );
};

export default Subtitle;

// Style Component
const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: ColorsApp.light_font,
    textDecorationLine:'underline',
  },
});
