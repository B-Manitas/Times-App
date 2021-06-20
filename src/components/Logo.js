import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ColorsApp } from '../utils/app_properties';

const Logo = () => {
  return (
    <Text style={styles.txt_icon}>T's A</Text>
  );
};

export default Logo;

const styles = StyleSheet.create({
  txt_icon:{
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorsApp.light_font,
    borderWidth: 2,
    borderColor: ColorsApp.border,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,

    shadowColor: ColorsApp.body,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
})