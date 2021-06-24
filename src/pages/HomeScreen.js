// Librairies
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom components
import Logo from "../components/Logo";

// Main app properties
import { ColorsApp, FontFamily } from "../utils/app_properties";
import { FlatList } from "react-native-gesture-handler";
import ContainerPage from "../components/ContainerPage";
import { setOrient } from "../scripts/index";
import { onPressAddWorkout } from "../scripts/buttonAction";
import LabelContainer from "../components/LabelContainer";
import ButtonPlus from "../components/ButtonPlus";
import SeriesFieldView from "../components/SeriesFieldView";

const HomeScreen = ({ navigation }) => {
  // Set the orientation to portrait.
  setOrient();

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
        <Text style={[styles.txt_header]} numberOfLines={1}>
          Good Afternoon, Adjanie !
        </Text>
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
        <LabelContainer text={"My workout"} size={20} />
        <View style={styles.ctn_flatlist}>
          <FlatList
            data={workouts}
            renderItem={({ item }) => (
              <SeriesFieldView navigation={navigation} workout={item} />
            )}
            numColumns={2}
            keyExtractor={(item) => item.uid}
            ListEmptyComponent={
              <View style={styles.containerEmpty}>
                <Text style={styles.emptyText}>
                  Tap to '+ New' button to create your first workout.
                </Text>
              </View>
            }
          />
        </View>
      </View>

      <View style={styles.ctn_footer}>
        <ButtonPlus
          action={() => onPressAddWorkout(navigation, dispatch)}
          size={50}
          positionX={30}
          positionY={20}
          bg_color={ColorsApp.light_font}
        />
      </View>
    </ContainerPage>
  );
};

export default HomeScreen;

// Style Component
const styles = StyleSheet.create({
  ctn_header: {
    position: "absolute",
    top: 0,
    paddingTop: 20,
    padding: 20,
    flexDirection: "column",
    width: "100%",
    // alignItems: "center",
    paddingLeft: 25,
  },

  txt_header: {
    // borderWidth: 1,
    width: "100%",
    fontSize: 25,
    fontWeight: "bold",
    color: ColorsApp.main,
    fontFamily: FontFamily.main,
  },

  separator: {
    backgroundColor: ColorsApp.light_font,
    position: "absolute",
    bottom: 12,
    left: 10,
    height: 3,
    width: "80%",
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
    // marginTop: 100,
    marginTop: 70,
  },

  ctn_flatlist: {
    marginTop: 5,
    height: "75%",
  },

  containerEmpty: {
    justifyContent: "center",
    marginTop: "30%",
  },

  emptyText: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
    color: ColorsApp.dark_font_3,
    fontFamily: FontFamily.main,
  },

  ctn_footer: {
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },

  btn_txt_new: {
    color: "#fff",
    fontWeight: "bold",
  },
});
