// Librairies
import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';

const WidgetSeriesEdit = () => {
  const [typeSeries, setTypeSeries] = useState('seconds');

  const rightSwipe = () => {
    return (
      <View style={styles.panelRight}>
        <Text style={styles.panelRightTxt}>Remove</Text>
      </View>
    );
  };

  return (
    <View style={styles.containerSwipe}>
      <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.container}>
          <TextInput style={styles.textInputRound} placeholder='Your series name'
          autoCorrect={false} autoCapitalize='sentences' maxLength={30}
          returnKeyType='done'/>
          
          <View style={styles.containerType}>
            <TextInput placeholder={'0'} keyboardType='number-pad' style={styles.textInputSeriesType}
            maxLength={6}/>
            <Pressable style={styles.btnSeriesType} 
            onPress={() => setTypeSeries(typeSeries=='repetions' ? 'seconds' : 'repetions')}>
              <Text style={styles.txtSeriesType}>{typeSeries}</Text>
            </Pressable>
            </View>
        </View>
      </Swipeable>
    </View>
  );
};

export default WidgetSeriesEdit;

// Style Component
const styles = StyleSheet.create({
  containerSwipe: {
    backgroundColor: ColorsApp.remove,
    borderColor: ColorsApp.border,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 1,
  },

  container: {
    backgroundColor: ColorsApp.body,
    flexDirection: 'row',
    justifyContent :'center',
    alignItems: 'center',
    padding: 2,
  },
  
  textInputRound: {
    flex: 1,
    color: ColorsApp.light_font,
    marginHorizontal: 4,
    paddingRight: 5,
  },

  textInputSeriesType: {
    color: ColorsApp.light_font,
    marginLeft: 10,
    fontSize: 15,
  },

  btnSeriesType: {
    backgroundColor: ColorsApp.bg,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: ColorsApp.dark_font_3,
    borderWidth: 1,
  },

  txtSeriesType: {
    color: ColorsApp.light_font,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 12,
  },

  panelRight:{
    height: '100%',
    width: '30%',
    backgroundColor: ColorsApp.remove,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  panelRightTxt: {
    color: ColorsApp.dark_font_3,
  },
});