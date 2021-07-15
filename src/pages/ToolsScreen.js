// Import Librairies
import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text, TextInput } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

// Import Customs Components.
import ButtonCTA from "../components/ButtonCTA";
import ButtonToggle from "../components/ButtonToggle";
import ContainerPage from "../components/ContainerPage";
import Footer from "../components/Footer";
import RadioListMenu from "../components/RadioListMenu";
import ToolsStopwatch from "../components/ToolsStopwatch";
import ToolsTimer from "../components/ToolsTimer";

// Import Functions.
import { playSound, useTimer } from "../scripts";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import {
  path_logo_toolbox,
  path_logo_stopwatch,
  path_logo_hourglass,
} from "../utils/ConstantImages";
import { SOUND } from "../utils/ConstantSound";

const ToolsScreen = ({ navigation }) => {
  useKeepAwake();

  const list_menu = [
    { key: "timer", text: "Timer", src_img: path_logo_hourglass },
    { key: "stopwatch", text: "Stopwatch", src_img: path_logo_stopwatch },
  ];

  const [menuActive, setMenuActive] = useState(list_menu[0].key);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [time, setTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [sound, setSound] = useState();

  let is_timer = menuActive == list_menu[0].key;
  const [startTime, stopTime, is_running] = useTimer(() =>
    setTime((t) => (is_timer ? t - 1 : t + 1))
  );

  useEffect(() => {
    if ((is_timer && time <= 0) || (!is_timer && time >= 6000)) {
      if (is_running) playSound(setSound, SOUND.end_time);
      reset();
    }
  }, [time, is_running]);

  return (
    <ContainerPage>
      <View style={styles.ctn_header}>
        <Image source={path_logo_toolbox} style={styles.header_logo} />
        <Text style={styles.header_txt}>Toolbox</Text>
      </View>

      <View style={styles.ctn_body}>
        <RadioListMenu
          items={list_menu}
          key_atv={menuActive}
          onPress={(key_atv) => changeMode(key_atv)}
        />

        {menuActive === list_menu[0].key && (
          <ToolsStopwatch
            second={second}
            setSecond={setSecond}
            minute={minute}
            setMinute={setMinute}
            time={time}
            setTime={setTime}
            maxTime={maxTime}
            setMaxTime={setMaxTime}
            is_running={is_running}
          />
        )}

        {menuActive === list_menu[1].key && <ToolsTimer time={time} />}
        <View style={styles.ctn_btn_action}>
          <ButtonCTA text={"Reset"} onPress={reset} disabled={is_running} />

          <ButtonToggle
            shadow={true}
            style={styles.btn_timer}
            state={is_running}
            text={"Play"}
            txt_active={"Stop"}
            onPress={is_running ? stopTime : startTime}
            font_size={17}
          />
        </View>
      </View>
      <Footer navigation={navigation} current_key_active={"tools"} />
    </ContainerPage>
  );

  function reset() {
    stopTime();
    setSecond(0);
    setMinute(0);
    setTime(0);
    setMaxTime(0);
    setSound();
  }

  function changeMode(menu) {
    reset();
    setMenuActive(menu);
  }
};

export default ToolsScreen;

const styles = StyleSheet.create({
  ctn_header: {
    paddingTop: 20,
    padding: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  header_txt: {
    marginLeft: 15,
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
  },

  header_logo: {
    width: 64,
    height: 64,
  },

  ctn_body: {
    flex: 1,
    paddingHorizontal: 20,
  },

  ctn_time: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },

  input: {
    marginHorizontal: 10,
    flex: 1,
    textAlign: "center",
  },

  txt_unit: {
    fontSize: 15,
    color: "#fff",
    marginRight: 15,
  },

  txt_time: {
    fontSize: 50,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
  },

  ctn_btn_action: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  btn_timer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: COLORS_APP.background_third,
    borderColor: COLORS_APP.cta,
  },
});
