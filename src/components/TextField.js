import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { ColorsApp, FontFamily } from '../utils/app_properties';


const TextField = ({ txt_label, txt_placeholder, max_len, value, onChange, is_center=false, is_numeric=false }) => { 
  return (
    <View style={styles.ctn_main}>
      <View style={[styles.ctn_lbl, is_center && {left: 15, right: 15}]}>
        <Text style={styles.lbl_input}>{txt_label}</Text>
      </View>

      <TextInput
        onEndEditing={(e) => onChange(e.nativeEvent.text)}
        defaultValue={value}
        placeholder={txt_placeholder}
        autoCapitalize={"sentences"}
        autoCompleteType={"username"}
        autoCorrect={false}
        keyboardType={is_numeric?'number-pad':"default"}
        maxLength={max_len}
        style={[styles.input, is_center && {textAlign: 'center'}]}
        returnKeyType={is_numeric?"done":"next"}
        placeholderTextColor={ColorsApp.font_secs}
      />
    </View>
  )
};

export default TextField;

const styles = StyleSheet.create({
  ctn_main:{
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
    marginVertical: 5,
  },

  ctn_lbl:{
    position:'absolute',
    borderRadius: 50,
    backgroundColor: ColorsApp.background_third,
    paddingHorizontal: 7,
    paddingTop: 5,
    zIndex: 1,
    justifyContent: 'center',
    left: 20
  },
  
  lbl_input:{
    color: ColorsApp.font_main,
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center'
  },

  input:{
    margin: 10,
    marginHorizontal: 5,
    paddingHorizontal: 13,
    paddingTop: 13,
    paddingBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: ColorsApp.background_,
    color: ColorsApp.font_main,
    fontSize: 16,
    fontFamily: FontFamily.input,
    backgroundColor: ColorsApp.background_third
  }

});
