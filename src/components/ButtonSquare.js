import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ColorsApp } from '../utils/app_properties';

const ButtonSquare = ({ text, state, onChange }) => {
  const [isActive, setIsActive] = useState(state);

  const isPressed = () => {
    setIsActive(isActive => !isActive);
    onChange();
  };

  return (
      <Pressable onPress={isPressed} style={[styles.btn_boxes, isActive && styles.is_active]}>
        <Text style={styles.txt}>{text}</Text>
      </Pressable>
  );
};

export default ButtonSquare;

const styles = StyleSheet.create({
  btn_boxes:{
    flex: 1,
    borderWidth: 2,
    borderColor: ColorsApp.border,
    borderRadius: 5,
    paddingHorizontal: 2,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 2,
    marginHorizontal: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    backgroundColor: "#fff",
    justifyContent:'center'
  },

  txt:{
    textAlign: 'center',
    color: ColorsApp.light_font,
    width: "100%",
    fontWeight: 'bold',
  },

  is_active:{
    backgroundColor: ColorsApp.border,
  }
});
