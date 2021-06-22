// React
import React from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
} from "react-native";

// Main app properties
import { ColorsApp } from "../../utils/app_properties";

const ContainerPage = ({ children, style, hide_status=false }) => {

  return (
    <SafeAreaView style={[styles.safeContainer, style]}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <StatusBar hidden={hide_status} animated={"slide"} barStyle={"dark-content"} backgroundColor={ColorsApp.header} />
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ContainerPage;

// Style Component
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
