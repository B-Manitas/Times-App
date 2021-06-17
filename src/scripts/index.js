import { Alert, Vibration } from 'react-native';
import { useSelector } from 'react-redux';

const workouts = useSelector((state) => state);

/**
 * Return a random UID.
 * @param {Number} baseInt the base used to convert number. By default is 36.
 */
export function randUID(baseInt = 36) {
  return Math.random().toString(baseInt).substr(2, 9);
}

/**
 * Return the ID of the workout.
 * @param {Number} UID the uid of the workout.
 */
export function getID(UID) {
  return workouts.findIndex((workout) => workout.id === UID);
}

/**
 * Calculate the sum of values of a key in an object.
 * @param {Object} listObj a list of object.
 * @param {String} key the key of the value.
 * @returns the sum of the values of the key.
 */
export function sumValueInObject(listObj, key) {
  const value = 0;
  for (const obj in listObj) {
    if (Object.hasOwnProperty.call(listObj, obj)) {
      value += parseInt(listObj[obj][key]);
    }
  }

  return value;
}

/**
 * Return true a key of the object is empty, else false.
 * @param {Object} obj the object to check if it is empty.
 */
export function isEmptyKey(obj) {
  for (const value in obj) {
    v = obj[value];
    if (v.length !== 0 && Array.isArray(v))
      for (const i in v) if (isEmptyField(v[i])) return true;

    if (v.length === 0) return true;
  }

  return false;
}

/**
 * Manage the transition from a series to another.
 * @param {Number} time the duration of the series.
 * @param {Function} setTime the hooks function called to update duration of the series.
 * @param {Number} queueSeries the remaining series.
 * @param {Function} setRound the hooks function to called to update the number of remaining round.
 * @param {Function} setWorkoutState the hooks function to called to update the state of workout.
 */
export function manageSeriesTransition(time, setTime, queueSeries, setRound, setWorkoutState, keyRound)
{
  if (time < 0 && queueSeries > 0) {
    setRound(round => round - 1);

    if (queueSeries >= 2) {
      setWorkoutState(prevState =>
        ({
        ...prevState,
        series: prevState.series.slice(1)
        })
      );
      
      setTime(workoutState.series[1].lap);
    } 
    
    else if(workout[keyRound] > 0){
      setWorkoutState(prevState =>
      ({
      ...prevState,
      round: prevState[keyRound] - 1
      }))

      // onPressReset();
    }
    else {
      setWorkoutState(prevState =>
      ({
      ...prevState,
      round: prevState[keyRound] - 1
      }))

      // onPressReset();
      // onPressStop();
      Alert.alert("Time's App", "Yout workout is finished.")
    }

    Vibration.vibrate();
    playSound();
  }
}

/**
 * Play a sound.
 * @param {Function} setSound the hook function called to set the sound.
 * @param {String} file the path of the sound file.
 */
export async function playSound(setSound, file)
{
  const { sound } = await Audio.Sound.createAsync(
    require(file)
  );

  setSound(sound);
  await sound.playAsync();
}

/**
 * Format seconds to format [HH, MM, SS].
 * @param {Number} secs the seconds to format
 * @returns an array of strings containing in the following order
 * the hours, minutes and seconds in the correct format.
 */
export function arrFormatHHMMSS(secs)
{
  return [
    String(Math.floor(secs / 3600)).padStart(2, '0'),
    String(Math.floor(secs / 60) % 60).padStart(2, '0'),
    String(secs % 60).padStart(2, '0')
  ];
}
