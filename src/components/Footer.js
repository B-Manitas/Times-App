// Libraries
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Main app properties
import { ColorsApp } from '../utils/app_properties';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Music Controller</Text>
    </View>
  );
};

export default Footer;

// Style Component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorsApp.bg,
    borderColor: ColorsApp.body,
    borderRadius: 4,
    borderWidth: 1,
    margin: 20,
  },

  text: {
    color: ColorsApp.body,
  }
});
