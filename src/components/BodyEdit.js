// Librairies
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

// Store
import { useSelector, useDispatch } from 'react-redux';
import {
  editWorkoutCreator,
  newSeriesCreator,
  removeWorkoutCreator
} from '../redux/actionCreators';
import { seriesState } from '../redux/state';

// Custom components
import Subtitle from './Subtitle';
import WidgetSeriesEdit from './widgets/WidgetSeriesEdit';
import ActionButton from './ActionButton';
import ContainerBody from './containers/ContainerBody';

// Main app properties
import { ColorsApp, EnTranslate } from '../utils/app_properties';
import { FlatList } from 'react-native-gesture-handler';
import { ViewMode } from '../utils/app_type';

const BodyEdit = (props) => {
  const workouts = useSelector((state) => state);
  const dispatch = useDispatch();

  const idLength = workouts.findIndex(
    (workout) => workout.id === props.workoutId
  );

  const [workoutState, setWorkoutState] = useState(workouts[idLength]);
  const [isEmpty, setIsEmpty] = useState(true);

  const isEmptyField = (obj) => {
    for (var value in obj) {
      v = obj[value];
      if (v.length !== 0 && Array.isArray(v))
        for (var i in v) if (isEmptyField(v[i])) return setIsEmpty(true);

      if (v.length === 0) return setIsEmpty(true);
    }

    return setIsEmpty(false);
  };

  const onPressEditWorkout = () => {
    dispatch(editWorkoutCreator(props.workoutId, workoutState));
    props.switcherMode(ViewMode, workoutState.id);
  };

  const onPressAddSeries = () => {
    const idSeries = Math.random().toString(16).substr(2, 9) + '_';
    dispatch(newSeriesCreator(workoutState.id, idSeries));
    setWorkoutState({
      ...workoutState,
      series: [...workoutState.series, seriesState(idSeries)]
    });
  };

  const onPressCancel = () => {
    dispatch(removeWorkoutCreator(props.workoutId));
    props.switcherMode(ViewMode, workoutState.id);
  };

  const emptyMessage = () => {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.emptyText}>
          Tap to '+' button to create your first workout.
        </Text>
      </View>
    );
  };

  
  useEffect(() => {
    isEmptyField(workoutState)
  }, [workoutState])


  const footerFlatlist = () => {
    return (
      <TouchableOpacity
        style={styles.btnCreateSeries}
        onPress={onPressAddSeries}
      >
        <Text style={styles.txtCreateSeries}>+</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ContainerBody>
      <View style={styles.container}>
        <Subtitle text="Create new timers :" />
        <View style={styles.containerBody}>
          <FlatList
            ListHeaderComponent={
              <View>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  maxLength={35}
                  placeholder={EnTranslate.plh_workoutName}
                  placeholderTextColor={ColorsApp.dark_font_2}
                  style={styles.textInputName}
                  defaultValue={workoutState.title}
                  onChangeText={(val) =>
                    setWorkoutState((prevState) => ({
                      ...prevState,
                      title: val
                    }))
                  }
                />

                <View style={styles.containerFlex}>
                  <Text style={styles.subtitle}>
                    Enter the number of round :
                  </Text>
                  <TextInput
                    placeholder="0"
                    keyboardType="number-pad"
                    style={styles.textInputRound}
                    maxLength={10}
                    defaultValue={workoutState.round}
                    onChangeText={(val) =>
                      setWorkoutState((prevState) => ({
                        ...prevState,
                        round: val
                      }))
                    }
                  />
                </View>

                <Text style={styles.subtitle}>Yours series :</Text>
              </View>
            }
            data={workoutState.series}
            renderItem={({ item }) => (
              <WidgetSeriesEdit
                dataSeries={item}
                workoutId={workoutState.id}
                updateWorkout={setWorkoutState}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={emptyMessage}
            ListFooterComponent={footerFlatlist}
          />
        </View>
      </View>
      <View style={styles.containerButton}>
        <ActionButton text="Cancel" action={() => onPressCancel()} />
        <ActionButton text="Create" action={() => onPressEditWorkout()} isDisabled={isEmpty}/>
      </View>
    </ContainerBody>
  );
};

export default BodyEdit;

// Style Component
const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 20
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },

  textInputName: {
    fontSize: 22,
    textAlign: 'center',
    color: ColorsApp.light_font,
    margin: 10,
    marginVertical: 5
  },

  subtitle: {
    color: ColorsApp.light_font,
    marginHorizontal: 5,
    marginVertical: 10,
    fontSize: 15
  },

  containerFlex: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  textInputRound: {
    backgroundColor: ColorsApp.bg,
    color: ColorsApp.light_font,
    borderRadius: 5,
    padding: 5,
    margin: 3
  },

  emptyText: {
    color: ColorsApp.border,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    margin: 20
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
    backgroundColor: ColorsApp.body
  },

  txtCreateSeries: {
    color: ColorsApp.light_font,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center'
  },

  containerButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center'
  }
});
