import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorsApp, FontFamily } from '../utils/app_properties';

const Logo = () => {
  return (
    <View style={styles.ctn_main}>
      <View style={styles.ctn_in}>
        <Text style={styles.txt_icon}>T's A</Text>
      </View>
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
    borderColor: "#fff",
    backgroundColor: "#f5f5f5",
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 50
  },

  ctn_in:{
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius:5
  },
  
  txt_icon:{
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorsApp.main,
    fontFamily: FontFamily.logo,
  }
})