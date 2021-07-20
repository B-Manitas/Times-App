import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, View, StyleSheet } from "react-native";

import ContainerPage from "../components/ContainerPage";
import HeaderBack from "../components/HeaderBack";
import TextField from "../components/TextField";
import LabelContainer from "../components/LabelContainer";
import { getID } from "../scripts";

const PublicationScreen = ({ navigation, route }) => {
  const workouts_store = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  const id = getID(workouts_store, route.params.workout_UID);
  const [workout, setWorkout] = useState(workouts_store[id]);

  return (
    <ContainerPage>
      <HeaderBack navigation={navigation.goBack} text={"Publication"} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.ctn_main}>
        <LabelContainer size={18} text={"Information"} />
        <TextField
          key_text={"description"}
          multiline={true}
          max_len={300}
          txt_placeholder={"Your training advice here."}
          onChange={(v) => setWorkout((p) => ({ ...p, description: v }))}
          value={workout.description}
          autoCorrect={true}
          editable={workout.is_published}
          />
      </ScrollView>
    </ContainerPage>
  );
};

export default PublicationScreen;

const styles = StyleSheet.create({
  ctn_main: {
    marginHorizontal: 20,
  },
});
