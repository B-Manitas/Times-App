import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { ColorsApp } from '../utils/app_properties';

const LabelContainer = ({text, size=15}) => {
  return (
    <View style={styles.ctn_main}>
      <Text style={[styles.text, {fontSize: size}]}>{text} :</Text>
    </View>
  );
};

export default LabelContainer;

const styles = StyleSheet.create({
  ctn_main: {
    marginVertical: 10,
    marginHorizontal: 0,
  },

  text: {
    color: ColorsApp.light_font,
    fontWeight: "bold",
    textDecorationLine: 'underline'
  },
})