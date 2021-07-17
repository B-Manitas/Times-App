// Import Libraries.
import React from "react";
import { View, StyleSheet } from "react-native";

// Import Customs Components.
import RadioButton from "./RadioButton";

import { COLORS_APP } from "../utils/ConstantColors";

const RadioList = ({
  items,
  current_checked,
  onChange,
  bd_colors = undefined,
}) => {
  return (
    <View style={styles.ctn_flex_boxes}>
      {items.map((item, index) => {
        return (
          <RadioButton
            item={item.key}
            state={item.key === current_checked}
            onChange={onChange}
            key={index}
            bd_color={
              bd_colors != undefined ? bd_colors[item.key - 1] : COLORS_APP.cta
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
