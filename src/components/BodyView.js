// Librairies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

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
  // const data = workouts.length===0 ? [] : workouts
  // console.log(data)

  return (
    <ContainerBody>
      <View style={styles.container}>
        <Subtitle text='My timers :'/>

        <View style={styles.containerBody}>
          <FlatList
          data={workouts}
          renderItem={({item}) => <ContainerSeriesView item={item} handlerMode={handleMode} />}
          numColumns={2}
          keyExtractor={(item) => item.id}
          ListEmptyComponent=
          {
            true?
            <View style={styles.containerEmpty}>
              <Text style={styles.emptyText}>
                Tap to '+ New' button to create your first wokout.
              </Text>
            </View>
            : <Text>QSSQSQS</Text>
          }
          />
        </View>

      </View>
      <ActionButton text='+ New' action={handleMode}/>
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
    height: '75%',
  },
  
  containerEmpty: {
    justifyContent: 'center',
    marginTop: '30%',
    // position: 'absolute',
    // top: 0,
    // bottom: '25%',
    // right: 0,
    // left: 0,
    // backgroundColor: 'red',
  },
  
  emptyText: {
    fontSize: 20,
    textAlign:'center',
    margin: 20,
    fontWeight: 'bold',
    color: ColorsApp.dark_font_3,
  },
});

