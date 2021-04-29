// Librairies
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

// Main app properties
import { ColorsApp } from '../utils/app_properties';

const ActionButton = ({ text, action, isDisabled=false }) => {
  return (
    <TouchableOpacity onPress={() => action()} 
    style={[styles.container, {opacity:isDisabled? .5: 1}]} disabled={isDisabled}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;

// Style Component
const styles = StyleSheet.create({
  container: {
    width: 30,
    marginHorizontal: 4,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 2,
    backgroundColor: ColorsApp.border,
    borderColor: ColorsApp.bg,
    borderRadius: 5,
    borderWidth: 1,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    opacity: .3,
  },

  text: {
    // color: ColorsApp.border,
    color: ColorsApp.dark_font_2,

    textAlign: 'center',
    fontWeight: 'bold'
  }
});
