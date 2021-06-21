import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ButtonSquare from "./ButtonSquare";
import { ColorsApp } from "../utils/app_properties";
import { useState } from "react";
import {
  onChangeUpdateSeries,
  onPressToggleOptions,
} from "../scripts/buttonAction";

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

  const update = (key, bool_state, setState) => {
    setState(!bool_state);
    onChangeUpdateSeries(key, !bool_state, series_state.id, setWorkout);
  };
  
  return (
    <View style={styles.ctn_main}>
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
            onChange={() => update("rest", addRest, setAddRest)}
          />
          <ButtonSquare
            text={"Is a timer"}
            state={default_state_timer}
            onChange={() => update("is_timer", isTimer, setIsTimer)}
          />
        </View>
      )}

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
  },

  ctn_main: {
    borderColor: ColorsApp.border,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 7,
  },

  input_series: {
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
});
