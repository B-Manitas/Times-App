import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

import { Slider } from "react-native-elements";
import { Audio } from "expo-av";

import { useSelector } from "react-redux";

import ActionButton from "./ActionButton";

import { ColorsApp } from "../utils/app_properties";
import { ViewMode } from "../utils/app_type";
import BarTime from "./BarTime";

var s_width = Dimensions.get("window").width;
var s_height = Dimensions.get("window").height;

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

const BodyTimer_2 = (props) => {
  // Get the workout.
  const workouts = useSelector((state) => state);

  // Get the id
  const id = workouts.findIndex((workout) => workout.id === props.workoutId);

  // Set state
  const [workoutState, setWorkoutState] = useState(workouts[id]);
  const [isFinished, setIsFinished] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(0);
  const [currentTimer, setCurrentTimer] = useState(workoutState.series[0].lap);
  const [sound, setSound] = useState();

  const [onPressStart, onPressStop, isRunning] = useTimer(
    () => setCurrentTimer((t) => t - 1),
    1000
  );

  const onPressReset = () => {
    setCurrentSeries(0);
    setWorkoutState(workouts[id]);
    setCurrentTimer(workoutState.series[0].lap);
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound/alarm.mp3")
    );

    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  });

  if (
    currentTimer <= 0 &&
    currentSeries < workoutState.series.length &&
    isRunning
  ) {
    if (currentSeries < workoutState.series.length - 1) {
      setCurrentTimer(workoutState.series[currentSeries + 1].lap);
      setCurrentSeries((prev) => prev + 1);
    } else {
      setIsFinished(true);
      onPressStop();
    }

    playSound();
  }

  return (
    <View style={styles.containerBody}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => props.switcherMode(ViewMode)}
      >
        <Image
          style={styles.iconClose}
          source={require("../../assets/icon/icon-close.png")}
        />
      </TouchableOpacity>

      <View style={styles.containerWorkout}>
        <View style={styles.containerNextExo}>
          <Text style={[styles.txtExo, styles.txtNextExo]}>
            {currentSeries < workoutState.series.length - 1
              ? workoutState.series[currentSeries + 1].seriesName + " (" + workoutState.series[currentSeries + 1].lap + "s)"
              : "Finished"}
          </Text>
        </View>

        <View style={styles.containerCurrentExo}>
          <Text style={[styles.txtExo, styles.txtCurrentExo]}>
            {workoutState.series[currentSeries].seriesName}
          </Text>
        </View>
      </View>

      <View style={styles.containerTimer}>
        <Text style={styles.txtTimer}>{currentTimer}s</Text>
        <BarTime
          colorBar={ColorsApp.border}
          colorFill={"#1a73e8"}
          currentValue={currentTimer}
          maxValue={workoutState.series[currentSeries].lap}
        />
      </View>

      <View style={styles.footerBtn}>
        {isRunning ? (
          <ActionButton text={"Stop"} action={onPressStop} />
        ) : (
          <ActionButton text={"Start"} action={onPressStart} />
        )}
        <ActionButton
          text="Reset"
          action={onPressReset}
          isDisabled={isRunning}
        />
        <ActionButton
          text="Next"
          action={() => Alert.alert("Time's App", "Next Exercices")}
          isDisabled={false}
        />

        <Text style={styles.txtCountExo}>
          {isFinished ? 0 : workoutState.series.length - currentSeries}{" remaining exercices"}
        </Text>
      </View>
    </View>
  );
};

export default BodyTimer_2;

const styles = StyleSheet.create({
  containerBody: {
    transform: [{ rotate: "-90deg" }],
    position: "absolute",
    top: s_width / 2 - 60,
    left: 20 - s_height / 4,
    backgroundColor: ColorsApp.bg,
    alignItems: "center",
    justifyContent: "center",
    width: s_height,
    height: s_width,
  },

  header: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 30,
  },

  iconClose: {
    width: 20,
    height: 20,
  },

  containerWorkout: {
    position: "absolute",
    top: 20,
    height: "35%",
    width: "75%",
    alignItems: "center",
  },

  containerNextExo: {
    width: "90%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

    borderBottomWidth: 0,
    borderWidth: 1,
    backgroundColor: "#fafafa",
    borderColor: ColorsApp.body,
    opacity: 0.9,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  containerCurrentExo: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: ColorsApp.border,
    borderColor: ColorsApp.body,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },

  txtExo: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: ColorsApp.light_font,
  },
  
  txtNextExo: {
    fontSize: 20,
    textTransform: "lowercase",
  },
  
  txtCurrentExo: {
    textTransform: "uppercase",
    fontSize: 40,
  },

  containerTimer: {
    width: "100%",
    marginTop: 100,
    paddingBottom: 15,
    width: "75%",
    
  },

  txtTimer: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 50,
  },

  footerBtn: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
  },
  txtCountExo: {
    marginLeft: 20,
    alignSelf: "center",
    textAlignVertical: "center",
  },

});
