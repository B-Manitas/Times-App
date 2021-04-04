// Librairies
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';

const WidgetBtnBox = ({text}) => {
  const [isWorkoutDay, setIsWorkoutDay] = useState(false);

  return (
    <Pressable onPress={() => setIsWorkoutDay(!isWorkoutDay)}
    style={[styles.container, isWorkoutDay ? styles.isWorkoutDayContainer:null]}>
        <Text style={[styles.text, isWorkoutDay ? styles.isWorkoutDayText:null]}>{text}</Text>
    </Pressable>
  );
};

export default WidgetBtnBox;

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