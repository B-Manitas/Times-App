// Librairies
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom components

// Main app properties
import {
  avatar,
  ColorsApp,
  FontFamily,
  path_icn_add_wh,
} from "../utils/app_properties";
import { FlatList } from "react-native-gesture-handler";
import ContainerPage from "../components/ContainerPage";
import { getWelcomeTxt, setOrient } from "../scripts/index";
import { onPressAddWorkout } from "../scripts/buttonAction";
import LabelContainer from "../components/LabelContainer";
import ButtonImage from "../components/ButtonImage";
import SeriesFieldView from "../components/SeriesFieldView";
import ButtonRound from "../components/ButtonRound";
import PanelMusic from "../components/PanelMusic";
import { useState } from "react";
import { resetUserCreator } from "../redux/actionCreators";
import PanelWelcome from "../components/PanelWelcome";

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

  // const icn_user = require("../../assets/icon/icn_user_0.png");
  const workouts = useSelector((state) => state.workouts);
  const user_states = useSelector((state) => state.user[0]);

  // const [userState, setUserState] = useState(user_states)

  const dispatch = useDispatch();
  // dispatch(resetUserCreator())

  const today = new Date();
  const id_current_day = today.getDay() - 1;
  const workouts_today = workouts.filter(
    (workout) => workout.days[id_current_day]
  );

  return (
    <ContainerPage>
      {user_states.is_new && <PanelWelcome/>}
      <View style={styles.ctn_header}>
        <Text style={[styles.txt_header]} adjustsFontSizeToFit={true} numberOfLines={3}>
          {getWelcomeTxt()},{"\n"}
          {user_states.username} !
        </Text>
        <ButtonImage path={avatar[user_states.img_profile].path} size={64} />
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
                  navigation={navigation}
                  workout={item}
                  horizontal={true}
                />
              )}
              keyExtractor={(item) => item.uid}
              horizontal={true}
            />
          </View>
        )}
        <LabelContainer text={"Workout List"} size={22} />

        <FlatList
          data={workouts}
          renderItem={({ item, index }) => (
            <SeriesFieldView
              navigation={navigation}
              workout={item}
              workouts_len={workouts.length}
              index={index}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={styles.ctn_content}
          ListEmptyComponent={() => <EmptyComponent />}
        />
      </View>
      <ButtonRound
        action={() => onPressAddWorkout(navigation, dispatch)}
        text={"+"}
        size={56}
        style={styles.btn_add}
      />
      {/* <TouchableOpacity onPress={() => {dispatch(resetUserCreator())}}>
        <Text>RESET</Text>
      </TouchableOpacity> */}

    </ContainerPage>
  );
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
    color: ColorsApp.font_main,
    fontFamily: FontFamily.font_main,
    width: "75%"
  },

  separator: {
    backgroundColor: ColorsApp.font_main,
    position: "absolute",
    bottom: 12,
    left: 18,
    width: "75%",
    marginTop: 10,
    height: 3,
    borderRadius: 10,
  },

  btn_settings: {
    position: "absolute",
    right: 0,
    padding: 30,
  },

  icn_settings: {
    width: 30,
    height: 30,
  },

  ctn_body: {
    height: "72%",
    marginHorizontal: 20,
  },

  ctn_flatlist: {
    marginTop: 5,
    height: "75%",
  },

  ctn_empty: {
    marginTop: 80,
    justifyContent: "center",
    alignSelf: "center",
  },

  ctn_content: {
    justifyContent: "center",
  },

  img_empty: {
    width: 150,
    height: 150,
    opacity: 0.8,
  },

  btn_add: {
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: ColorsApp.background_,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    backgroundColor: ColorsApp.cta,
    borderWidth: 0,
  },
});
