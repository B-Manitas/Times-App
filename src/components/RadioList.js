import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import RadioButton from "./RadioButton";

const RadioList = ({ items, current_checked, onChange, bd_colors }) => {
  return (
    <View style={styles.ctn_flex_boxes}>
      {items.map((item, index) => {
        return (
          <RadioButton
            item={item.key}
            state={item.key === current_checked}
            onChange={onChange}
            key={index}
            bd_color={bd_colors[item.key - 1]}
          />
        );
      })}
    </View>
  );
};

export default RadioList;

const styles = StyleSheet.create({
  ctn_flex_boxes: {
    flexDirection: "row",
  },
});
