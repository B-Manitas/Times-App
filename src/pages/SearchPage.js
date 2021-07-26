// Import Librairies.
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Keyboard,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Import Function.
import { getPlaceholderText } from "../scripts";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WorkoutFieldSearchView from "../components/WorkoutFieldSearchView";

// Import Constants.
import { SEARCH } from "../utils/ConstantPage";
import { ICON, LOGO } from "../utils/ConstantImages";
import { COLORS_APP } from "../utils/ConstantColors";
import { JSB } from "../utils/ConstantKey";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import TextTraduction from "../components/TextTraduction";

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
        <TextTraduction
          style={styles.txt_empty}
          key_text={"no_workout_found"}
        />
      </View>
    );
};

const SearchPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [workoutList, setWorkoutList] = useState([]);
  const user_store = useSelector((state) => state.user);

  // Create the http request.
  let req = new XMLHttpRequest();
  req.open("GET", "https://api.jsonbin.io/v3/b/" + tag + "/latest");

  // Define the header of the requests.
  req.setRequestHeader("X-Master-Key", JSB);
  req.setRequestHeader("X-Bin-Meta", false);

  // Wait for a response from the server.
  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        setWorkoutList([JSON.parse(req.response)]);
      }
      setIsSent(false);
    }
  };

  return (
    <ContainerPage>
      <Header key_text={"search_workout"} path_img={LOGO.search} />

      <View style={styles.ctn_search}>
        <TextInput
          placeholder={getPlaceholderText(
            user_store.language,
            "search_workout"
          )}
          autoCorrect={false}
          autoCapitalize={"none"}
          style={styles.input_search}
          maxLength={128}
          onChangeText={(e) => setTag(e)}
          defaultValue={tag}
          returnKeyType={"search"}
          onSubmitEditing={(e) => search(e)}
        />

        <TouchableOpacity style={styles.ctn_img_search} onPress={clear}>
          <Image source={ICON.white.close} style={styles.img_search} />
        </TouchableOpacity>
      </View>

      <FlatList
        refreshing={true}
        style={styles.ctn_main}
        data={workoutList}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <WorkoutFieldSearchView
            navigation={navigation}
            workout={item}
            language={user_store.language}
          />
        )}
        ListEmptyComponent={() => Empty(!isSent && isInitial)}
      />

      <Footer
        dispatch={dispatch}
        navigation={navigation}
        current_key_active={SEARCH}
      />
    </ContainerPage>
  );

  /** Clear the search bar. */
  function clear() {
    setTag("");
    setIsInitial(true);
    setWorkoutList([]);
  }
  
  /** Search workout in the server. */
  function search() {
    setIsSent(true);
    setIsInitial(false);
    setWorkoutList([]);
    setTag(tag.toLowerCase());
    Keyboard.dismiss();
    if (!isSent) req.send();
  }
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
