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
import { ICON, LOGO } from "../utils/ConstantImages";
import { LIBRAIRIES } from "../utils/ConstantPage";
import { STORE } from "../utils/ConstantStore";
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { RefreshControl } from "react-native";
import { useState } from "react";
import { useCallback } from "react";
import { JSB, JSBLB } from "../utils/ConstantKey";
import { useEffect } from "react";

const LibrairiesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [workoutsList, setWorkoutsList] = useState(STORE);
  const [metaList, setMetaList] = useState([]);

  let last_bins_id = "";

  let req_meta = new XMLHttpRequest();
  req_meta.open("GET", "https://api.jsonbin.io/v3/c/" + JSBLB + "/bins", true);
  req_meta.setRequestHeader("X-Master-Key", JSB);

  req_meta.onreadystatechange = () => {
    if (req_meta.readyState === XMLHttpRequest.DONE) {
      let json_response_arr = JSON.parse(req_meta.response);
      if (req_meta.status === 200) {
        setMetaList(json_response_arr);
        last_bins_id =
          "/" + json_response_arr[json_response_arr.length - 1]["record"];
      }
      // console.log("last_bin", last_bins_id);
      // console.log("json_arr_1", json_response_arr);
      // setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    if (!refreshing) {
      setRefreshing(true);
      req_meta.send();

      for (var i = 0; i < metaList.length; i++) {
        let id = metaList[i]["record"];
        let req_workout = new XMLHttpRequest();

        req_workout.open(
          "GET",
          "https://api.jsonbin.io/v3/b/" + id + "/latest",
          true
        );
        req_workout.setRequestHeader("X-Master-Key", JSB);
        req_workout.setRequestHeader("X-Bin-Meta", false);
        req_workout.send();

        req_workout.onreadystatechange = () => {
          if (req_workout.readyState === XMLHttpRequest.DONE) {
            let json_response_arr = JSON.parse(req_workout.response);
            if (req_workout.status === 200)
              setWorkoutsList((p) => [...p, json_response_arr[0]]);

            // console.log("json_arr_2", json_response_arr);
          }
        };

        if (i == metaList.length - 1) {
          setRefreshing(false);
        }
      }
    }
  });

  // console.log("list", workoutsList);
  return (
    <ContainerPage>
      <Header path_img={LOGO.bookstore} text={"Public Library"} />

      <FlatList
        maxToRenderPerBatch={5}
        data={workoutsList}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <LibrairiesWorkout navigation={navigation} workout={item} />
        )}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
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
