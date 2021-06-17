import React from 'react';
import { StyleSheet, View } from "react-native";


const BarTime = ({colorBar, colorFill, currentValue, maxValue}) => {
  return (
        <View style={styles.barTime}>
          <View style={[styles.barBackTime, {backgroundColor: colorBar}]}/>
          <View style={[styles.barCurrentTime, {backgroundColor: colorFill, width:100*(maxValue-currentValue)/maxValue+"%"}]}/>
        </View>
    );
};

export default BarTime;

const styles = StyleSheet.create({
  barBackTime:{
    width: "100%",
    height: 5,
  },
  
  barCurrentTime:{
    position:"absolute",
    height: 5,
  }
})

