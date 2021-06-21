// Librairies
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

// Custom components
import ActionButton from "./ActionButton";
import BarTime from "./BarTime";

// Main app properties
import { ColorsApp } from "../utils/app_properties";
import { ViewMode } from "../utils/app_type";
import {
  useTimer,
  manageSeriesTransition,
  playSound,
  getTxtCountSeries,
} from "../scripts";

const BodyTimer = (props) => {
  // Get the workout in the redux store.
  const workouts = useSelector((state) => state);
  const id = workouts.findIndex((workout) => workout.id === props.workoutId);
  const workout_state = workouts[id];

  // Initial value
  var initial_id = -1;
  var initial_timer = 3;
  var initial_round = 1;

  // Workout state variables.
  const workout_len = workout_state.series.length;
  const [currentIDSeries, setCurrentIDSeries] = useState(initial_id);
  const [currentRound, setCurrentRound] = useState(initial_round);

  // Main variable
  const path_sound = require("../../assets/sound/alarm.mp3");
  const path_icn_close = require("../../assets/icon/icon-close.png");
  const [sound, setSound] = useState();
  const [start, setStart] = useState(true);
  const [nextIsRest, setNextIsRest] = useState(false)
  const [txtSeries, setTxtSeries] = useState("Be ready");
  const [txtNextSeries, setTxtNextSeries] = useState(workout_state.series[0].seriesName);
  const [txtCountSeries, setTxtCountSeries] = useState(
    getTxtCountSeries(workout_len, currentRound)
  );

  // Timer variables.
  const [timer, setTimer] = useState(initial_timer);
  const [currentTimer, setCurrentTimer] = useState(initial_timer);
  const [startTimer, stopTimer, is_running] = useTimer(() =>
    setCurrentTimer((t) => t - 1)
  );

  // Reset function.
  const onPressReset = () => {
    setStart(true);
    setNextIsRest(false)
    setCurrentIDSeries(initial_id);
    setCurrentRound(initial_round);
    setCurrentTimer(initial_timer);
    setTimer(initial_timer);
    setTxtSeries("Be ready");
    setTxtCountSeries(getTxtCountSeries(workout_len, currentRound));
    setTxtNextSeries(workout_state.series[0].seriesName);
  };

  // Reset the sound.
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  });


  // Manage series transition.
  // When the first 3 seconds of pause have elapsed.
  if(start && currentIDSeries===initial_id && currentTimer <= 0 && currentRound===initial_round){
    setTxtSeries(workout_state.series[0].seriesName);
    setStart(false);
    playSound(setSound, path_sound);
  }
  
  // When a series have elapsed.
  else if (!start && is_running && currentTimer <= 0 && currentIDSeries < workout_len) {    
    // It was the last series and last round.
    if(currentIDSeries + 1 == workout_len && currentRound == workout_state.round)
    {        
      stopTimer();
      setTxtSeries("Finished");
      setTxtNextSeries("")
    }
    
    // It was the last series.
    else if(currentIDSeries + 1 == workout_len){
      setCurrentRound(v=>v+1);
      setTimer(workout_state.final_rest);
      setCurrentTimer(workout_state.final_rest);
      setTxtSeries("Rest before next round");
      setCurrentIDSeries(0);
      setTxtNextSeries(workout_state.series[0].seriesName);
    }

    // It's a rest.
    else if(nextIsRest){
      setTimer(workout_state.rest_time)
      setCurrentTimer(workout_state.rest_time)
      setTxtSeries("Rest");
      setNextIsRest(false);
    }
    
    // It's a series.
    else{
      const new_current_id = currentIDSeries + 1;
      setCurrentIDSeries(new_current_id);
      setTimer(workout_state.series[new_current_id].lap)
      setCurrentTimer(workout_state.series[new_current_id].lap)
      setTxtSeries(workout_state.series[new_current_id].seriesName);
      
      // There are at least 2 series.
      if(new_current_id <= workout_len - 2){
        setTxtNextSeries(workout_state.series[new_current_id + 1].seriesName)
        setNextIsRest(workout_state.series[new_current_id].rest)
      }
      
      // It's the last series.
      else
      {
        if(currentRound === workout_state.round)
        {
          setNextIsRest(false)
          setTxtNextSeries("Finished")
        }
        else{
          setNextIsRest(true)
          setTxtNextSeries("Rest")
        }
      }
    }
    
    // When a series ends.
    setTxtCountSeries(getTxtCountSeries(workout_len - currentIDSeries - 1, workout_state.round - currentRound));
    playSound(setSound, path_sound);
  }

  return (
    <View style={styles.ctn_body}>
      <TouchableOpacity
        style={styles.btn_close}
        onPress={() => props.switcherMode(ViewMode)}
      >
        <Image style={styles.icn_close} source={path_icn_close} />
      </TouchableOpacity>

      <View style={styles.ctn_header_series}>
        <View style={[styles.ctn_series, styles.ctn_next_series]}>
          <Text style={[styles.txt_series, styles.txt_next_series]}>
            {txtNextSeries}
          </Text>
        </View>

        <View style={[styles.ctn_series, styles.ctn_current_series]}>
          <Text style={[styles.txt_series, styles.txt_current_series]}>
            {txtSeries}
          </Text>
        </View>
      </View>

      <View style={styles.ctn_timer}>
        <Text style={styles.txt_timer}>{currentTimer}s</Text>
        <BarTime
          colorBar={ColorsApp.border}
          colorFill={"#1a73e8"}
          currentValue={currentTimer}
          maxValue={timer}
        />
      </View>

      <View style={styles.ctn_footer}>
        <View style={styles.footer_ctn_btn}>
          {is_running ? (
            <ActionButton text={"Stop"} action={stopTimer} />
          ) : (
            <ActionButton text={"Start"} action={startTimer} />
          )}

          <ActionButton
            text="Reset"
            action={onPressReset}
            isDisabled={is_running}
          />

          <ActionButton text="Next" isDisabled={true} />
        </View>

        <Text style={styles.txt_count_series}>{txtCountSeries}</Text>
      </View>
    </View>
  );
};

export default BodyTimer;

const styles = StyleSheet.create({
  ctn_body: {
    backgroundColor: ColorsApp.bg,

    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,

    alignItems: "center",
    justifyContent: "center",
  },

  btn_close: {
    position: "absolute",
    top: 0,
    right: 0,

    padding: 30,
  },

  icn_close: {
    width: 20,
    height: 20,
  },

  ctn_header_series: {
    position: "absolute",
    top: 20,

    height: "35%",
    width: "75%",

    alignItems: "center",
  },

  ctn_series: {
    borderColor: ColorsApp.body,
    borderWidth: 1,
    borderRadius: 5,
  },

  ctn_next_series: {
    flex: 2,
    width: "100%",
    backgroundColor: ColorsApp.border,

    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  ctn_current_series: {
    flex: 1,
    width: "90%",
    backgroundColor: "#fafafa",

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
    bottom: 20,
  },

  txt_series: {
    width: "100%",

    color: ColorsApp.light_font,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  txt_next_series: {
    textTransform: "lowercase",
    paddingBottom: 20,
    fontSize: 40,
  },

  txt_current_series: {
    textTransform: "uppercase",
    fontSize: 20,
  },

  ctn_timer: {
    width: "75%",
    marginTop: 100,
    paddingBottom: 15,
  },

  txt_timer: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 50,
  },

  ctn_footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    width: "75%",
  },

  footer_ctn_btn: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
  },

  txt_count_series: {
    position: "absolute",
    right: 0,
  },
});
