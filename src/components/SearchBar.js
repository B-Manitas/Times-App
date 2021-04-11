// Libraries
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Pressable } from 'react-native';

// Main app properties
import { ColorsApp, EnTranslate } from "../utils/app_properties";

const SearchBar = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput 
      placeholder={EnTranslate.plh_searchbar} 
      placeholderTextColor={ColorsApp.bg} 
      style={styles.textInput}
      autoCorrect={false}
      returnKeyType='search'
      onChangeText={(val) => { setText(val)}}
      value = {text}/>
      
      <Pressable style={styles.btnClear} onPress={() => { setText('') }}>
        <Text>✖</Text>
      </Pressable>
    </View>
  );
};

export default SearchBar;

// Style Component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -30,
    left: '10%',
    width: '80%',
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  
  textInput: {
    flex: 1,
    backgroundColor: ColorsApp.body,
    borderColor: ColorsApp.bg,
    borderWidth: 2,
    borderRadius: 5,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: ColorsApp.light_font,
  },
  
  btnClear: {
    backgroundColor: ColorsApp.body,
    borderColor: ColorsApp.bg, 
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 2,
    borderLeftWidth: 0,
    justifyContent: 'center',
    paddingRight: 7,
  },
});
