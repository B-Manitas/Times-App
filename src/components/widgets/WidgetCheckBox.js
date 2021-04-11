// Librairies
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';

const WidgetCheckBox = ({text, isCheckAction, state=false}) => {
  const [isCheck, setIsCheck] = useState(state);
  
  const isCheckPress = () => {
    const prevIsCheck = !isCheck;
    setIsCheck(prevIsCheck);
    isCheckAction(prevIsCheck);
  };

  return (
    <Pressable onPress={() => isCheckPress()}
    style={[styles.container, isCheck ? styles.isWorkoutDayContainer:null]}>
        <Text style={[styles.text, isCheck ? styles.isWorkoutDayText:null]}>{text}</Text>
    </Pressable>
  );
};

export default WidgetCheckBox;

// Style Component
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: ColorsApp.dark_font_3,
    borderRadius: 5,
    padding: 5,
    margin: 2,
    flex: 1,
  },

  isWorkoutDayContainer: {
    backgroundColor: ColorsApp.outline,
  },
  
  text: {
    color: ColorsApp.light_font,
    textAlign: 'center',
  },

  isWorkoutDayText: {
    color: ColorsApp.dark_font,
  },

});