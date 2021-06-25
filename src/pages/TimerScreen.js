// Librairies
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text } from "react-native";

// Custom components
import BarTime from "../components/BarTime";

// Main app properties
import { ColorsApp, FontFamily } from "../utils/app_properties";
import ContainerPage from "../components/ContainerPage";
import { useTimer, playSound, getTxtCountSeries, setOrient } from "../scripts";
import ButtonCross from "../components/ButtonCross";
import { useKeepAwake } from "expo-keep-awake";
import { TouchableOpacity } from "react-native";

const TimerScreen = ({ navigation, route }) => {
  setOrient(false);
  useKeepAwake();

  // Get the workout in the redux store.
  const workouts = useSelector((state) => state.workouts);
  const id = workouts.findIndex(
    (workout) => workout.uid === route.params.workout_UID
  );
  const workout_state = workouts[id];

  // Initial value
  var initial_id = -1;
  var initial_timer = 3;
  var initial_round = 0;

  // Workout state variables.
  const workout_len = workout_state.series.length;
  const [currentIDSeries, setCurrentIDSeries] = useState(initial_id);
  const [currentRound, setCurrentRound] = useState(initial_round);

  // Main variable
  const path_sound = require("../../assets/sound/alarm.mp3");
  const [sound, setSound] = useState();
  const [nextIsRest, setNextIsRest] = useState(false);
  const [txtSeries, setTxtSeries] = useState("Be ready");
  const [txtNextSeries, setTxtNextSeries] = useState(
    workout_state.series[0].seriesName
  );
  const [txtStats, setTxtStats] = useState(
    getTxtCountSeries(0, workout_len, 0, workout_state.round)
  );

  // Timer variables.
  const [timer, setTimer] = useState(initial_timer);
  const [currentTimer, setCurrentTimer] = useState(initial_timer);
  const [startTimer, stopTimer, is_running] = useTimer(() =>
    setCurrentTimer((t) => t - 1)
  );

  // Reset function.
  const onPressReset = () => {
    setCurrentIDSeries(initial_id);
    setCurrentRound(initial_round);
    setCurrentTimer(initial_timer);
    setTimer(initial_timer);
    setTxtSeries("Be ready");
    setTxtStats(getTxtCountSeries(0, workout_len, 0, workout_state.round));
    setTxtNextSeries(workout_state.series[0].seriesName);
    setNextIsRest(false);
  };

  // Reset the sound.
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  });

  // Manage transition
  // If the timer is running.
  if (is_running) {
    // The workout must include at least one exercise and one round.
    if (workout_state.round <= 0 || workout_len <= 0) {
      stopTimer();
      setTxtSeries("Finished");
      setTxtNextSeries("");
    }

    // Add 3s before starting the workout.
    else if (currentIDSeries === initial_id && currentRound === initial_round) {
      if (currentTimer <= 0) {
        playSound(setSound, path_sound);
        setCurrentIDSeries(0);
        setTxtSeries(workout_state.series[0].seriesName);
        setNextIsRest(workout_state.series[0].rest);

        if (workout_len > 1) {
          setCurrentTimer(workout_state.series[0].lap);
          setTimer(workout_state.series[0].lap);
          setTxtNextSeries(workout_state.series[1].seriesName);
        } else setTxtNextSeries("Finished");
      }
    } else if (currentTimer <= 0) {
      playSound(setSound, path_sound);

      // Manage the final rest.
      if (nextIsRest && currentIDSeries == workout_len) {
        setCurrentTimer(workout_state.final_rest);
        setTimer(workout_state.final_rest);
        setTxtSeries("Next round");
        setNextIsRest(false);
        setCurrentIDSeries(0);
      }

      // Manage a rest.
      else if (nextIsRest) {
        setCurrentTimer(workout_state.rest_time);
        setTimer(workout_state.rest_time);
        setTxtSeries("Rest");
        setNextIsRest(false);
        setCurrentIDSeries((v) => v + 1);
      }

      // Manage the last series of the last round.
      else if (
        currentIDSeries == workout_len &&
        currentRound == workout_state.round
      ) {
        stopTimer();
        setTxtSeries("Finished");
        setTxtNextSeries("");
      }

      // Manage the last series of a round.
      else if (currentIDSeries + 1 === workout_len) {
        setTxtSeries(workout_state.series[currentIDSeries].seriesName);
        setTimer(workout_state.series[currentIDSeries].lap);
        setCurrentTimer(workout_state.series[currentIDSeries].lap);

        setCurrentIDSeries((v) => v + 1);
        setCurrentRound((v) => v + 1);

        if (currentRound + 1 == workout_state.round) {
          setNextIsRest(false);
          setTxtNextSeries("Finished");
        } else {
          setNextIsRest(true);
          setTxtNextSeries(workout_state.series[0].seriesName);
        }
      }

      // Manage a series.
      else {
        var time = workout_state.series[currentIDSeries].lap;
        setTimer(time);
        setCurrentTimer(time);
        setTxtSeries(workout_state.series[currentIDSeries].seriesName);
        setTxtNextSeries(workout_state.series[currentIDSeries + 1].seriesName);
        setNextIsRest(workout_state.series[currentIDSeries + 1].rest);

        if (!workout_state.series[currentIDSeries].rest)
          setCurrentIDSeries(currentIDSeries + 1);
      }
    }
  }

  const onPressClose = () => {
    navigation.goBack();
    setOrient();
  };

  return (
    <ContainerPage hide_status={true} is_portrait={false}>
      <View style={styles.ctn_main}>
        <ButtonCross action={onPressClose} style={styles.btn_close} />

        <View style={styles.ctn_stats}>
          <Text style={styles.txt_stats}>{txtStats}</Text>
        </View>

        <View style={styles.ctn_body}>
          <View style={styles.ctn_series_main}>
            <View style={[styles.ctn_series_sub]}>
              <Text style={styles.txt_series_prefix}>Next</Text>
              <Text style={[styles.txt_series, styles.txt_series_next]}>
                {txtNextSeries}
              </Text>
            </View>

            <View style={[styles.ctn_series_sub, styles.ctn_series_current]}>
              <Text style={styles.txt_series_prefix}>Now</Text>
              <Text style={[styles.txt_series, styles.txt_series_current]}>
                {txtSeries}
              </Text>
            </View>
          </View>

          <View style={styles.ctn_center}>
            <TouchableOpacity style={styles.btn_action_round}>
              <Text style={styles.btn_txt_action_round}>-</Text>
            </TouchableOpacity>
            <Text style={styles.txt_timer}>{currentTimer}s</Text>
            <TouchableOpacity style={styles.btn_action_round}>
              <Text style={styles.btn_txt_action_round}>+</Text>
            </TouchableOpacity>
          </View>

          <BarTime
            colorBar={ColorsApp.border}
            colorFill={"#FCD99C"}
            currentValue={currentTimer}
            maxValue={timer}
          />

          <View style={styles.ctn_footer}>
            <TouchableOpacity
              style={[
                styles.btn_action,
                styles.btn_sec,
                styles.btn_reset,
                is_running && styles.btn_disabled,
              ]}
              onPress={onPressReset}
              disabled={is_running}
            >
              <Text style={styles.btn_txt_action}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn_action, styles.btn_main]}
              onPress={is_running ? stopTimer : startTimer}
            >
              <Text style={[styles.btn_txt_action, styles.btn_txt_action_main]}>
                {is_running ? "Stop" : "Play"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn_action, styles.btn_sec, styles.btn_next]}
            >
              <Text style={styles.btn_txt_action}>Next Exercice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ContainerPage>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  ctn_main: {
    flex: 1,

    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    paddingTop: 20,
  },

  btn_close: {
    top: -20,
  },

  ctn_stats: {
    position: "absolute",
    right: 20,
    top: 50,
  },

  txt_stats: {
    textAlign: "right",
    fontSize: 18,
    color: ColorsApp.light_font,
  },

  ctn_body: {
    marginTop: 20,
    flex: 1,
    margin: 20,
  },

  ctn_series_main: {
    flexDirection: "row",
  },

  ctn_series_sub: {
    width: 400,
  },

  ctn_series_current: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    left: 0,
    right: 0,
  },

  txt_series_prefix: {
    position: "absolute",
    top: -10,
  },

  txt_series: {
    fontSize: 50,
    fontWeight: "bold",
  },

  txt_series_next: {
    fontSize: 30,
  },

  ctn_center: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 90,
    paddingHorizontal: 30,
  },

  btn_action_round: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    marginVertical: 10,
    borderRadius: 200,
    backgroundColor: ColorsApp.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderColor: "#FCD99C",
    borderWidth: 1,
  },

  btn_txt_action_round: {
    color: ColorsApp.light_font,
    fontFamily: FontFamily.main,
    fontSize: 30,
  },

  txt_timer: {
    fontSize: 70,
    alignSelf: "center",
  },

  ctn_footer: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  btn_action: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: ColorsApp.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  btn_disabled: {
    opacity: 0.5,
  },

  btn_main: {
    width: 110,
    height: 50,
    zIndex: 2,
    borderColor: "#FCD99C",
    borderWidth: 2,
  },

  btn_sec: {
    width: 140,
    height: 35,
    borderColor: "#FCD99C",
    borderWidth: 1,
  },

  btn_reset: {
    right: -5,
  },

  btn_next: {
    left: -5,
  },

  btn_txt_action: {
    textTransform: "uppercase",
  },

  btn_txt_action_main: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
