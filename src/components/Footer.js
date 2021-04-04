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
    backgroundColor: ColorsApp.border,
    borderColor: ColorsApp.bg,
    borderRadius: 4,
    borderWidth: 1,
    margin: 20,
    marginBottom: 15,
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
    color: ColorsApp.dark_font_2,
    fontWeight: 'bold',
  }
});
