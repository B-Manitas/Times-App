// Librairies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';

const WidgetBox = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
  </View>
  );
};

export default WidgetBox;

// Style Component
const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorsApp.bg,
    borderRadius: 5,
    padding: 5,
    margin: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  text: {
    color: ColorsApp.light_font,
    textAlign: 'center',
  },
});

