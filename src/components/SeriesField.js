// Librairies
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Components
import ButtonToggle from "./ButtonToggle";
import {
  onChangeUpdateSeries,
  onPressDefaultOptionsBool,
  onPressToggleOptions,
  onPressRemoveSeries,
} from "../scripts/buttonAction";
import ButtonPlus from "./ButtonPlus";
import ButtonImage from "./ButtonImage";
import { ColorsApp, FontFamily, path_icn_remove_wh } from "../utils/app_properties";

const RightSwipe = ({ setWorkout, series_UID }) => {
  return (
    <ButtonImage
      action={() => onPressRemoveSeries(setWorkout, series_UID)}
      path={path_icn_remove_wh}
      size={30}
      style={styles.ctn_right}
    />
  );
};

const SeriesField = ({
  series_state,
  setWorkout,
  state_rest,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [txtBtnOptions, setTxtBtnOptions] = useState("+");

  return (
    <View style={styles.ctn_main}>
      <Swipeable
        renderRightActions={() => (
          <RightSwipe setWorkout={setWorkout} series_UID={series_state.uid} />
        )}
      >
        <View style={styles.ctn_flex_boxes}>
          <TextInput
            placeholder={"Your workout name..."}
            defaultValue={series_state.seriesName}
            onEndEditing={(e) =>
              onChangeUpdateSeries(
                "seriesName",
                e.nativeEvent.text,
                series_state.uid,
                setWorkout
              )
            }
            style={[styles.input_series, styles.input_series_name]}
            autoCapitalize={"sentences"}
            autoCorrect={false}
            keyboardType={"default"}
            maxLength={26}
            returnKeyType={"next"}
            placeholderTextColor={ColorsApp.font_secs}
          />
          <TextInput
            placeholder={"10s"}
            defaultValue={series_state.lap}
            onEndEditing={(e) =>
              onChangeUpdateSeries(
                "lap",
                e.nativeEvent.text,
                series_state.uid,
                setWorkout
              )
            }
            style={[styles.input_series, styles.input_series_time]}
            autoCorrect={false}
            keyboardType={"number-pad"}
            maxLength={4}
            placeholderTextColor={ColorsApp.font_secs}
          />
        </View>

        {showOptions && (
          <View style={styles.ctn_action}>
            <ButtonToggle
              text={"No rest"}
              txt_active={"Next is rest"}
              txt_colors={ColorsApp.font_main}
              shadow={true}
              state={state_rest}
              style={[styles.btn_action, styles.btn_left]}
              onChange={() =>
                onChangeUpdateSeries(
                  "rest",
                  !state_rest,
                  series_state.uid,
                  setWorkout
                )
              }
            />
            <ButtonToggle
              disabled={true}
              text={"Timer"}
              txt_active={"Counter"}
              txt_colors={ColorsApp.font_main}
              shadow={false}
              style={[styles.btn_action, styles.btn_right]}
            />
          </View>
        )}

        <ButtonPlus
          action={() =>
            onPressToggleOptions(showOptions, setShowOptions, setTxtBtnOptions)
          }
          size={25}
          positionX={3}
          positionY={10}
          text={txtBtnOptions}
          txt_color={ColorsApp.font_third}
          bg_color={ColorsApp.outline_third}
        />
      </Swipeable>
    </View>
  );
};

export default SeriesField;

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
    backgroundColor: ColorsApp.background_third,
    borderColor: ColorsApp.outline_main,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  input_series: {
    marginHorizontal: 3,
    borderBottomWidth: 2,
    padding: 5,
    borderColor: ColorsApp.outline_third,
    color: ColorsApp.font_main,
  },

  input_series_name: {
    flex: 3,
  },

  input_series_time: {
    flex: 1,
  },

  ctn_action: {
    backgroundColor: ColorsApp.outline_main,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignSelf: "center",
  },
  
  btn_action: {
    backgroundColor: ColorsApp.outline_main,
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: ColorsApp.outline_forth
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
    borderColor: ColorsApp.confirmation,
  },

  ctn_right: {
    marginLeft: 5,
    width: "25%",
    zIndex: -1,
    backgroundColor: ColorsApp.destructible,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
