import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorsApp, FontFamily } from '../utils/app_properties';

const Logo = () => {
  return (
    <View style={styles.ctn_main}>
        <Text style={styles.txt_icon}>T's A</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  ctn_main:{
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    // borderColor: ColorsApp.light_font,
    // borderWidth: 3,
    backgroundColor: ColorsApp.border,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 50
  },
  
  txt_icon:{
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorsApp.light_font,
    fontFamily: FontFamily.light_font,
  }
})