// Librairies
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text } from "react-native";

// Custom components
import TimeBar from "../components/TimeBar";

// Main app properties
import { ColorsApp, FontFamily } from "../utils/app_properties";
import ContainerPage from "../components/ContainerPage";
import {
  useTimer,
  playSound,
  getTxtCountSeries,
  setOrient,
  getID,
} from "../scripts";
import ButtonCross from "../components/ButtonCross";
import { useKeepAwake } from "expo-keep-awake";
import { TouchableOpacity } from "react-native";
import { onPressClose } from "../scripts/buttonAction";
import ButtonRound from "../components/ButtonRound";
import ButtonToggle from "../components/ButtonToggle";

const TimerScreen = ({ navigation, route }) => {
  setOrient(false);
  useKeepAwake();

  // Get the workout in the redux store.
  const workouts_store = useSelector((state) => state.workouts);
  const id = getID(workouts_store, route.params.workout_UID);
  const workout_state = workouts_store[id];

  // Initial value
  var initial_id = -1;
  var initial_round = 0;
  var initial_timer = 3;
  var interval_increase_time = 5;
  var interval_increase_rep = 1;

  // Workout state variables.
  const workout_len = workout_state.series.length;
  const [currentIDSeries, setCurrentIDSeries] = useState(initial_id);
  const [currentRound, setCurrentRound] = useState(initial_round);

  // Main variable
  const path_sound = require("../../assets/sound/alarm.mp3");
  const [showBtnNext, setShowBtnNext] = useState(false);
  const [sound, setSound] = useState();
  const [isTimer, setIsTimer] = useState(true);
  const [nextIsRest, setNextIsRest] = useState(false);
  const [txtSeries, setTxtSeries] = useState("Be ready");
  const [txtNextSeries, setTxtNextSeries] = useState(
    workout_state.series[0].seriesName
  );
  const [txtStats, setTxtStats] = useState(
    getTxtCountSeries(0, workout_len, 0, workout_state.round)
  );

  // Timer variables.
  const [maxTime, setMaxTime] = useState(initial_timer);
  const [currentTime, setCurrentTime] = useState(initial_timer);
  const [startTimer, stopTimer, is_running] = useTimer(() =>
    setCurrentTime((t) => t - 1)
  );

  // Reset function.
  const onPressReset = () => {
    setCurrentIDSeries(initial_id);
    setCurrentRound(initial_round);
    setCurrentTime(initial_timer);
    setMaxTime(initial_timer);
    setNextIsRest(false);
    setIsTimer(true);
    setTxtSeries("Be ready");
    setTxtNextSeries(workout_state.series[0].seriesName);
    setTxtStats(getTxtCountSeries(0, workout_len, 0, workout_state.round));
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
      if (currentTime <= 0) {
        playSound(setSound, path_sound);

        setCurrentIDSeries(0);
        setNextIsRest(workout_state.series[0].rest);
        setTxtSeries(workout_state.series[0].seriesName);
        setIsTimer(workout_state.series[0].is_timer);

        if (workout_len > 1) {
          setCurrentTime(workout_state.series[0].lap);
          setMaxTime(workout_state.series[0].lap);
          setTxtNextSeries(workout_state.series[1].seriesName);
        } else setTxtNextSeries("Finished");
      }
    } else if (currentTime <= 0) {
      setTxtStats(
        getTxtCountSeries(
          currentIDSeries,
          workout_len,
          currentRound,
          workout_state.round
        )
      );
      playSound(setSound, path_sound);

      // Manage the final rest.
      if (nextIsRest && currentIDSeries == workout_len) {
        setCurrentIDSeries(0);
        setCurrentTime(workout_state.final_rest);
        setMaxTime(workout_state.final_rest);
        setNextIsRest(false);
        setTxtSeries("Next round");
      }

      // Manage a rest.
      else if (nextIsRest) {
        setCurrentIDSeries((v) => v + 1);
        setCurrentTime(workout_state.rest_time);
        setMaxTime(workout_state.rest_time);
        setNextIsRest(false);
        setTxtSeries("Rest");
      }

      // Manage the last series of the last round.
      else if (
        currentIDSeries == workout_len &&
        currentRound == workout_state.round
      ) {
        stopTimer();
        setTxtSeries("Finished");
        setTxtNextSeries("___");
      }

      // Manage a series.
      else {
        var time = workout_state.series[currentIDSeries].lap;
        setCurrentTime(time);
        setMaxTime(time);
        setTxtSeries(workout_state.series[currentIDSeries].seriesName);
        setIsTimer(workout_state.series[currentIDSeries].is_timer);

        // Manage the last series of a round.
        if (currentIDSeries + 1 === workout_len) {
          setCurrentRound((v) => v + 1);
          setCurrentIDSeries((v) => v + 1);

          if (currentRound + 1 == workout_state.round) {
            setNextIsRest(false);
            setTxtNextSeries("Finished");
          } else {
            setNextIsRest(true);
            setTxtNextSeries(workout_state.series[0].seriesName);
          }
        } else {
          setNextIsRest(workout_state.series[currentIDSeries + 1].rest);
          setTxtNextSeries(
            workout_state.series[currentIDSeries + 1].seriesName
          );
          // Increment series id if the next series is not a rest.
          if (!workout_state.series[currentIDSeries].rest)
            setCurrentIDSeries(currentIDSeries + 1);
        }
      }
    }
  }

  const onPressAdd = () => {
    var interval = isTimer ? interval_increase_time : interval_increase_rep;
    setMaxTime(Number(maxTime) + interval);
    setCurrentTime(Number(currentTime) + interval);
  };

  const onPressMinus = () => {
    var interval = isTimer ? interval_increase_time : interval_increase_rep;
    setMaxTime(Math.max(0, Number(maxTime) - interval));
    setCurrentTime(Math.max(0, Number(currentTime) - interval));
  };

  const goToSeries = (
    id_current_series,
    id_next_series,
    current_round,
    is_rest,
    is_end
  ) => {
    setCurrentIDSeries(id_current_series);
    setCurrentRound(current_round);
    setCurrentTime(!is_end ? workout_state.series[id_current_series].lap : 0);
    setMaxTime(!is_end ? workout_state.series[id_current_series].lap : 0);
    setNextIsRest(
      is_rest === null ? workout_state.series[id_current_series].rest : is_rest
    );
    setIsTimer(workout_state.series[id_current_series].is_timer);
    setTxtSeries(workout_state.series[id_current_series].seriesName);
    setTxtNextSeries(
      id_next_series != workout_len
        ? workout_state.series[id_next_series].seriesName
        : "Finished"
    );
    setTxtStats(
      getTxtCountSeries(
        id_current_series,
        workout_len,
        current_round,
        workout_state.round
      )
    );
  };

  const onPressNext = () => {
    if (
      currentIDSeries + 1 == workout_len &&
      currentRound + 1 == workout_state.round
    )
      onPressReset();
    else {
      var id_current_round = currentRound;
      var id_current_series = currentIDSeries + 1;
      var id_next_series = id_current_series + 1;

      if (id_current_series >= workout_len) {
        id_current_round += 1;
        id_current_series = 0;
        id_next_series = 1;

        if (workout_len == 1) {
          id_next_series = 0;
        }
      }

      if (
        id_current_series + 1 == workout_len &&
        currentRound + 1 != workout_state.round
      )
        id_next_series = 0;

      var next_is_rest = workout_state.series[id_current_series].rest;
      var is_end = false;
      if (
        id_current_series + 1 == workout_len &&
        id_current_round + 1 == workout_state.round
      ) {
        next_is_rest = false;
        is_end = true;
      }

      if (currentIDSeries == workout_len && currentRound == workout_state.round)
        onPressReset();
      else
        goToSeries(
          id_current_series,
          id_next_series,
          id_current_round,
          next_is_rest,
          is_end
        );
    }
  };

  const onPressPrevious = () => {
    if (currentIDSeries >= 0 && currentRound >= 0) {
      var id_current_round = currentRound;
      var id_current_series = currentIDSeries - 1;
      var id_next_series = id_current_series + 1;

      if (id_current_series < 0) {
        id_current_round -= 1;
        id_current_series = workout_len - 1;
        id_next_series = 0;
      }

      var next_is_rest = workout_state.series[id_current_series].rest;
      if (
        id_current_series + 1 == workout_len &&
        id_current_round == workout_state.round
      ) {
        next_is_rest = true;
      }

      if (id_next_series == 0 && id_current_round < 0) onPressReset();
      else
        goToSeries(
          id_current_series,
          id_next_series,
          id_current_round,
          next_is_rest
        );
    }
  };

  return (
    <ContainerPage hide_status={true} is_portrait={false}>
      <View style={styles.ctn_main}>
        <ButtonCross
          action={() => onPressClose(navigation)}
          style={styles.btn_close}
        />

        <View style={styles.ctn_stats}>
          <Text style={styles.txt_stats}>{txtStats}</Text>
        </View>

        <View style={styles.ctn_body}>
          <View style={styles.ctn_series_main}>
            <View style={[styles.ctn_series_sub, styles.ctn_series_next]}>
              <Text style={styles.txt_series_prefix}>Next</Text>
              <Text
                style={[styles.txt_series, styles.txt_series_next]}
                numberOfLines={3}
                adjustsFontSizeToFit={true}
              >
                {txtNextSeries}
              </Text>
            </View>

            <View style={[styles.ctn_series_sub, styles.ctn_series_current]}>
              <Text style={styles.txt_series_prefix}>Now</Text>
              <View style={styles.ctn_txt_series_current}>
                <Text
                  style={[styles.txt_series, styles.txt_series_current]}
                  numberOfLines={2}
                  adjustsFontSizeToFit={true}
                >
                  {txtSeries}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.ctn_center}>
            {showBtnNext ? (
              <ButtonRound action={onPressMinus} text={"-"} bd_color={ColorsApp.timer_outline} />
            ) : (
              <ButtonRound action={onPressPrevious} text={"<<"} bd_color={ColorsApp.timer_outline} />
            )}

            <Text style={styles.txt_timer} adjustsFontSizeToFit={true}>
              {currentTime}
              {isTimer ? "s" : " rep"}
            </Text>

            {showBtnNext ? (
              <ButtonRound action={onPressAdd} text={"+"} bd_color={ColorsApp.timer_outline} />
            ) : (
              <ButtonRound action={onPressNext} text={">>"} bd_color={ColorsApp.timer_outline} />
            )}
          </View>

          <TimeBar
            colorBar={ColorsApp.border}
            colorFill={ColorsApp.timer_outline}
            currentValue={currentTime}
            maxValue={maxTime}
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

            <ButtonToggle
              style={[styles.btn_action, styles.btn_main]}
              state={is_running}
              text={"Play"}
              txt_active={"Stop"}
              onChange={is_running ? stopTimer : startTimer}
              style_active={styles.btn_tgl_actv}
              style_txt_active={styles.btn_tgl_txt_actv}
              font_size={17}
            />

            <TouchableOpacity
              style={[styles.btn_action, styles.btn_sec, styles.btn_next]}
              onPress={() => setShowBtnNext((v) => !v)}
            >
              <Text style={styles.btn_txt_action}>Change button</Text>
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

  is_rest:{
    backgroundColor: ColorsApp.timer_rest,
  },

  btn_close: {
    position: "absolute",
    top: -25,
    right: 0,
  },

  ctn_stats: {
    position: "absolute",
    right: 70,
    top: 5,
  },

  txt_stats: {
    textAlign: "left",
    fontSize: 18,
    color: ColorsApp.light_font,
  },

  ctn_body: {
    position: "absolute",
    top: 60,
    right: 20,
    left: 20,
    bottom: 0,
  },

  ctn_series_main: {
    flexDirection: "row",
    height: 100,
    marginBottom: 0,
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

  ctn_txt_series_current: {
    width: 250,
    height: "100%",
  },

  ctn_series_next: {
    width: 150,
    height: 65,
  },

  txt_series_prefix: {
    position: "absolute",
    top: -15,
  },

  txt_series: {
    fontSize: 50,
    fontWeight: "bold",
  },

  txt_series_next: {
    fontSize: 30,
  },

  txt_series_current: {
    textAlign: "center",
  },

  ctn_center: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
  },

  txt_timer: {
    fontSize: 70,
    alignSelf: "center",
  },

  ctn_footer: {
    position: "absolute",
    bottom: 20,
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

  btn_tgl_actv:{
    backgroundColor: ColorsApp.timer_outline
  },

  btn_tgl_txt_actv:{
    color: "#fff"
  },

  btn_disabled: {
    opacity: 0.5,
  },

  btn_main: {
    flex: 0,
    width: 140,
    height: 50,
    zIndex: 2,
    borderColor: ColorsApp.timer_outline,
    borderWidth: 3,
  },

  btn_sec: {
    width: 140,
    height: 35,
    borderColor: ColorsApp.timer_outline,
    borderWidth: 2,
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
