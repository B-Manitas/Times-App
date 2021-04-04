// Librairies
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

// Custom components
import Subtitle from './Subtitle';
import WidgetFlexContainer from './widgets/WidgetFlexContainer';
import WidgetBtnBox from './widgets/WidgetBtnBox';
import WidgetSeriesEdit from './widgets/WidgetSeriesEdit';
import ActionButton from './ActionButton';
import ContainerBody from './containers/ContainerBody';

// Main app properties
import { ColorsApp, EnTranslate } from '../utils/app_properties';


const BodyEdit = () => {
  return (
    <ContainerBody>
      <View style={styles.container}>
        <Subtitle text={'Edit your timers :'}/>
        
        <View style={styles.containerBody}>
          <ScrollView>
            <TextInput 
            autoCorrect={false} autoCapitalize='sentences' maxLength={20}
            returnKeyType='done' style={styles.textInputName} multiline={true}
            placeholder={EnTranslate.plh_workoutName} placeholderTextColor={ColorsApp.dark_font_2}
            enablesReturnKeyAutomatically={true}
            />

            <Text style={styles.subtitle}>Your trainig days</Text>
            <WidgetFlexContainer>
              <WidgetBtnBox text={'Mo.'} styleContainer={styles.containerDayBox}/>
              <WidgetBtnBox text={'Tu.'} styleContainer={styles.containerDayBox}/>
              <WidgetBtnBox text={'We.'} styleContainer={styles.containerDayBox}/>
              <WidgetBtnBox text={'Th.'} styleContainer={styles.containerDayBox}/>
              <WidgetBtnBox text={'Fr.'} styleContainer={styles.containerDayBox}/>
              <WidgetBtnBox text={'Sa.'} styleContainer={styles.containerDayBox}/>
              <WidgetBtnBox text={'Su.'} styleContainer={styles.containerDayBox}/>
            </WidgetFlexContainer>

            <View style={styles.containerFlex}>
              <Text style={styles.subtitle}>Enter the number of round</Text>
              <TextInput placeholder={'0'} keyboardType='number-pad' style={styles.textInputRound}
              maxLength={12}/>
            </View>

            <Text style={styles.subtitle}>Yours series :</Text>
            {
            true ?
            (
              <View style={styles.containerEmpty}>
                <Text style={styles.emptyText}>
                  Tap to '+' button to create your first workout.
                </Text>
              </View>
            )
            :
            <View style={styles.containerEmpty}>
              <WidgetSeriesEdit />
              <WidgetSeriesEdit />
              <WidgetSeriesEdit />
              <WidgetSeriesEdit />
              <WidgetSeriesEdit />
              <WidgetSeriesEdit />
            </View>
            }

          <TouchableOpacity style={styles.btnCreateSeries} onPress={() => alert('New series')}>
            <Text style={styles.txtCreateSeries}>+</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>

      </View>

        <ActionButton text='Create' action={() => alert('Your program is created.')}/>
    </ContainerBody>
  );
};

export default BodyEdit;

// Style Component
const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 20,
  },

  containerBody: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 35,
    backgroundColor: ColorsApp.body,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: ColorsApp.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  textInputName: {
    fontSize: 22,
    textAlign: 'center',
    color: ColorsApp.light_font,
    margin:10,
    marginVertical:5,
  },

  subtitle: {
    color: ColorsApp.light_font,
    marginHorizontal: 5,
    marginVertical: 10,
    fontSize: 15,
    textDecorationLine: 'underline'
  },

  containerFlex: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }, 

  textInputRound: {
    backgroundColor: ColorsApp.bg,
    color: ColorsApp.light_font,
    borderRadius: 5,
    padding: 5,
    margin: 3,
  },

  emptyText: {
    color: ColorsApp.border,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign:'center',
    margin: 20,
  },

  btnCreateSeries: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
    right: 0,
    left: 0,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: ColorsApp.bg,
    color: ColorsApp.light_font,
    backgroundColor: ColorsApp.body,
  },

  txtCreateSeries: {
    color: ColorsApp.light_font,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
