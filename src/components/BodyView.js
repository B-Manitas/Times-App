// Librairies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom components
import ActionButton from './ActionButton';
import ContainerSeriesView from '../components/containers/ContainerSeriesView';


// Main app properties
import { ColorsApp } from '../utils/app_properties';

const BodyView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My timers :</Text>

      <View style={styles.containerBody}>
      {
        true ?
        (
          <View style={styles.containerEmpty}>
            <Text style={styles.emptyText}>
              Tap to '+ New' button to create your first series.
            </Text>
          </View>
        )
        :null
      }
      </View>


        <ActionButton text='+ New' action={() => alert('+ new')}/>
    </View>
  );
};

export default BodyView;

// Style Component
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 140,
    height: '70%',
    marginHorizontal: 20,
  },

  title: {
    fontSize: 25,
    color: ColorsApp.light_font,
    textDecorationLine:'underline',
  },

  containerBody: {
    marginTop: 5,
    flex: 1,
  },
  containerEmpty: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    right: 0,
    left: 0,
    bottom: '25%',
  },
  
  emptyText: {
    fontSize: 20,
    textAlign:'center',
    margin: 20,
    fontWeight: 'bold',
    color: ColorsApp.light_font,
  },
});

