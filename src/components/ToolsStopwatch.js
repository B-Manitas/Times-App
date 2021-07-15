// Import Librairies
import React, { useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

// Import Customs Components.
import TimeBar from "./TimeBar";

// Import Functions.
import { getStopwatchFormat } from "../scripts";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const ToolsStopwatch = ({ second, setSecond, minute, setMinute, time, setTime, maxTime, setMaxTime, is_running }) => {
  useEffect(() => {
    setTime(second + minute * 60);
    setMaxTime(second + minute * 60);
  }, [second, minute]);

  return (
    <View>
      <View style={styles.ctn_time}>
        <TextInput
          style={[styles.input, styles.txt_time]}
          placeholder={"00"}
          placeholderTextColor={COLORS_APP.font_forth}
          keyboardType={"number-pad"}
          maxLength={2}
          onChangeText={(t) => setMinute(Number(t))}        
          defaultValue={time != 0 ? getStopwatchFormat(time)[0] : ""}
          editable={!is_running}
        />
        <Text style={styles.txt_unit}>m</Text>

        <TextInput
          style={[styles.input, styles.txt_time]}
          placeholder={"00"}
          placeholderTextColor={COLORS_APP.font_forth}
          keyboardType={"number-pad"}
          maxLength={2}
          onChangeText={(t) => setSecond(Number(t))}
          defaultValue={time != 0 ? getStopwatchFormat(time)[1] : ""}
          editable={!is_running}
        />
        <Text style={styles.txt_unit}>s</Text>
      </View>
      <TimeBar
        colorBar={COLORS_APP.outline_third}
        colorFill={COLORS_APP.cta}
        currentValue={time}
        maxValue={maxTime}
      />
    </View>
  );
};

export default ToolsStopwatch;

const styles = StyleSheet.create({
  ctn_time: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },

  input: {
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
});
