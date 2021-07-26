// Import Libraries.
import React from "react";
import { StyleSheet, View } from "react-native";

const TimeBar = ({
  colorBar,
  colorFill,
  currentValue,
  maxValue,
  style,
  invert,
}) => {
  // Compute the percentage of the width.
  const fill_width = !invert
    ? (100 * (maxValue - currentValue)) / maxValue
    : (100 * currentValue) / maxValue;

  return (
    <View style={[styles.TimeBar, style]}>
      <View style={[styles.bar_back_time, { backgroundColor: colorBar }]} />
      <View
        style={[
          styles.bar_current_time,
          {
            backgroundColor: colorFill,
            width: fill_width + "%",
          },
        ]}
      />
    </View>
  );
};

export default TimeBar;

const styles = StyleSheet.create({
  bar_back_time: {
    width: "100%",
    height: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: 5,
  },

  bar_current_time: {
    position: "absolute",
    height: 5,
    borderRadius: 5,
  },
});
