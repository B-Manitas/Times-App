import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import Logo from "../components/Logo";
import { ColorsApp, FontFamily } from "../utils/app_properties";
import ButtonCross from "../components/ButtonCross";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import SeriesField from "../components/SeriesField";
import ContainerPage from "../components/ContainerPage";
import {
  onPressCancelAlrtUnsvd,
  onPressSaveWorkout,
  onPressRemoveWorkout,
} from "../scripts/buttonAction";
import HeaderBodyEdit from "../components/HeaderBodyEdit";
import { getID, setOrient } from "../scripts";
import FooterBodyEdit from "../components/FooterBodyEdit";
import { useEffect } from "react";

const EditScreen = ({ navigation, route }) => {
  // Set the orientation to portrait.
  setOrient();

  const workouts_store = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  const id = getID(workouts_store, route.params.workout_UID)
  const [workout, setWorkout] = useState(workouts_store[id]);
  const [showOptions, setShowOptions] = useState(false);
  const [addRest, setAddRest] = useState(true);
  const [isTimer, setIsTimer] = useState(true);
  const [onSave, setOnSave] = useState(false);

  const renderItem = useCallback(
    ({ item }) => (
      <SeriesField
        series_state={item}
        setWorkout={setWorkout}
        default_state_rest={addRest}
        default_state_timer={isTimer}
      />
    ),
    []
  );

  const ListHeaderComponent = useCallback(
    () => (
      <HeaderBodyEdit
        addRest={addRest}
        setAddRest={setAddRest}
        isTimer={isTimer}
        setIsTimer={setIsTimer}
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        workout={workout}
        setWorkout={(v) => setWorkout(v)}
      />
    ),
    [showOptions, workout.days, workout.difficulty]
  );

  const ListFooterComponent = useCallback(
    () => <FooterBodyEdit workout={workout} setWorkout={setWorkout} />,
    [workout]
  );
  const keyExtractor = useCallback((item) => item.uid, []);

  return (
    <ContainerPage style={styles.ctn_main}>
      <View style={styles.ctn_header}>
        <Logo />
        <Text style={styles.txt_header}>Edit your workout</Text>
        <ButtonCross
          action={() => onPressCancelAlrtUnsvd(dispatch, navigation, workout)}
        />
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={"padding"}
        style={styles.ctn_body}
      >
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
      </KeyboardAvoidingView>

      <View style={styles.ctn_footer}>
        <TouchableOpacity
          onPress={() => onPressRemoveWorkout(dispatch, workout.uid, navigation)}
          style={[styles.btn_action, styles.btn_remove]}
        >
          <Text style={[styles.btn_txt_action, styles.btn_txt_remove]}>
            Remove
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressSaveWorkout(navigation, dispatch, workout, setOnSave)}
          style={[styles.btn_action, styles.btn_save]}
        >
          <Text style={[styles.btn_txt_action, styles.btn_txt_save]}>Save</Text>
        </TouchableOpacity>
      </View>
    </ContainerPage>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  ctn_main: {
    flex: 1,
    backgroundColor: ColorsApp.background,
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

  txt_header: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: ColorsApp.light_font,
    fontFamily: FontFamily.main
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
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    paddingVertical: 15
  },

  btn_action: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
  },

  btn_save: {
    backgroundColor: ColorsApp.light_font,
  },

  btn_remove: {
    borderWidth: 2,
  },

  btn_txt_action: {
    fontWeight: "bold",
    fontFamily: FontFamily.main
  },

  btn_txt_remove: {
    color: ColorsApp.light_font,
  },

  btn_txt_save: {
    color: "#fff",
  },
});
