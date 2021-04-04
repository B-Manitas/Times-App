// Librairies
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Custom components
import WidgetBox from '../widgets/WidgetBox';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';

const ContainerSeriesView = ({title='The Workout Title', time=['00', '00']}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => alert('Edit Workout')}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.containerTime}>
          <WidgetBox text={time[0]}/>
          <Text style={styles.txtTimeSeparator}>:</Text>
          <WidgetBox text={time[1]}/>
        </View>
        <WidgetBox text={'Every Day'}/>
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
    shadowColor: "#000",
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
