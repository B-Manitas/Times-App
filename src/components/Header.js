// Libraries
import React from 'react';
import { View, StyleSheet, Text, Image, Pressable, Platform } from 'react-native';

// Custom components
import SearchBar from './SearchBar';

// Main app properties
import { ColorsApp } from '../utils/app_properties'

const Header = ({showSearchBar}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Time's App</Text>
        <Pressable style={styles.btnSettings} onPress={() => alert('settings')}/>
      </View>
      
      {showSearchBar && <SearchBar />}
    </View>
  );
};

export default Header;

// Style Component
const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  container: {
    flexDirection: 'row',
    backgroundColor: ColorsApp.header,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 20,
  },

  title: {
    fontSize: 30,
    color: ColorsApp.dark_font,
    fontFamily: Platform.OS=='ios'? 'Avenir':'sans-serif',
    textAlignVertical: 'center',
    padding: 0,
  },

  btnSettings: {
    position: 'absolute',
    right: 0,
    margin: 20, 
    borderRadius: 100,
    backgroundColor: ColorsApp.body,
    height: 35,
    width: 35,
    borderWidth: 2,
    borderColor: ColorsApp.bg,
  },
});
