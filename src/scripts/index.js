import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

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
  return workouts.findIndex((workout) => workout.uid === UID);
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

/**
 * Get the text of the remaining number series.
 * @param {nb_series} nb_series the remainings series.
 * @returns the remaining text.
 */
export function getTxtCountSeries(nb_series, nb_round) {
  return ` ${nb_series} remaining ${handlePluralTxt(
    nb_series,
    "exercice"
  )}.\n ${nb_round} remaining ${handlePluralTxt(nb_round, "round")}.`;
}

/**
 * Change the orientation of screen.
 * @param {Boolean} is_portrait The orientation of the screen.
 */
export async function setOrient(is_portrait=true) {
  await lockAsync(is_portrait?OrientationLock.PORTRAIT_UP:OrientationLock.LANDSCAPE)
}
