import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ColorsApp } from "../utils/app_properties";

const ContainerTimerWorkout = (props) => {
  return (
    <View
      style={[
        styles.container,
        { opacity: Math.max(1 - props.pos / props.n, 0.1) },
      ]}
    >
      <Text style={styles.title}>{props.text}</Text>
    </View>
  );
};

export default ContainerTimerWorkout;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    marginBottom: 7,

    backgroundColor: ColorsApp.bg,
    borderColor: ColorsApp.border,
    borderRadius: 2,
    marginVertical: 4,
    marginHorizontal: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: ColorsApp.light_font,
    fontWeight: "bold",
  },
});
