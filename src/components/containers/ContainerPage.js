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
import { LinearGradient } from "expo-linear-gradient";

// Main app properties
import { ColorsApp } from "../../utils/app_properties";

const ContainerPage = ({ children }) => {
  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <StatusBar hidden={true} backgroundColor={ColorsApp.header} />
          {children}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ContainerPage;

// Style Component
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: ColorsApp.header,
  },

  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: ColorsApp.bg,
  },
});
