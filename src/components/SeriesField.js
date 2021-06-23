// Librairies
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Components
import ButtonSquare from "./ButtonSquare";
import {
  onChangeUpdateSeries,
  onPressDefaultOptionsBool,
  onPressToggleOptions,
  onPressRemoveSeries,
} from "../scripts/buttonAction";
import { ColorsApp } from "../utils/app_properties";

const RightSwipe = ({ setWorkout, series_UID }) => {
  return (
    <TouchableOpacity
      onPress={() => onPressRemoveSeries(setWorkout, series_UID)}
      style={styles.ctn_right}
    >
      <Text style={styles.ctn_txt_right}>Remove</Text>
    </TouchableOpacity>
  );
};

const SeriesField = ({
  series_state,
  setWorkout,
  default_state_rest = false,
  default_state_timer = false,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [txtBtnOptions, setTxtBtnOptions] = useState("+");
  const [addRest, setAddRest] = useState(default_state_rest);
  const [isTimer, setIsTimer] = useState(default_state_timer);

  return (
    <View style={styles.ctn_main}>
      <Swipeable renderRightActions={() => <RightSwipe setWorkout={setWorkout} series_UID={series_state.id} />}>
        <View style={styles.ctn_flex_boxes}>
          <TextInput
            placeholder={"Your workout name..."}
            defaultValue={series_state.seriesName}
            onEndEditing={(e) =>
              onChangeUpdateSeries(
                "seriesName",
                e.nativeEvent.text,
                series_state.id,
                setWorkout
              )
            }
            style={[styles.input_series, styles.input_series_name]}
            autoCapitalize={"sentences"}
            autoCorrect={false}
            keyboardType={"default"}
            maxLength={26}
            returnKeyType={"next"}
          />
          <TextInput
            placeholder={"10s"}
            defaultValue={series_state.lap}
            onEndEditing={(e) =>
              onChangeUpdateSeries(
                "lap",
                e.nativeEvent.text,
                series_state.id,
                setWorkout
              )
            }
            style={[styles.input_series, styles.input_series_time]}
            autoCorrect={false}
            keyboardType={"number-pad"}
            maxLength={6}
            returnKeyType={"done"}
          />
        </View>
        {showOptions && (
          <View style={styles.ctn_flex_boxes}>
            <ButtonSquare
              text={"Add a rest"}
              state={default_state_rest}
              onChange={() =>
                onPressDefaultOptionsBool("rest", addRest, setAddRest)
              }
            />
            <ButtonSquare
              text={"Is a timer"}
              state={default_state_timer}
              onChange={() =>
                onPressDefaultOptionsBool("is_timer", isTimer, setIsTimer)
              }
            />
          </View>
        )}
      </Swipeable>

      <TouchableOpacity
        style={styles.btn_options}
        onPress={() =>
          onPressToggleOptions(showOptions, setShowOptions, setTxtBtnOptions)
        }
      >
        <Text style={styles.txt_options}>{txtBtnOptions}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeriesField;

const styles = StyleSheet.create({
  ctn_flex_boxes: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  ctn_main: {
    backgroundColor: "#fff",
    borderColor: ColorsApp.border,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 7,
  },

  input_series: {
    backgroundColor: "#fff",
    marginHorizontal: 3,
    borderBottomWidth: 2,
    padding: 3,
    borderColor: ColorsApp.border,
    color: ColorsApp.light_font,
  },

  input_series_name: {
    flex: 4,
  },

  input_series_time: {
    flex: 1,
  },

  btn_options: {
    position: "absolute",
    right: -10,
    bottom: -10,
    width: 25,
    height: 25,

    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    backgroundColor: ColorsApp.light_font,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: ColorsApp.light_font,
  },

  txt_options: {
    color: "#fff",
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
  },

  ctn_right: {
    width: "75%",
    zIndex: -1,
    backgroundColor: ColorsApp.remove,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  ctn_txt_right: {
    color: "#fff",
    fontWeight: "bold",
  },
});
