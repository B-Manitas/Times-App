// Import Librairies.
import React, { useCallback } from "react";
import { Linking, Text, StyleSheet } from "react-native";

// Import Functions.
import { getAlertText } from "../scripts";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

const ButtonText = ({ text, onPress, color, language, is_url = false }) => {
  const onPressURL = useCallback(async () => {
    if (Linking.canOpenURL(onPress)) await Linking.openURL(onPress);
    else Alert.alert(getAlertText(language, "inaccessible_link"));
  }, []);

  return (
    <Text
      onPress={is_url ? onPressURL : onPress}
      style={[styles.txt, { color }]}
    >
      {text}
    </Text>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  txt: {
    color: COLORS_APP.font_third,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
