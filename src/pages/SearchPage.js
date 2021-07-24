import React from "react";
import { useDispatch } from "react-redux";

import { View, StyleSheet, Image, Text } from "react-native";

import ContainerPage from "../components/ContainerPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TextField from "../components/TextField";

import { LIBRAIRIES, SEARCH } from "../utils/ConstantPage";
import { ICON, LOGO } from "../utils/ConstantImages";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { COLORS_APP } from "../utils/ConstantColors";
import { useState } from "react";
import { useCallback } from "react";
import { JSB } from "../utils/ConstantKey";
import WorkoutFieldSearchView from "../components/WorkoutFieldSearchView";
import { STORE } from "../utils/ConstantStore";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { Keyboard } from "react-native";
import LabelContainer from "../components/LabelContainer";

const Empty = (is_initial) => {
  if (is_initial)
    return (
      <View style={styles.ctn_empty}>
        <Image style={styles.img_empty} source={LOGO.empty} />
      </View>
    );
  else
    return (
      <View style={styles.ctn_empty}>
        <Image style={styles.img_empty} source={LOGO.error} />
        <Text style={styles.txt_empty}>No workout was found.</Text>
      </View>
    );
};

const SearchPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);

  let req = new XMLHttpRequest();
  req.open(
    "GET",
    "https://api.jsonbin.io/v3/b/" + tag.toLowerCase() + "/latest"
  );
  req.setRequestHeader("X-Master-Key", JSB);
  req.setRequestHeader("X-Bin-Meta", false);

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        setWorkoutList([JSON.parse(req.response)]);
      }
      setRefreshing(false);
      console.log(req.responseText);
    }
  };

  const search = useCallback(() => {
    setRefreshing(true);
    Keyboard.dismiss();
    req.send();
  });

  return (
    <ContainerPage>
      <Header text={"Search workout"} path_img={LOGO.search} />

      <View style={styles.ctn_search}>
        <TextInput
          placeholder={"Enter a workout tag"}
          autoCorrect={false}
          autoCapitalize={"none"}
          style={styles.input_search}
          maxLength={128}
          onEndEditing={(e) => {
            setTag(e.nativeEvent.text);
            search;
          }}
          defaultValue={tag}
          returnKeyType={"search"}
          onSubmitEditing={search}
        />

        <TouchableOpacity style={styles.ctn_img_search} onPress={search}>
          <Image source={ICON.white.search} style={styles.img_search} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.ctn_main}
        refreshing={refreshing}
        data={workoutList}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <WorkoutFieldSearchView navigation={navigation} workout={item} />
        )}
        ListEmptyComponent={() => Empty(tag == "" && workoutList)}
      />

      <Footer
        dispatch={dispatch}
        navigation={navigation}
        current_key_active={SEARCH}
      />
    </ContainerPage>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  ctn_main: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 10,
  },

  ctn_search: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 30,
  },

  ctn_img_search: {
    borderColor: COLORS_APP.background,
    backgroundColor: COLORS_APP.background_third,
    borderWidth: 2,
    marginLeft: -3,
    paddingVertical: 9,
    paddingHorizontal: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input_search: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: COLORS_APP.outline_third,
    color: COLORS_APP.font_third,
    fontFamily: FONT_FAMILY.main,
  },

  img_search: {
    width: 24,
    height: 24,
  },

  ctn_empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 50,
  },

  img_empty: {
    width: 200,
    height: 200,
  },

  txt_empty: {
    marginVertical: 10,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
    fontSize: 20,
  },
});
