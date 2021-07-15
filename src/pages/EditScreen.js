// Import Librairies
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

// Import Custom components.
import ButtonImage from "../components/ButtonImage";
import ContainerPage from "../components/ContainerPage";
import FooterBodyEdit from "../components/FooterBodyEdit";
import HeaderBodyEdit from "../components/HeaderBodyEdit";
import SeriesField from "../components/SeriesField";
import OptionsBodyEdit from "../components/OptionsBodyEdit";

// Import Functions
import {
  allAreEmpty,
  getID,
  isValidHour,
  schedulePushNotification,
  setOrient,
  getRandUID,
} from "../scripts";
import {
  editWorkoutCreator,
  removeWorkoutCreator,
} from "../redux/actionCreators";

// Import Constants
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { ICON, LOGO } from "../utils/ConstantImages";
import { seriesState } from "../redux/state";

const EditScreen = ({ navigation, route }) => {
  // Set the orientation to portrait.
  setOrient();

  const workouts_store = useSelector((state) => state.workouts);
  const user_store = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = getID(workouts_store, route.params.workout_UID);
  const [workout, setWorkout] = useState(workouts_store[id]);
  const [user, setUser] = useState(user_store);
  const [showOptions, setShowOptions] = useState(false);

  const ListHeaderComponent = useCallback(
    () => (
      <HeaderBodyEdit workout={workout} setWorkout={(v) => setWorkout(v)} />
    ),
    [showOptions, workout.days, workout.difficulty]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <SeriesField
        series_state={item}
        setWorkout={setWorkout}
        state_rest={item.rest}
      />
    ),
    []
  );

  const ListFooterComponent = useCallback(
    () => <FooterBodyEdit onPressAddSeries={addSeries} />,
    [workout]
  );

  const keyExtractor = useCallback((item) => item.uid, []);

  return (
    <ContainerPage style={styles.ctn_main}>
      <View style={styles.ctn_header}>
        <Image source={LOGO.edit} style={styles.icn_logo} />
        <Text style={styles.txt_header}>Edit your workout</Text>
        <ButtonImage
          path={ICON.white.close}
          onPress={alertUnsaved}
          size={36}
          style={styles.btn_close}
        />
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={"padding"}
        style={styles.ctn_body}
      >
        {!showOptions ? (
          <FlatList
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            contentContainerStyle={{ paddingBottom: 150 }}
            extraData={workout}
            data={workout.series}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <OptionsBodyEdit
            setWorkout={setWorkout}
            workout={workout}
            user={user}
            setUser={setUser}
          />
        )}
      </KeyboardAvoidingView>

      <View style={styles.ctn_footer}>
        <ButtonImage
          size={36}
          path={ICON.white.remove}
          onPress={alertRemove}
          style={[styles.btn_action, styles.btn_secs]}
        />
        <View style={styles.ctn_flex}>
          <ButtonImage
            size={36}
            path={ICON.white.option}
            style={[styles.btn_action, styles.btn_secs]}
            onPress={() => setShowOptions(!showOptions)}
          />
          <TouchableOpacity
            onPress={saveWorkout}
            style={[styles.btn_action, styles.btn_save]}
          >
            <Image source={ICON.white.save} style={{ width: 36, height: 36 }} />
            <Text style={[styles.btn_txt_action, styles.btn_txt_save]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ContainerPage>
  );

  // Define onPress function.
  /** Add a new series in the workout. */
  function addSeries() {
    const uid = getRandUID(16) + "_";

    setWorkout((p) => ({
      ...p,
      series: [...p.series, seriesState(uid)],
    }));
  }

  /** Show an alert if the workout wasn't be saved. */
  function alertUnsaved() {
    // At less one field is field. And title is filled.
    if (!allAreEmpty(workout)) {
      Alert.alert(
        "Unsaved changes",
        "You are about to leave this page without saving your workout.",
        [
          {
            text: "Leave",
            onPress: () => navigation.navigate("Home"),
            style: "destructive",
          },
          { text: "Stay", style: "cancel" },
        ]
      );
    } else removeWorkout();
  }

  /** Show before to remove the workout. */
  function alertRemove() {
    Alert.alert(
      "Are your sure ?",
      "You will not be able to recover this workout.",
      [
        {
          text: "Yes, delete it !",
          onPress: removeWorkout,
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  }

  /** Save workout to redux store. Then, back to homepage. */
  function saveWorkout() {
    if (
      workout.notification.alert_hour == "" ||
      !isValidHour(workout.notification.alert_hour)
    ) {
      setWorkout((p) => ({
        ...p,
        notification: {
          ...p,
          alert_hour: workoutState.notification.alert_hour,
        },
      }));
    }

    if (workout.notification.is_active && workout.notification.token !== null) {
      const id_days = [2, 3, 4, 5, 6, 7, 1];
      for (let index = 0; index < 6; index++)
        if (workout.days[index])
          schedulePushNotification(
            id_days[index],
            Number(workout.notification.alert_hour),
            0
          );
    }

    dispatch(editWorkoutCreator(workout.uid, workout));
    navigation.navigate("Home");
  }

  /** Remove workout to redux store. Then, back to homepage. */
  function removeWorkout() {
    dispatch(removeWorkoutCreator(workout.uid));
    navigation.navigate("Home");
  }
};

export default EditScreen;

const styles = StyleSheet.create({
  ctn_flex: {
    flexDirection: "row",
  },

  ctn_main: {
    flex: 1,
    backgroundColor: COLORS_APP.background,
    paddingBottom: 75,
  },

  ctn_header: {
    position: "absolute",
    top: 0,
    paddingTop: 20,
    padding: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  icn_logo: {
    width: 64,
    height: 64,
  },

  txt_header: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
  },

  btn_close: {
    position: "absolute",
    right: 0,
    padding: 10,
  },

  ctn_body: {
    width: "90%",
    alignSelf: "center",
    marginTop: 100,
    height: "100%",
  },

  ctn_footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS_APP.background,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    paddingVertical: 15,
  },

  btn_action: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 2,
  },

  btn_save: {
    backgroundColor: COLORS_APP.cta,
    justifyContent: "space-between",
    width: 100,
    flexDirection: "row",
  },

  btn_secs: {
    backgroundColor: COLORS_APP.background_third,
    width: 50,
    height: 60,
  },

  btn_txt_action: {
    fontWeight: "bold",
    fontFamily: FONT_FAMILY.main,
  },

  btn_txt_save: {
    color: "#fff",
  },
});
