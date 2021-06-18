import React from "react";
import { View, StyleSheet } from "react-native";

const ContainerBody = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default ContainerBody;

// Style Component
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 90,
    left: 0,
    right: 0,
    bottom: 70,
  },
});
