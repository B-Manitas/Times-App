// Import Librairies.
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Import Functions.
import { getPlaceholderText } from "../scripts";

// Import Customs Components.
import ButtonToggle from "./ButtonToggle";
import ButtonPlus from "./ButtonPlus";
import ButtonImage from "./ButtonImage";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { ICON } from "../utils/ConstantImages";

const RightSwipe = ({ removeSeries }) => {
  return (
    <ButtonImage
      onPress={removeSeries}
      path={ICON.white.remove}
      size={30}
      style={styles.ctn_right}
    />
  );
};

const WorkoutField = ({ series_state, setWorkout, state_rest, language }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [txtBtnOptions, setTxtBtnOptions] = useState("+");

  return (
    <View style={styles.ctn_main}>
      <Swipeable
        renderRightActions={() => <RightSwipe removeSeries={removeSeries} />}
      >
        <View style={styles.ctn_flex_boxes}>
          <TextInput
            placeholder={getPlaceholderText(language, "series_name")}
            defaultValue={series_state.seriesName}
            onEndEditing={(e) => updateInput("seriesName", e.nativeEvent.text)}
            style={[styles.input_series, styles.input_series_name]}
            autoCapitalize={"sentences"}
            autoCorrect={false}
            keyboardType={"default"}
            maxLength={26}
            returnKeyType={"next"}
            placeholderTextColor={COLORS_APP.font_secs}
          />
          <TextInput
            placeholder={"10s"}
            defaultValue={series_state.lap}
            onEndEditing={(e) => updateInput("lap", e.nativeEvent.text)}
            style={[styles.input_series, styles.input_series_time]}
            autoCorrect={false}
            keyboardType={"number-pad"}
            maxLength={4}
            placeholderTextColor={COLORS_APP.font_secs}
          />
        </View>

        {showOptions && (
          <View style={styles.ctn_action}>
            <ButtonToggle
              key_text={"no_rest"}
              key_text_atv={"next_rest"}
              shadow={true}
              state={state_rest}
              style={[styles.btn_action, styles.btn_left]}
              onPress={() => updateInput("rest", !state_rest)}
            />
            <ButtonToggle
              disabled={true}
              key_text={"timer"}
              txt_active={"Counter"}
              shadow={false}
              style={[styles.btn_action, styles.btn_right]}
            />
          </View>
        )}

        <ButtonPlus
          onPress={toggleOptions}
          size={25}
          positionX={3}
          positionY={10}
          text={txtBtnOptions}
          txt_color={COLORS_APP.font_third}
          bg_color={COLORS_APP.outline_third}
        />
      </Swipeable>
    </View>
  );

  function toggleOptions() {
    if (showOptions) {
      setShowOptions(false);
      setTxtBtnOptions("+");
    } else {
      setShowOptions(true);
      setTxtBtnOptions("-");
    }
  }

  function updateInput(key, value) {
    setWorkout((p) => ({
      ...p,
      series: p.series.map((item) => {
        if (item.uid === series_state.uid) return { ...item, [key]: value };

        return item;
      }),
    }));
  }

  function removeSeries() {
    setWorkout((p) => ({
      ...p,
      series: p.series.filter((series) => series.uid !== series_state.uid),
    }));
  }
};

export default WorkoutField;

const styles = StyleSheet.create({
  ctn_main: {
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  ctn_flex_boxes: {
    flexDirection: "row",
    backgroundColor: COLORS_APP.background_third,
    borderColor: COLORS_APP.outline_main,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  input_series: {
    marginHorizontal: 3,
    borderBottomWidth: 2,
    padding: 5,
    borderColor: COLORS_APP.outline_third,
    color: COLORS_APP.font_main,
  },

  input_series_name: {
    flex: 3,
  },

  input_series_time: {
    flex: 1,
  },

  ctn_action: {
    backgroundColor: COLORS_APP.outline_main,
    flexDirection: "row",
    ...StyleSheet.absoluteFill,
    alignSelf: "center",
  },

  btn_action: {
    backgroundColor: COLORS_APP.outline_main,
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: COLORS_APP.outline_forth,
  },

  btn_right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  btn_left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  btn_active: {
    borderColor: COLORS_APP.confirmation,
  },

  ctn_right: {
    marginLeft: 5,
    width: "25%",
    zIndex: -1,
    backgroundColor: COLORS_APP.background_destructible,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
