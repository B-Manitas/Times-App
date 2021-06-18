import React, { useEffect, useState } from "react";
import { Alert, Vibration } from "react-native";
import { Audio } from "expo-av";

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
export function getID(workouts, UID) {
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
    var v = obj[value];
    if (v.length !== 0 && Array.isArray(v))
      for (const i in v) if (isEmptyField(v[i])) return true;

    if (v.length === 0) return true;
  }

  return false;
}

/**
 * Manage the transition from a series to another.
 * @param {Array} workout_state the workout state.
 * @param {Number} current_series the id of the current series.
 * @param {Number} workout_len the total number of series.
 * @param {Number} time the duration of the series.
 * 
 * @param {Function} setCurrentSeries the hooks function called to update ID of the current series.
 * @param {Function} setNextSeries the hooks function called to update the state of the next series.
 * @param {Function} setTime the hooks function called to update duration of the series.
 * @param {Function} stopTimer the function to stop the timer.
 * 
 * @param {Boolean} is_running set true if the timer is running.
 * @param {Function} setTxtCountSeries the hooks function called to update the text of the number of remaining series.
 * @param {Function} playSound the function called to play the sound when a series is finished.
 */
export function manageSeriesTransition(
  workout_state,
  current_series,
  workout_len,
  time,
  
  setCurrentSeries,
  setNextSeries,
  setTime,
  stopTimer,
  
  is_running,
  setTxtCountSeries,
  playSound
) {
  if (time <= 0 && is_running && current_series < workout_len) {
    // There are at least 2 series
    if (current_series < workout_len - 1) {
      var id_next_series = current_series + 1;
      setTime(workout_state.series[id_next_series].lap);
      setCurrentSeries(id_next_series);
      setNextSeries(workout_state.series[id_next_series + 1]);
    }

    // It's the last series.
    else 
      stopTimer();

    setTxtCountSeries(getTxtCountSeries(workout_len - current_series - 1));
    playSound();
  }
}

/**
 * Play a sound.
 * @param {Function} setSound the hook function called to set the sound.
 * @param {String} file the path of the sound file.
 */
export async function playSound(setSound, file) {
  const { sound } = await Audio.Sound.createAsync(file);
  setSound(sound);
  await sound.playAsync();
}

/**
 * Format seconds to format [HH, MM, SS].
 * @param {Number} secs the seconds to format
 * @returns an array of strings containing in the following order
 * the hours, minutes and seconds in the correct format.
 */
export function arrFormatHHMMSS(secs) {
  return [
    String(Math.floor(secs / 3600)).padStart(2, "0"),
    String(Math.floor(secs / 60) % 60).padStart(2, "0"),
    String(secs % 60).padStart(2, "0"),
  ];
}

/**
 * A timer.
 * @param {Function} setTime the hook function called to set the current time.
 * @returns An array containings start, stop timer functions and a boolean set to true if the timer is running.
 */
export function useTimer(setTime) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!busy) return;

    setBusy(true);
    const timer = setTimeout(setTime, 1000);

    return () => {
      setBusy(false);
      clearTimeout(timer);
    };
  });

  return [() => setBusy(true), () => setBusy(false), busy];
}

/**
 * Handle the plural of a word.
 * @param {Number} count The number to check if it is a plural word or not.
 * @param {String} word The word.
 * @param {String} word_plural The plural of the word. By default, add an "s" at the end.
 * @returns The word with the correct spelling.
 */
export function handlePluralTxt(count, word, word_plural = "") {
  if (count <= 1) return word;
  else return word_plural === "" ? word + "s" : word_plural;
}

export function getTxtCountSeries(nb_series) {
  return ` ${nb_series} remaining ${handlePluralTxt(nb_series, "exercice")}.`;
}
