// Import Librairies.
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import LabelContainer from "../components/LabelContainer";
import ButtonImage from "../components/ButtonImage";
import Footer from "../components/Footer";
import PanelWelcome from "../components/PanelWelcome";
import SeriesFieldView from "../components/SeriesFieldView";
import SplashScreen from "../components/SplashScreen";

// Import Function.
import {
  getWelcomeTxt,
  isEmpty,
  getRandUID,
  setOrient,
} from "../scripts/index";
import {
  addWorkoutCreator,
  editWorkoutCreator,
  removeWorkoutCreator,
  resetUserCreator,
  resetWorkoutCreator,
} from "../redux/actionCreators";

// Import Constants.
import {
  AVATAR,
  path_icn_home_wh,
  path_icn_settings_wh,
  path_icn_store_wh,
  path_icn_toolbox_wh,
} from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";
import { TouchableOpacity } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const EmptyComponent = () => {
  const icn_empty = require("../../assets/icon/icn_empty.png");

  return (
    <View style={styles.ctn_empty}>
      <Image style={styles.img_empty} source={icn_empty} />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  // Set the orientation to portrait.
  setOrient();

  const workoutStore = useSelector((state) => state.workouts);
  const userStore = useSelector((state) => state.user);

  const [showSplash, setShowSplash] = useState(true);

  const dispatch = useDispatch();

  const today = new Date();
  const workouts_today = workoutStore.filter(
    (workout) => workout.days[today.getDay() - 1]
  );

  return (
    <ContainerPage>
      {false && showSplash && <SplashScreen setShowSplash={setShowSplash} />}
      {userStore.is_new && <PanelWelcome />}
      <View style={styles.ctn_header}>
        <Text
          style={[styles.txt_header]}
          adjustsFontSizeToFit={true}
          numberOfLines={3}
        >
          {getWelcomeTxt()},{"\n"}
          {userStore.username} !
        </Text>
        <ButtonImage
          onPress={alertReset}
          path={AVATAR[userStore.img_profile].path}
          size={64}
        />
        <View style={styles.separator} />
      </View>

      <View style={styles.ctn_body}>
        {workouts_today.length > 0 && (
          <View>
            <LabelContainer text={"For today"} size={20} />
            <FlatList
              data={workouts_today}
              renderItem={({ item }) => (
                <SeriesFieldView
                  onPressEdit={editWorkout}
                  onPressRemove={removeWorkout}
                  onPressTimer={openTimer}
                  workout={item}
                  horizontal={true}
                />
              )}
              keyExtractor={(item) => item.uid}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        <LabelContainer text={"Workout List"} size={22} />

        <FlatList
          data={workoutStore}
          renderItem={({ item, index }) => (
            <SeriesFieldView
              onPressRemove={removeWorkout}
              onPressEdit={editWorkout}
              onPressTimer={openTimer}
              workout={item}
              workouts_len={workoutStore.length}
              index={index}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={styles.ctn_content}
          ListEmptyComponent={() => <EmptyComponent />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Footer functionAdd={addWorkout}/>
    </ContainerPage>
  );

  // Define onPress function.
  /** Add a new workout in the redux store */
  function addWorkout() {
    const newId = "_" + getRandUID();
    dispatch(addWorkoutCreator(newId));
    navigation.navigate("Edit", { workout_UID: newId });
  }

  /** Open the edit page. */
  function editWorkout(workoutUID) {
    navigation.navigate("Edit", { workout_UID: workoutUID });
  }

  /** Remove the workout in the redux store. Show an alert to prevent the user. */
  function removeWorkout(workoutUID) {
    Alert.alert(
      "Are your sure ?",
      "You will not be able to recover this workout.",
      [
        {
          text: "Yes, delete it !",
          onPress: () => dispatch(removeWorkoutCreator(workoutUID)),
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  }

  /**Open the timer page of the workout. */
  function openTimer(workout) {
    if (!isEmpty(workout))
      navigation.navigate("Timer", { workout_UID: workout.uid });
    else
      Alert.alert(
        "Incomplete workout",
        "Please complete all exercise fields before starting the workout.",
        [
          {
            text: "Fill workout",
            onPress: () =>
              navigation.navigate("Edit", { workout_UID: workout.uid }),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
  }

  function alertReset() {
    Alert.alert("Reset Application", "Do you want to reset the application ?", [
      {
        text: "Reset",
        onPress: reset,
        style: "destructive",
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function reset() {
    dispatch(resetUserCreator());
    dispatch(resetWorkoutCreator());
    setShowSplash(true);
  }
};

export default HomeScreen;

// Style Component
const styles = StyleSheet.create({
  ctn_header: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 18,
    justifyContent: "space-between",
    marginBottom: 20,
  },

  txt_header: {
    fontSize: 25,
    fontWeight: "900",
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.font_main,
    width: "75%",
  },

  separator: {
    backgroundColor: COLORS_APP.font_main,
    position: "absolute",
    bottom: 12,
    left: 18,
    width: "75%",
    marginTop: 10,
    height: 3,
    borderRadius: 10,
  },

  ctn_body: {
    height: "72%",
    marginHorizontal: 20,
  },

  ctn_empty: {
    marginTop: 80,
    justifyContent: "center",
    alignSelf: "center",
  },

  ctn_content: {
    justifyContent: "center",
    paddingBottom: 20,
  },

  img_empty: {
    width: 150,
    height: 150,
    opacity: 0.8,
  },
});
