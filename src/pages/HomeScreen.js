// Librairies
import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";


// Custom components
import ContainerSeriesView from "../components/containers/ContainerSeriesView";
import ActionButton from "../components/ActionButton";
import Subtitle from "../components/Subtitle";

// Main app properties
import { ColorsApp } from "../utils/app_properties";
import { FlatList } from "react-native-gesture-handler";
import { addWorkoutCreator } from "../redux/actionCreators";
import ContainerPage from "../components/containers/ContainerPage";
import { orientToPortrait } from "../scripts";

const HomeScreen = ({navigation}) => {
  const workouts = useSelector((state) => state);
  const dispatch = useDispatch();
  orientToPortrait();

  const onPressAddWorkout = () => {
    const newId = "_" + Math.random().toString(36).substr(2, 9);
    dispatch(addWorkoutCreator(newId));
    navigation.navigate("Edit", {workout_UID:newId})
  };

  return (
    <ContainerPage>
      <View style={styles.container}>
        <Subtitle text="My timers :" />
        <View style={styles.containerBody}>
          <FlatList
            data={workouts}
            renderItem={({ item }) => (
              <ContainerSeriesView navigation={navigation} workout={item} />
            )}
            numColumns={2}
            keyExtractor={(item) => item.id}
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
      <View style={styles.containerButton}>
        <ActionButton text="+ New" action={() => onPressAddWorkout()} />
      </View>
    </ContainerPage>
  );
};

export default HomeScreen;

// Style Component
const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: 20,
    marginTop: 30,
  },

  title: {
    fontSize: 25,
    color: ColorsApp.light_font,
    textDecorationLine: "underline",
  },

  containerBody: {
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
  },

  containerButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
  },
});
