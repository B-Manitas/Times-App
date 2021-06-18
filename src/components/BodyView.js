// Librairies
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom components
import ContainerBody from "./containers/ContainerBody";
import ContainerSeriesView from "./containers/ContainerSeriesView";
import ActionButton from "./ActionButton";
import Subtitle from "./Subtitle";

// Main app properties
import { ColorsApp } from "../utils/app_properties";
import { FlatList } from "react-native-gesture-handler";
import { addWorkoutCreator } from "../redux/actionCreators";
import { EditMode } from "../utils/app_type";

const BodyView = (props) => {
  const workouts = useSelector((state) => state);
  const dispatch = useDispatch();

  const onPressAddWorkout = () => {
    const newId = "_" + Math.random().toString(36).substr(2, 9);
    dispatch(addWorkoutCreator(newId));
    props.switcherMode(EditMode, newId);
  };

  return (
    <ContainerBody>
      <View style={styles.container}>
        <Subtitle text="My timers :" />
        <View style={styles.containerBody}>
          <FlatList
            data={workouts}
            renderItem={({ item }) => (
              <ContainerSeriesView
                workout={item}
                switcherMode={props.switcherMode}
              />
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
    </ContainerBody>
  );
};

export default BodyView;

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
