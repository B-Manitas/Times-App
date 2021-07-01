// Librairies
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from "react-native";

// Custom components
import ContainerPage from "../components/ContainerPage";
import FooterBodyEdit from "../components/FooterBodyEdit";
import HeaderBodyEdit from "../components/HeaderBodyEdit";
import SeriesField from "../components/SeriesField";

// Function and app properties
import {
  ColorsApp,
  FontFamily,
  path_icn_remove_wh,
  path_icn_save_wh,
  path_icn_option_wh,
  path_logo_edit,
  path_icn_close_wh,
} from "../utils/app_properties";
import {
  onPressCancelAlrtUnsvd,
  onPressSaveWorkout,
  onPressRemoveWorkout,
} from "../scripts/buttonAction";
import { getID, setOrient } from "../scripts";
import ButtonImage from "../components/ButtonImage";
import OptionsBodyEdit from "../components/OptionsBodyEdit";

const EditScreen = ({ navigation, route }) => {
  // Set the orientation to portrait.
  setOrient();

  const workouts_store = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  const id = getID(workouts_store, route.params.workout_UID);
  const [workout, setWorkout] = useState(workouts_store[id]);
  const [showOptions, setShowOptions] = useState(false);
  const [addRest, setAddRest] = useState(true);
  const [isTimer, setIsTimer] = useState(true);

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

  const ListHeaderComponent = useCallback(
    () => (
      <HeaderBodyEdit
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
        <Image source={path_logo_edit} style={styles.icn_logo} />
        <Text style={styles.txt_header}>Edit your workout</Text>
        <ButtonImage
          path={path_icn_close_wh}
          action={() => onPressCancelAlrtUnsvd(dispatch, navigation, workout)}
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
          <OptionsBodyEdit setWorkout={setWorkout} workout={workout} />
        )}
      </KeyboardAvoidingView>

      <View style={styles.ctn_footer}>
        <ButtonImage
          size={36}
          path={path_icn_remove_wh}
          action={() => onPressRemoveWorkout(dispatch, workout.uid, navigation)}
          style={[styles.btn_action, styles.btn_secs]}
        />
        <View style={styles.ctn_flex}>
          <ButtonImage
            size={36}
            path={path_icn_option_wh}
            style={[styles.btn_action, styles.btn_secs]}
            action={() => setShowOptions(!showOptions)}
          />
          <TouchableOpacity
            onPress={() => onPressSaveWorkout(navigation, dispatch, workout, setWorkout)}
            style={[styles.btn_action, styles.btn_save]}
          >
            <Image
              source={path_icn_save_wh}
              style={{ width: 36, height: 36 }}
            />
            <Text style={[styles.btn_txt_action, styles.btn_txt_save]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ContainerPage>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  ctn_flex: {
    flexDirection: "row",
  },

  ctn_main: {
    flex: 1,
    backgroundColor: ColorsApp.background_,
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
    color: ColorsApp.font_main,
    fontFamily: FontFamily.main,
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
    backgroundColor: ColorsApp.background_,
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
    backgroundColor: ColorsApp.cta,
    justifyContent: "space-between",
    width: 100,
    flexDirection: "row",
  },

  btn_secs: {
    backgroundColor: ColorsApp.background_third,
    width: 50,
    height: 60,
  },

  btn_txt_action: {
    fontWeight: "bold",
    fontFamily: FontFamily.main,
  },

  btn_txt_remove: {
    color: ColorsApp.logo,
  },

  btn_txt_save: {
    color: "#fff",
  },
});
