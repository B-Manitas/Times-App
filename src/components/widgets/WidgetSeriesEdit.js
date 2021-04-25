// Librairies
import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from 'react-redux';
import { removeSeriesCreator } from '../../redux/actionCreators';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';

const WidgetSeriesEdit = (props) => {
  // const workouts = useSelector(state => state);
  const [seriesState, setSeriesState] = useState(props.dataSeries);
  const dispatch = useDispatch();

  const updateSeries = (newState) => {
    setSeriesState({ ...seriesState, ...newState });

    props.updateWorkout((prevState) => ({
      ...prevState,
      series: prevState.series.map((series) => {
        if (seriesState.id === series.id) {
          return { ...seriesState, ...newState };
        } else return series;
      })
    }));
  };

  const onPressRemoveSeries = () => {
    props.updateWorkout((prevState) => ({
      ...prevState,
      series: prevState.series.filter((series) => seriesState.id !== series.id)
    }));

    dispatch(removeSeriesCreator(props.workoutId, props.dataSeries.id));
  };

  // console.log(seriesState.type)
  const rightSwipe = () => {
    return (
      <TouchableOpacity onPress={onPressRemoveSeries} style={styles.panelRight}>
        <Text style={styles.panelRightTxt}>Remove</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containerSwipe}>
      <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInputRound}
            placeholder="Your series name"
            autoCorrect={false}
            autoCapitalize="sentences"
            maxLength={30}
            returnKeyType="done"
            defaultValue={seriesState.seriesName}
            onChangeText={(val) => updateSeries({ seriesName: val })}
          />

          <View style={styles.containerType}>
            <TextInput
              placeholder="0"
              keyboardType="number-pad"
              style={styles.textInputSeriesType}
              maxLength={6}
              defaultValue={seriesState.lap}
              onChangeText={(val) => updateSeries({ lap: val })}
            />
            <Pressable
              style={styles.btnSeriesType}
              onPress={() =>
                updateSeries({
                  type:
                    seriesState.type == 'repetions' ? 'seconds' : 'repetions'
                })
              }
            >
              <Text style={styles.txtSeriesType}>{props.dataSeries.type}</Text>
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
    marginVertical: 1
  },

  container: {
    backgroundColor: ColorsApp.body,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },

  textInputRound: {
    flex: 1,
    color: ColorsApp.light_font,
    marginHorizontal: 4,
    paddingRight: 5
  },

  textInputSeriesType: {
    color: ColorsApp.light_font,
    marginLeft: 10,
    fontSize: 15
  },

  btnSeriesType: {
    backgroundColor: ColorsApp.bg,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: ColorsApp.dark_font_3,
    borderWidth: 1
  },

  txtSeriesType: {
    color: ColorsApp.light_font,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 12
  },

  panelRight: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 5,
    backgroundColor: ColorsApp.remove,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  panelRightTxt: {
    color: ColorsApp.dark_font_3
  }
});
