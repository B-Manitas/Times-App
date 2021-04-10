// Librairies
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Custom components
import WidgetBox from '../widgets/WidgetBox';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';

const ContainerSeriesView = ({item}) => {
  
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
      
      default:
        return txtDay;
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => alert('Edit Workout')}>
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
  );
};

export default ContainerSeriesView;

// Style Component
const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '45%',
    margin: 5,
    backgroundColor: ColorsApp.body,
    borderColor: ColorsApp.border,
    borderRadius: 5,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
});
