// Librairies
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

// Main app properties
import { ColorsApp } from '../utils/app_properties'

const ActionButton = ({text, action}) => {
  return (
    <Pressable onPress={() => action()} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default ActionButton;

// Style Component
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 1,
    backgroundColor: ColorsApp.body,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ColorsApp.border,
    minWidth: 100,
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
    color: ColorsApp.border,
    textAlign: 'center',
    fontWeight:'bold',
  },
});

