// Librairies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Custom components
import ContainerBody from './containers/ContainerBody';
import ContainerSeriesView from './containers/ContainerSeriesView';
import ActionButton from './ActionButton';
import Subtitle from './Subtitle';

// Main app properties
import { ColorsApp } from '../utils/app_properties';
import { FlatList } from 'react-native-gesture-handler';

const BodyView = ({handleMode}) => {
  const workouts = useSelector(state => state);

  const renderItem = ({item}) => {
    <ContainerSeriesView title={item.title} />
  }
  
  return (
    <ContainerBody>
      <View style={styles.container}>
        <Subtitle text={'My timers :'}/>

        <View style={styles.containerBody}>
        {
          (workouts.length !== 0) ?
          (
            <View>
              <FlatList
              data={workouts}
              renderItem={({item}) => <ContainerSeriesView item={item} />}
              numColumns={2}
              keyExtractor={(item) => item.id}
              />
            </View>
          )
          : 
          (
            <View style={styles.containerEmpty}>
              <Text style={styles.emptyText}>
                Tap to '+ New' button to create your first wokout.
              </Text>
            </View>
          )
        }
        </View>

      </View>
      <ActionButton text='+ New' action={() => handleMode(true)}/>
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

