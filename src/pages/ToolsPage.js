// Import Librairies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useKeepAwake } from "expo-keep-awake";

// Import Customs Components.
import ButtonCustom from "../components/ButtonCustom";
import ButtonToggle from "../components/ButtonToggle";
import ContainerPage from "../components/ContainerPage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RadioListMenu from "../components/RadioListMenu";
import ToolsCounter from "../components/ToolsCounter";
import ToolsStopwatch from "../components/ToolsStopwatch";
import ToolsTimer from "../components/ToolsTimer";

// Import Functions.
import { playSound, useTimer } from "../scripts";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { LOGO } from "../utils/ConstantImages";
import { SOUND } from "../utils/ConstantSound";
import { TOOLS } from "../utils/ConstantPage";

const ToolsPage = ({ navigation }) => {
  useKeepAwake();

  const user_store = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const list_menu = [
    { key: "timer", key_text: "timer", src_img: LOGO.hourglass },
    { key: "stopwatch", key_text: "stopwatch", src_img: LOGO.stopwatch },
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
      <Header key_text={"toolbox"} path_img={LOGO.toolbox} />

      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={"padding"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.ctn_body}>
          <ToolsCounter />
          <View style={styles.ctn_timer}>
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
              <ButtonCustom
                key_text={"reset"}
                flex={1 / 2}
                onPress={reset}
                disabled={is_running}
              />

              <ButtonToggle
                shadow={true}
                style={styles.btn_timer}
                state={is_running}
                key_text={"play"}
                key_text_atv={"stop"}
                onPress={is_running ? stopTime : startTime}
                font_size={17}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer
        navigation={navigation}
        dispatch={dispatch}
        current_key_active={TOOLS}
      />
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

export default ToolsPage;

const styles = StyleSheet.create({
  ctn_header: {
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
    width: 60,
    height: 60,
  },

  ctn_body: {
    flex: 1,
    paddingHorizontal: 20,
  },

  ctn_timer: {
    marginTop: 30,
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
