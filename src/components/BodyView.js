// Librairies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom components
import ContainerBody from './containers/ContainerBody';
import ActionButton from './ActionButton';
import Subtitle from './Subtitle';

// Main app properties
import { ColorsApp } from '../utils/app_properties';

const BodyView = () => {
  return (
    <ContainerBody>
      <View style={styles.container}>
        <Subtitle text={'My timers :'}/>

        <View style={styles.containerBody}>
        {
          true ?
          (
            <View style={styles.containerEmpty}>
              <Text style={styles.emptyText}>
                Tap to '+ New' button to create your first wokout.
              </Text>
            </View>
          )
          :null
        }
        </View>

      </View>
      <ActionButton text='+ New' action={() => alert('+ new')}/>
    </ContainerBody>
  );
};

export default BodyView;

// Style Component
const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 20,
    marginTop: 30,
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
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: '25%',
    right: 0,
    left: 0,
  },
  
  emptyText: {
    fontSize: 20,
    textAlign:'center',
    margin: 20,
    fontWeight: 'bold',
    color: ColorsApp.dark_font_3,
  },
});

