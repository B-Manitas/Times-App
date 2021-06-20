import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import ButtonSquare from './ButtonSquare';
import { ColorsApp } from '../utils/app_properties';
import { useState } from 'react';

const SeriesField = ({default_state_rest, default_state_timer}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [txtBtnOptions, setTxtBtnOptions] = useState("+");

  const onPressOptions = () => {
    if (showOptions) {
      setShowOptions(false)
      setTxtBtnOptions("+")
    }

    else {
      setShowOptions(true)
      setTxtBtnOptions("-")      
    }
  }

  return (
    <View style={styles.ctn_main}>
      <View style={styles.ctn_flex_boxes}>
        <TextInput style={[styles.input_series, styles.input_series_name]} placeholder={"Your workout name..."}/>
        <TextInput style={[styles.input_series, styles.input_series_time]} placeholder={"10s"}/>
      </View>
      {
        showOptions &&
        <View style={styles.ctn_flex_boxes}>
          <ButtonSquare text={"Add a rest"} state={default_state_rest} />
          <ButtonSquare text={"Is a timer"} state={default_state_timer}/>
        </View>
      }

      <TouchableOpacity style={styles.btn_options} onPress={onPressOptions}>
        <Text style={styles.txt_options}>{txtBtnOptions}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeriesField;

const styles = StyleSheet.create({
  ctn_flex_boxes: {
    flexDirection: "row",
  },
  
  ctn_main:{
    borderColor: ColorsApp.border,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
  },

  input_series:{
    marginHorizontal: 3,
    borderBottomWidth: 2,
    padding: 3,
    borderColor: ColorsApp.border,
    color: ColorsApp.light_font
  },

  input_series_name:{
    flex: 4,
  },

  input_series_time:{
    flex: 1,
  },

  btn_options:{
    position: "absolute",
    right: -10,
    bottom: -10,
    width: 25,
    height: 25,
    
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    
    backgroundColor: ColorsApp.light_font,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: ColorsApp.light_font,
  },

  txt_options:{
    color: "#fff",
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
  },
})