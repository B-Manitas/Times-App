import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { ColorsApp } from '../utils/app_properties';
import { ViewMode } from '../utils/app_type';
import ActionButton from './ActionButton';
import ContainerBody from './containers/ContainerBody';
import ContainerTimerWorkout from './ContainerTimerWorkout';
import Subtitle from './Subtitle';
import WidgetBox from './widgets/WidgetBox';

const useTimer = (f, delay = 1000) => {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!busy) return;

    setBusy(true);
    const timer = setTimeout(f, delay);

    return () => {
      setBusy(false);
      clearTimeout(timer);
    };
  });

  return [() => setBusy(true), () => setBusy(false), busy];
};

const BodyTimer = (props) => {
  const workouts = useSelector((state) => state);
  const idLength = workouts.findIndex(
    (workout) => workout.id === props.workoutId
  );

  const [workoutState, setWorkoutState] = useState(workouts[idLength]);
  const [countdownTimer, setCountdownTimer] = useState(
    workoutState.series[0].lap
  );
  const [round, setRound] = useState(workoutState.round);

  const [onPressStart, onPressStop, isRunning] = useTimer(
    () => setCountdownTimer((t) => t - 1),
    1000
  );

  const onPressReset = () => {
    setWorkoutState(workouts[idLength]);
    setCountdownTimer(workoutState.series[0].lap);
    setRound(workoutState.round);
  };

  if (countdownTimer < 0 && workoutState.series.length > 0) {
    setRound(round - 1);

    if (workoutState.series.length >= 2) {
      setWorkoutState({
        ...workoutState,
        series: workoutState.series.slice(1)
      });
      setCountdownTimer(workoutState.series[1].lap);
    } else {
      onPressReset();
      onPressStop();
      alert('Yout workout is finished.');
    }
  }

  return (
    <ContainerBody>
      <Subtitle text={workoutState.title} />
      <View style={styles.container}>
        <FlatList
          data={workoutState.series}
          renderItem={({ item, index }) => (
            <ContainerTimerWorkout
              text={item.seriesName}
              pos={index}
              n={workoutState.series.length}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.containerTimer}>
        <WidgetBox text={countdownTimer + 's'} />
        <WidgetBox text={'Round: ' + round} />
      </View>

      <View style={styles.containerButton}>
        {isRunning ? (
          <ActionButton text={'Stop'} action={onPressStop} />
        ) : (
          <ActionButton text={'Start'} action={onPressStart} />
        )}
        <ActionButton text={'Reset'} action={onPressReset} />
        <ActionButton
          text={'Home'}
          action={() => props.switcherMode(ViewMode)}
        />
      </View>
    </ContainerBody>
  );
};

export default BodyTimer;

const styles = StyleSheet.create({
  containerButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center'
  },

  containerTimer: {
    position: 'absolute',
    bottom: 60,
    // width: 100,
    alignSelf: 'center',
    flexDirection: 'row'
  }
});
