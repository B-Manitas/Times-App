// Librairies
import React from "react";
import {
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Redux store
import { useDispatch } from "react-redux";
import { removeWorkoutCreator } from "../../redux/actionCreators";

// Custom components
import WidgetBox from "../widgets/WidgetBox";

// Main app properties
import { ColorsApp } from "../../utils/app_properties";
import { EditMode, TimerMode } from "../../utils/app_type";

const ContainerSeriesView = (props) => {
  const dispatch = useDispatch();

  const arrFormatHHMMSS = (secs) => {
    return [
      String(Math.floor(secs / 3600)).padStart(2, "0"),
      String(Math.floor(secs / 60) % 60).padStart(2, "0"),
      String(secs % 60).padStart(2, "0"),
    ];
  };

  const time = () => {
    var t = 0;
    for (const series in props.workout.series) {
      if (Object.hasOwnProperty.call(props.workout.series, series)) {
        t += parseInt(props.workout.series[series].lap);
      }
    }

    return arrFormatHHMMSS(t * props.workout.round);
  };

  const workoutTime = time();

  const rightSwipe = () => {
    return (
      <View style={styles.containerPanelRight}>
        <TouchableOpacity
          style={styles.panelRight}
          onPress={() => dispatch(removeWorkoutCreator(props.workout.id))}
        >
          <Text style={styles.panelRightTxt}>Remove</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.switcherMode(EditMode, props.workout.id)}
          style={[styles.panelRight, { borderLeftWidth: 1 }]}
        >
          <Text style={styles.panelRightTxt}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.subContainer}>
          <Pressable
            onPress={() => props.switcherMode(TimerMode, props.workout.id)}
          >
            <View style={styles.containerTitle}>
              <Text style={styles.title}>{props.workout.title}</Text>
            </View>

            <View style={styles.containerTime}>
              <WidgetBox text={workoutTime[0]} />
              <Text style={styles.txtTimeSeparator}>:</Text>
              <WidgetBox text={workoutTime[1]} />
              <Text style={styles.txtTimeSeparator}>:</Text>
              <WidgetBox text={workoutTime[2]} />
            </View>
          </Pressable>
        </View>
      </Swipeable>
    </View>
  );
};

export default ContainerSeriesView;

// Style Component
const styles = StyleSheet.create({
  containerPanelRight: {
    width: "80%",
    flexDirection: "row",
  },

  container: {
    backgroundColor: ColorsApp.dark_font_3,
    borderColor: ColorsApp.border,
    borderRadius: 5,
    marginVertical: 4,
    marginHorizontal: 2,
    flex: 1 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  subContainer: {
    padding: 10,
    backgroundColor: ColorsApp.body,
    borderColor: ColorsApp.border,
    borderWidth: 2,
  },

  containerTitle: {
    borderBottomWidth: 2,
    borderColor: ColorsApp.bg,
    marginBottom: 7,
  },

  title: {
    color: ColorsApp.light_font,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
  },

  containerTime: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "baseline",
  },

  containerUnit: {
    backgroundColor: ColorsApp.bg,
    borderRadius: 5,
    padding: 5,
  },

  txtTime: {
    color: ColorsApp.light_font,
    textAlign: "center",
  },

  txtTimeSeparator: {
    textAlignVertical: "center",
    paddingHorizontal: 1,
  },

  panelRight: {
    height: "100%",
    width: "100%",
    backgroundColor: ColorsApp.dark_font_3,
    justifyContent: "center",
    alignItems: "center",
    flex: 1 / 2,
    borderColor: ColorsApp.bg,
  },

  panelRightTxt: {
    color: ColorsApp.dark_font_2,
    fontWeight: "bold",
    fontSize: 12,
  },
});
