// Import Libraries.
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

// Import Customs Components.
import ButtonImage from "../components/ButtonImage";
import ButtonRound from "../components/ButtonRound";
import ButtonToggle from "../components/ButtonToggle";
import ContainerPage from "../components/ContainerPage";
import TimeBar from "../components/TimeBar";
import TextTraduction from "../components/TextTraduction";

// Import Functions.
import {
  useTimer,
  playSound,
  getTxtCountSeries,
  setOrient,
  getID,
  getTradText,
} from "../scripts";

// Import Constants.
import { ICON } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";
import { SOUND } from "../utils/ConstantSound";

const TimerPage = ({ navigation, route }) => {
  setOrient(false);
  useKeepAwake();

  // Get the workout in the redux store.
  const user_store = useSelector((state) => state.user);
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
  const [isTimer, setIsTimer] = useState(true);
  const [nextIsRest, setNextIsRest] = useState(false);
  const [txtSeries, setTxtSeries] = useState(
    getTradText(user_store.language, "be_ready")
  );
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

  // Manage transition
  // If the timer is running.
  if (is_running) {
    // The workout must include at least one exercise and one round.
    if (workout_state.round <= 0 || workout_len <= 0) {
      stopTimer();
      setTxtSeries(getTradText(user_store.language, "finished"));
      setTxtNextSeries("");
    }

    // Add 3s before starting the workout.
    else if (currentIDSeries === initial_id && currentRound === initial_round) {
      if (currentTime <= 0) {
        playSound(SOUND.end_time);

        setCurrentIDSeries(0);
        setTxtSeries(workout_state.series[0].seriesName);
        setIsTimer(workout_state.series[0].is_timer);

        if (workout_len > 1) setNextIsRest(false);
        else setTxtNextSeries(getTradText(user_store.language, "finished"));
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
      playSound(SOUND.end_time);

      // Manage the final rest.
      if (nextIsRest && currentIDSeries == workout_len) {
        setCurrentIDSeries(0);
        setCurrentTime(workout_state.final_rest);
        setMaxTime(workout_state.final_rest);
        setNextIsRest(false);
        setTxtSeries(getTradText(user_store.language, "next_round"));
      }

      // Manage a rest.
      else if (nextIsRest) {
        setCurrentIDSeries((v) => v + 1);
        setCurrentTime(workout_state.rest_time);
        setMaxTime(workout_state.rest_time);
        setNextIsRest(false);
        setTxtSeries(getTradText(user_store.language, "rest_time"));
      }

      // Manage the last series of the last round.
      else if (
        currentIDSeries == workout_len &&
        currentRound == workout_state.round
      ) {
        stopTimer();
        setTxtSeries(getTradText(user_store.language, "finished"));
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

          // It's the last round.
          if (currentRound + 1 == workout_state.round) {
            setNextIsRest(false);
            setTxtNextSeries(getTradText(user_store.language, "finished"));
          } else {
            setNextIsRest(true);
            setTxtNextSeries(workout_state.series[0].seriesName);
          }
        } else {
          // The rest time must be greater than 0.
          if (workout_state.rest_time > 0)
            setNextIsRest(workout_state.series[currentIDSeries + 1].rest);
          else setNextIsRest(false);

          setTxtNextSeries(
            workout_state.series[currentIDSeries + 1].seriesName
          );
          // Increment series id if the next series is not a rest.
          if (
            !workout_state.series[currentIDSeries].rest ||
            workout_state.rest_time == 0
          )
            setCurrentIDSeries(currentIDSeries + 1);
        }
      }
    }
  }

  return (
    <ContainerPage hide_status={true} is_portrait={false}>
      <View style={styles.ctn_header}>
        <View style={styles.ctn_series_next}>
          <TextTraduction style={styles.txt_series_prefix} key_text={"next"} />
          <Text
            style={[styles.txt_series, styles.txt_series_next]}
            numberOfLines={2}
            adjustsFontSizeToFit={true}
          >
            {txtNextSeries}
          </Text>
        </View>

        <View style={styles.ctn_stats}>
          <Text style={styles.txt_stats}>{txtStats}</Text>
          <ButtonImage
            path={ICON.white.close}
            onPress={onClose}
            size={36}
            style={styles.btn_close}
          />
        </View>
      </View>

      <View style={styles.ctn_series_current}>
        <TextTraduction style={styles.txt_series_prefix} key_text={"now"} />

        <View>
          <Text
            style={styles.txt_series}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {txtSeries}
          </Text>
        </View>
      </View>

      <View style={styles.ctn_center}>
        <ButtonRound onPress={substractTime} text={"-"} />

        <Text style={styles.txt_timer} adjustsFontSizeToFit={true}>
          {currentTime}
          {isTimer ? "s" : " rep"}
        </Text>

        <ButtonRound onPress={addTime} text={"+"} />
      </View>

      <View style={styles.ctn_footer}>
        <TimeBar
          colorBar={COLORS_APP.outline_third}
          colorFill={COLORS_APP.cta}
          currentValue={currentTime}
          maxValue={maxTime}
        />

        <View style={styles.ctn_footer_btn}>
          <TouchableOpacity
            style={[
              styles.btn_action,
              styles.btn_sec,
              styles.btn_reset,
              is_running && styles.btn_disabled,
            ]}
            onPress={reset}
            disabled={is_running}
          >
            <TextTraduction style={styles.btn_txt_action} key_text={"reset"} />
          </TouchableOpacity>

          <ButtonToggle
            style={[styles.btn_action, styles.btn_main]}
            state={is_running}
            text={getTradText(user_store.language, "play")}
            txt_active={getTradText(user_store.language, "stop")}
            onPress={is_running ? stopTimer : startTimer}
            style_active={styles.btn_tgl_actv}
            font_size={17}
          />
        </View>
      </View>
    </ContainerPage>
  );

  /** Add time to the current series. */
  function addTime() {
    var interval = isTimer ? interval_increase_time : interval_increase_rep;
    setMaxTime(Number(maxTime) + interval);
    setCurrentTime(Number(currentTime) + interval);
  }

  /** Subtract time to the current. */
  function substractTime() {
    var interval = isTimer ? interval_increase_time : interval_increase_rep;
    setMaxTime(Math.max(0, Number(maxTime) - interval));
    setCurrentTime(Math.max(0, Number(currentTime) - interval));
  }

  /** Reset the workout */
  function reset() {
    setCurrentIDSeries(initial_id);
    setCurrentRound(initial_round);
    setCurrentTime(initial_timer);
    setMaxTime(initial_timer);
    setNextIsRest(false);
    setIsTimer(true);
    setTxtSeries("Be ready");
    setTxtNextSeries(workout_state.series[0].seriesName);
    setTxtStats(getTxtCountSeries(0, workout_len, 0, workout_state.round));
  }

  /** Back to the homepage. */
  function onClose() {
    navigation.goBack();
    setOrient();
  }
};

export default TimerPage;

const styles = StyleSheet.create({
  ctn_header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
    marginBottom: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  ctn_stats: {
    flexDirection: "row",
    paddingLeft: 50,
    top: 10,
  },

  txt_stats: {
    textAlign: "left",
    fontSize: 20,
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    fontWeight: "100",
    padding: 5,
  },

  txt_series: {
    fontSize: 50,
    fontWeight: "bold",
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
  },

  ctn_series_next: {
    width: "50%",
    height: 50,
    paddingLeft: 20,
  },

  txt_series_next: {
    fontSize: 30,
    paddingTop: 5,
  },

  txt_series_prefix: {
    color: COLORS_APP.font_secs,
    fontFamily: FONT_FAMILY.main,
  },

  ctn_series_current: {
    paddingHorizontal: 40,
    alignItems: "center",
    height: 80,
  },

  ctn_center: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  txt_timer: {
    fontSize: 70,
    alignSelf: "center",
    color: COLORS_APP.font_main,
    fontWeight: "200",
  },

  ctn_footer: {
    paddingHorizontal: 30,
  },

  ctn_footer_btn: {
    // position: "absolute",
    // left: 0,
    // right: 140,
    flexDirection: "row",
    justifyContent: "center",
    padding: 18,
    alignItems: "center",
  },

  btn_action: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLORS_APP.background_third,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    width: 140,
  },

  btn_main: {
    flex: 0,
    height: 50,
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    zIndex: 2,
    borderColor: COLORS_APP.cta,
  },

  btn_sec: {
    height: 40,
    borderColor: COLORS_APP.cta,
    borderWidth: 2,
  },

  btn_tgl_actv: {
    backgroundColor: COLORS_APP.cta,
  },

  btn_disabled: {
    opacity: 0.2,
  },

  btn_reset: {
    right: -5,
  },

  btn_next: {
    left: -5,
  },

  btn_txt_action: {
    textTransform: "uppercase",
    color: COLORS_APP.font_secs,
    fontFamily: FONT_FAMILY.regular,
  },
});
