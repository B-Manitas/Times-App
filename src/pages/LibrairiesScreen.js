// Import Librairies.
import React from "react";
import { useDispatch } from "react-redux";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LibrairiesWorkout from "../components/LibrairiesWorkout";

// Import Constants.
import { ICON } from "../utils/ConstantImages";
import { LIBRAIRIES } from "../utils/ConstantPage";
import { STORE } from "../utils/ConstantStore";
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const LibrairiesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <ContainerPage>
      <Header path_img={ICON.white.store} key_text={"store"} />

      <FlatList
        maxToRenderPerBatch={5}
        data={STORE}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <LibrairiesWorkout navigation={navigation} workout={item} />
        )}
      />

      <Footer
        dispatch={dispatch}
        navigation={navigation}
        current_key_active={LIBRAIRIES}
      />
    </ContainerPage>
  );
};

export default LibrairiesScreen;

const styles = StyleSheet.create({
  ctn_header: {
    padding: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  ctn_workout: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: COLORS_APP.background_secs,
    height: 100,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },

  ctn_workout_header: {
    flexDirection: "row",
  },

  txt_workout_header: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_third,
    textDecorationLine: "underline",
    flex: 1,
  },

  ctn_info: {
    flexDirection: "row",
  },

  ctn_info_sub: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    padding: 5,
  },

  txt_info: {
    color: COLORS_APP.font_secs,
  },

  info_img: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
});
