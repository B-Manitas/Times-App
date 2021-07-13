// Import Librairies.
import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

// Import Customs Components.
import ButtonToggle from "../components/ButtonToggle";
import ContainerPage from "../components/ContainerPage";
import HeaderBack from "../components/HeaderBack";
import { getFormatStopwatch, useTimer } from "../scripts";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const StopwatchScreen = ({ navigation }) => {
  const [time, setTime] = useState(0);
  const [txtTime, setTxtTime] = useState(getFormatStopwatch(time));

  const [startTime, stopTime, is_running] = useTimer(() =>
    setTime((t) => t + 1)
  );

  useEffect(() => {
    setTxtTime(getFormatStopwatch(time));
  }, [time]);

  return (
    <ContainerPage>
      <HeaderBack onPress={() => navigation.goBack()} text={"Stopwatch"} />
      <View style={styles.ctn_body}>
        <View style={styles.clock}>
          <View style={styles.clock_in}>
            <Text style={styles.clock_txt}>{txtTime}</Text>
          </View>
        </View>
        <View style={styles.ctn_btn}>
          <ButtonToggle
            style={styles.btn_action}
            text={"Reset"}
            onPress={()=>setTime(0)}
            font_size={17}
            txt_colors={COLORS_APP.font_main}
          />
          
          <ButtonToggle
            style={[styles.btn_action, styles.btn_play]}
            state={is_running}
            text={"Play"}
            txt_active={"Stop"}
            onPress={is_running ? stopTime : startTime}
            style_active={styles.btn_tgl_actv}
            style_txt_active={styles.btn_tgl_txt_actv}
            font_size={17}
            txt_colors={COLORS_APP.font_main}
          />
        </View>
      </View>
    </ContainerPage>
  );
};

export default StopwatchScreen;

const styles = StyleSheet.create({
  ctn_body: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },

  clock: {
    width: 300,
    height: 300,
    backgroundColor: COLORS_APP.cta,
    borderRadius: 200,
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
  },

  clock_in: {
    backgroundColor: COLORS_APP.background,
    width: 298,
    height: 298,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  clock_txt: {
    fontSize: 60,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
  },

  ctn_btn: {
    marginVertical: 20,
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
    zIndex: 2,
    borderColor: COLORS_APP.cta,
    borderWidth: 1,
    flex: 1,
  },

  btn_play:{
  },

  btn_tgl_actv: {
    backgroundColor: COLORS_APP.cta,
  },

  btn_tgl_txt_actv: {
    color: "#fff",
  },
});
