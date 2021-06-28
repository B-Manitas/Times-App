import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { ColorsApp } from "../utils/app_properties";

const RadioButton = ({ item, state, onChange, bd_color }) => {
  return (
    <Pressable
      onPress={() => onChange(item)}
      style={[
        styles.btn_boxes,
        state && { borderColor: bd_color, backgroundColor: bd_color },
      ]}
    >
      <Text style={[styles.txt, state && {color: ColorsApp.font_main}]}>{item}</Text>
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  btn_boxes: {
    flex: 1,
    borderWidth: 2,
    borderColor: ColorsApp.outline_forth,
    borderRadius: 5,
    paddingHorizontal: 2,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 2,
    marginHorizontal: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: "#fff",
  },

  txt: {
    textAlign: "center",
    color: ColorsApp.main,
    fontWeight: "bold",
  },
});
