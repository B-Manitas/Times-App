// Import Libraries.
import React from "react";
import { View, StyleSheet } from "react-native";

// Import Customs Components.
import RadioButton from "./RadioButton";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

const RadioList = ({
  items,
  current_checked,
  onChange,
  add_border = false,
  bd_colors = undefined,
  disabled = false,
}) => {
  return (
    <View style={styles.ctn_flex_boxes}>
      {items.map((item, index) => {
        return (
          <RadioButton
            disabled={disabled}
            item={item}
            state={item === current_checked}
            onChange={onChange}
            add_border={add_border}
            key={index}
            bd_color={
              bd_colors != undefined ? bd_colors[index] : COLORS_APP.cta
            }
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
