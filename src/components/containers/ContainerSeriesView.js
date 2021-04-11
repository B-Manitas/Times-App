// Librairies
import React from 'react';
import { Pressable, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Redux store
import { useDispatch } from 'react-redux';
import { REMOVE_WORKOUT } from '../../redux/actionTypes';


// Custom components
import WidgetBox from '../widgets/WidgetBox';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';

const ContainerSeriesView = ({item, handlerMode}) => {
  const dispatch = useDispatch();
  const removeWorkout = id => dispatch({type: REMOVE_WORKOUT, id});

  /** @returns {String} Text with all workout days. */
  const txtDayActive = () => {
    const days = item.days;
    const weekday = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.']
    
    // Create a string with all workout days.
    let txtDay = '';
    for (let i = 0; i < days.length; i++) {
      if (days[i]===true) {
        
        txtDay += weekday[i] + ' ';
      }
    }

    // Remove first and last space.
    txtDay = txtDay.trim();
    
    // Customize the text of the day.
    switch (txtDay) {
      case weekday.join(' '):
        return 'Everyday';

      case weekday.slice(0, 5).join(' '):
        return 'Week';

      case weekday.slice(-2).join(' '):
        return 'Weekend';

      case '':
        return 'No define'
      
      default:
        return txtDay;
    }
  }

  const rightSwipe = () => {
    return (
      <View style={styles.containerPanelRight}>
        <TouchableOpacity onPress={() => removeWorkout(item.id)} style={styles.panelRight}>
          <Text style={styles.panelRightTxt}>Remove</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handlerMode(item.id)} 
        style={[styles.panelRight, {borderLeftWidth: 1}]}>
          <Text style={styles.panelRightTxt}>Edit</Text>
        </TouchableOpacity>
      </View>
    ); 
  };


  
  return (
    <View style={styles.container}>
      <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.subContainer}>
          <Pressable onPress={() => alert('Open Timer')}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <View style={styles.containerTime}>
              <WidgetBox text={'00'}/>
              <Text style={styles.txtTimeSeparator}>:</Text>
              <WidgetBox text={'00'}/>
            </View>
            
            <WidgetBox text={txtDayActive()}/>
          </Pressable>
          </View>
      </Swipeable>
    </View>
  );
};

export default ContainerSeriesView;

// Style Component
const styles = StyleSheet.create({
  containerPanelRight: {
    width: '80%',
    flexDirection: 'row',
  },
  
  container: {
    backgroundColor: ColorsApp.dark_font_3,
    borderColor: ColorsApp.border,
    borderRadius: 5,
    marginVertical: 4,
    marginHorizontal: 2,
    flex: 1/2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  subContainer: {
    padding: 10,
    backgroundColor: ColorsApp.body,
    borderColor: ColorsApp.border,
    borderWidth: 2,
  },
  
  containerTitle: {
    borderBottomWidth: 2,
    borderColor: ColorsApp.bg,
    marginBottom: 7,
  },

  title: {
    color: ColorsApp.light_font,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
  },

  containerTime: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'baseline'
  },

  containerUnit: {
    backgroundColor: ColorsApp.bg,
    borderRadius: 5,
    padding: 5,
  },

  txtTime: {
    color: ColorsApp.light_font,
    textAlign: 'center',
  },

  txtTimeSeparator: {
    textAlignVertical: 'center',
    paddingHorizontal: 1,
  },

  panelRight:{
    height: '100%',
    width: '100%',
    backgroundColor: ColorsApp.dark_font_3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1/2,
    borderColor: ColorsApp.bg,
  },

  panelRightTxt: {
    color: ColorsApp.dark_font_2,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
