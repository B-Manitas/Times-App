// React
import React from "react";
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";

// Main app properties
import { ColorsApp } from "../utils/app_properties";

const ContainerPage = ({ children, style, hide_status = false }) => {
  return (
    <SafeAreaView style={[styles.safeContainer, style]}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <StatusBar
            hidden={hide_status}
            animated={"slide"}
            translucent
            barStyle={"light-content"}
            backgroundColor={ColorsApp.background_}
          />
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
    backgroundColor: ColorsApp.background_,
  },

  container: {
    flex: 1,
    backgroundColor: ColorsApp.background_,
  },
});
