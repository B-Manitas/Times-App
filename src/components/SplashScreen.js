// Import Librairies.
import React, { useEffect } from "react";
import { Animated, Dimensions, Easing, Text, StyleSheet } from "react-native";

// Import Constants.
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";

const SplashScreen = ({ setShowSplash }) => {
  const duration = 1000;
  const panel_position = new Animated.Value(0.8);
  const square_position = new Animated.Value(0.8);
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const positionY = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(square_position, {
          toValue: 1,
          duration: duration,
          delay: 0,
          useNativeDriver: true,
        }),
        Animated.timing(square_position, {
          toValue: 0.8,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 1 }
    ).start(rotate);
  });

  const rotate = () => {
    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(4),
        useNativeDriver: true,
      }),
      Animated.spring(positionY, {
        toValue: Dimensions.get("screen").height / 2,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start(finish);
  };

  const finish = () => {
    Animated.spring(panel_position, {
      toValue: Dimensions.get("window").height,
      useNativeDriver: true,
    }).start(isFinished);
  };

  const isFinished = () => {
    setShowSplash(false);
  };

  return (
    <Animated.View
      style={[styles.ctn_main, { transform: [{ translateY: panel_position }] }]}
    >
      <Animated.View
        style={[
          styles.square,
          {
            transform: [
              { scale: square_position },
              { rotate: spin },
              { translateY: positionY },
            ],
          },
        ]}
      >
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.txt}>
          Time's App
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  ctn_main: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS_APP.background,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  square: {
    transform: [{ rotate: "0deg" }],
    width: 220,
    height: 70,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_APP.cta,
    shadowColor: COLORS_APP.cta,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    padding: 10,
  },

  txt: {
    fontSize: 25,
    fontFamily: FONT_FAMILY.main,
    color: "#fff",
  },
});
