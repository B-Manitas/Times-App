// Librairies
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom components

// Main app properties
import { ColorsApp, FontFamily, path_icn_add_wh } from "../utils/app_properties";
import { FlatList } from "react-native-gesture-handler";
import ContainerPage from "../components/ContainerPage";
import { getWelcomeTxt, setOrient } from "../scripts/index";
import { onPressAddWorkout } from "../scripts/buttonAction";
import LabelContainer from "../components/LabelContainer";
import ButtonImage from "../components/ButtonImage";
import SeriesFieldView from "../components/SeriesFieldView";
import ButtonRound from "../components/ButtonRound";

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

  const icn_user = require("../../assets/icon/icn_user_f.png");
  const workouts = useSelector((state) => state.workouts);
  const dispatch = useDispatch();

  const today = new Date();
  const id_current_day = today.getDay() - 1;
  const workouts_today = workouts.filter(
    (workout) => workout.days[id_current_day]
  );

  return (
    <ContainerPage>
      <View style={styles.ctn_header}>
        <Text style={[styles.txt_header]} numberOfLines={2}>
          {getWelcomeTxt()},{"\n"}Adjanie !
        </Text>
        <Image source={icn_user} style={styles.img} />
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

        <View style={styles.ctn_flatlist}>
          <FlatList
            data={workouts}
            renderItem={({ item }) => (
              <SeriesFieldView navigation={navigation} workout={item} />
            )}
            numColumns={2}
            keyExtractor={(item) => item.uid}
            contentContainerStyle={styles.ctn_content}
            ListEmptyComponent={() => <EmptyComponent />}
          />
        </View>
      </View>

      <View style={styles.ctn_footer}>
        {/* <ButtonImage
          path={path_icn_add_wh}
          size={48}
          style={styles.btn_add}
        /> */}
        <ButtonRound 
        action={() => onPressAddWorkout(navigation, dispatch)}
        text={"+"}
        size={48}
        style={styles.btn_add}
        />
      </View>
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
  },

  img: {
    width: 56,
    height: 56,
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
    height: "100%",
    marginHorizontal: 20,
  },

  ctn_flatlist: {
    marginTop: 5,
    height: "75%",
  },

  ctn_empty: {
    marginTop: "10%",
    justifyContent: "center",
    alignSelf: "center",
  },

  ctn_content: {
    justifyContent: "center",
  },

  img_empty: {
    width: 150,
    height: 150,
    opacity: 0.5,
  },

  ctn_footer: {
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    justifyContent: "center",
  },

  btn_txt_new: {
    color: "#fff",
    fontWeight: "bold",
  },

  btn_add: {
    position: "absolute",
    top: -10,
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
