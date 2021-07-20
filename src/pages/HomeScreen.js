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
  setOrient,
  getTradText,
} from "../scripts/index";
import {
  addWorkoutCreator,
  removeWorkoutCreator,
} from "../redux/actionCreators";

// Import Constants.
import { AVATAR } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";
import { EDIT, SETTINGS, WORKOUT } from "../utils/ConstantPage";

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

  const [showSplash, setShowSplash] = useState(false);

  const dispatch = useDispatch();

  const today = new Date();
  const workouts_today = workoutStore.filter(
    (workout) => workout.days[(today.getDay() + 6) % 7]
  );

  return (
    <ContainerPage>
      {showSplash && <SplashScreen setShowSplash={setShowSplash} />}
      {userStore.is_new && <PanelWelcome navigation={navigation} />}
      <View style={styles.ctn_header}>
        <Text
          style={[styles.txt_header]}
          adjustsFontSizeToFit={true}
          numberOfLines={3}
        >
          {getTradText(userStore.language, getWelcomeTxt())},{"\n"}
          {userStore.username} !
        </Text>
        <ButtonImage
          onPress={() => navigation.navigate(SETTINGS)}
          path={AVATAR[userStore.img_profile].path}
          size={64}
          style={styles.btn_profile}
        />
        <View style={styles.separator} />
      </View>

      <View style={styles.ctn_body}>
        {workouts_today.length > 0 && (
          <View>
            <LabelContainer key_text={"workout_today"} size={20} />
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
        <LabelContainer key_text={"workout_list"} size={22} />

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
      <Footer navigation={navigation} dispatch={dispatch} />
    </ContainerPage>
  );

  // Define onPress function.
  /** Open the edit page. */
  function editWorkout(workoutUID) {
    navigation.navigate(EDIT, { workout_UID: workoutUID });
  }

  /** Remove the workout in the redux store. Show an alert to prevent the user. */
  function removeWorkout(workoutUID) {
    Alert.alert(
      getTradText(userStore.language, "alert_remove_ttl"),
      getTradText(userStore.language, "alert_remove_body"),
      [
        {
          text: getTradText(userStore.language, "alert_remove_bt1"),
          style: "destructive",
          onPress: () => dispatch(removeWorkoutCreator(workoutUID)),
        },
        {
          text: getTradText(userStore.language, "cancel"),
          style: "cancel",
        },
      ]
    );
  }

  /**Open the timer page of the workout. */
  function openTimer(workout) {
    if (!isEmpty(workout))
      navigation.navigate(WORKOUT, { workout_UID: workout.uid });
    else
      Alert.alert(
        getTradText(userStore.language, "alert_fill_ttl"),
        getTradText(userStore.language, "alert_fill_body"),
        [
          {
            text: getTradText(userStore.language, "alert_fill_btn"),
            onPress: () =>
              navigation.navigate(EDIT, { workout_UID: workout.uid }),
          },
          { text: getTradText(userStore.language, "cancel"), style: "cancel" },
        ]
      );
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

  btn_profile: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
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
