// Import Librairies.
import React from "react";
import { StyleSheet, View } from "react-native";

// Import Customs Components.
import ButtonRound from "../components/ButtonRound";
import ButtonFooter from "./ButtonFooter";

// Import Constants.
import { ICON } from "../utils/ConstantImages";
import { COLORS_APP } from "../utils/ConstantColors";
import { EDIT, HOME, LIBRAIRIES, MORE, SEARCH, TOOLS } from "../utils/ConstantPage";
import { getRandUID } from "../scripts";
import { addWorkoutCreator } from "../redux/actionCreators";

const Footer = ({ navigation, dispatch, current_key_active = HOME }) => {
  let flex_number = 1 / 6;

  return (
    <View style={styles.ctn}>
      <ButtonFooter
        navigation={navigation}
        screen={HOME}
        button_flex={flex_number}
        active={HOME === current_key_active}
        key_text={"home"}
        path_image={ICON.white.home}
      />
      <ButtonFooter
        navigation={navigation}
        screen={TOOLS}
        button_flex={flex_number}
        active={TOOLS === current_key_active}
        key_text={"tools"}
        path_image={ICON.white.toolbox}
      />
      <ButtonFooter
        navigation={navigation}
        screen={SEARCH}
        button_flex={flex_number}
        active={SEARCH === current_key_active}
        key_text={"store"}
        path_image={ICON.white.search}
      />
      <ButtonFooter
        navigation={navigation}
        screen={MORE}
        button_flex={flex_number}
        active={MORE === current_key_active}
        key_text={"more"}
        path_image={ICON.white.more}
      />
      <ButtonRound
        onPress={addWorkout}
        text={"+"}
        size={52}
        size_ctn={76}
        container_style={styles.ctn_btn_add}
        style={styles.btn_add}
      />
    </View>
  );

  /** Add a new workout in the redux store */
  function addWorkout() {
    const newId = "_" + getRandUID();
    dispatch(addWorkoutCreator(newId));
    navigation.navigate(EDIT, { workout_UID: newId });
  }
};

export default Footer;

const styles = StyleSheet.create({
  ctn: {
    backgroundColor: COLORS_APP.background,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    flexDirection: "row",
    borderTopWidth: 2,
    borderColor: COLORS_APP.outline_forth,
  },

  ctn_btn_add: {
    position: "absolute",
    bottom: 25,
    right: 20,
  },

  btn_add: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    backgroundColor: COLORS_APP.cta,
    borderWidth: 0,
    zIndex: 2,
  },
});
