// Import Librairies
import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { getStopwatchFormat } from "../scripts";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const ToolsTimer = ({ time }) => {
  return (
    <View style={styles.ctn}>
      <Text style={styles.txt_time}>{getStopwatchFormat(time)[0].padStart(2, "0")}</Text>
      <Text style={styles.txt_unit}>m</Text>
      <Text style={styles.txt_time}>{getStopwatchFormat(time)[1].padStart(2, "0")}</Text>
      <Text style={styles.txt_unit}>s</Text>
    </View>
  );
};

export default ToolsTimer;

const styles = StyleSheet.create({
  ctn: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },

  txt_time: {
    fontSize: 50,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
  },

  txt_unit: {
    fontSize: 15,
    color: "#fff",
    marginRight: 15,
  },
});
