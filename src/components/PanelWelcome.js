// Import Libraries.
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Import Customs Components.
import ButtonImage from "./ButtonImage";
import RadioList from "./RadioList";

// Import Functions.
import { editUserCreator } from "../redux/actionCreators";

// Import Constants.
import { AVATAR, ICON } from "../utils/ConstantImages";
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import ButtonText from "./ButtonText";
import { LEGAL } from "../utils/ConstantPage";

const PanelWelcome = ({ navigation }) => {
  const languages = ["En", "Fr"];

  const user_store = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userState, setUserState] = useState(user_store);
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  let y = new Animated.Value(0);

  const onPressValid = () => {
    if (userState.username == "") setIsEmptyError(true);
    else {
      setIsEmptyError(false);
      dispatch(editUserCreator(userState));
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!isVisible) {
      Animated.spring(y, {
        toValue: Dimensions.get("screen").height,
        useNativeDriver: true,
      }).start(() =>
        dispatch(editUserCreator({ ...userState, is_new: false }))
      );
    }
  }, [isVisible]);

  const Header = useCallback(() => {
    return (
      <View>
        <View style={styles.ctn_user_info}>
          <Text style={styles.txt_label}>User information</Text>
          <TextInput
            onEndEditing={(e) =>
              setUserState((p) => [{ ...p, username: e.nativeEvent.text }][0])
            }
            defaultValue={userState.username}
            placeholder={"* Username"}
            style={[styles.input_username, isEmptyError && styles.input_error]}
            placeholderTextColor={
              !isEmptyError ? COLORS_APP.font_secs : COLORS_APP.destructible
            }
            maxLength={13}
          />

          <View style={styles.ctn_sub_section}>
            <Text style={styles.sub_label}>Language</Text>
            <View style={styles.ctn_obj}>
              <RadioList
                add_border={true}
                items={languages}
                current_checked={userState.language}
                onChange={(t) => setUserState((p) => ({ ...p, language: t }))}
              />
            </View>
          </View>
        </View>

        <Text style={[styles.txt_label, styles.txt_label_img]}>
          Profile picture
        </Text>
      </View>
    );
  }, [isEmptyError, userState]);

  const render = useCallback((item, index) => {
    return (
      <ButtonImage
        path={item.path}
        onPress={() => setUserState((p) => [{ ...p, img_profile: index }][0])}
        key={index}
        is_cheched={index == userState.img_profile}
        style={styles.btn_img_user}
        size={64}
      />
    );
  });

  const Footer = useCallback(() => {
    return (
      <View style={styles.ctn_footer}>
        <Text style={styles.txt_footer}>
          By continuing, you accept{" "}
          <ButtonText
            language={user_store.language}
            text={"the terms of use"}
            onPress={() => navigation.navigate(LEGAL)}
          />{" "}
          of the application.
        </Text>
        <ButtonImage
          style={styles.btn_next}
          size={26}
          path={ICON.black.finished}
          onPress={onPressValid}
        />
      </View>
    );
  }, [userState]);

  return (
    <Animated.View
      style={[styles.ctn_main, { transform: [{ translateY: y }] }]}
    >
      <Text style={styles.txt_welcome}>Welcome</Text>

      <FlatList
        style={styles.ctn_panel}
        ListHeaderComponent={Header}
        ListHeaderComponentStyle={styles.ctn_header}
        contentContainerStyle={styles.ctn_profile_picture}
        data={AVATAR}
        renderItem={({ item, index }) => render(item, index)}
        numColumns={4}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />
      <Footer />
    </Animated.View>
  );
};

export default PanelWelcome;

const styles = StyleSheet.create({
  ctn_main: {
    position: "absolute",
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS_APP.background,
    zIndex: 2,
  },

  ctn_panel: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    backgroundColor: COLORS_APP.background_secs,
    marginTop: 30,
    paddingHorizontal: 30,
  },

  txt_welcome: {
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
    fontSize: 35,
    textAlign: "center",
    marginTop: "10%",
  },

  ctn_header: {
    paddingTop: 30,
    paddingBottom: 0,
  },

  ctn_sub_section: {
    marginHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  ctn_user_info: {
    marginVertical: 5,
  },

  ctn_profile_picture: {
    paddingBottom: 100,
  },

  ctn_obj: {
    flex: 1,
  },

  sub_label: {
    flex: 1,
  },

  txt_label: {
    fontFamily: FONT_FAMILY.main,
    fontSize: 20,
    marginBottom: 10,
  },

  txt_label_img: {
    marginTop: 25,
    marginBottom: 15,
  },

  input_username: {
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: COLORS_APP.outline_main,
    padding: 5,
  },

  input_error: {
    borderColor: COLORS_APP.destructible,
  },

  input_txt: {
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_secs,
  },

  btn_img_user: {
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 64,
  },

  ctn_footer: {
    backgroundColor: COLORS_APP.background_secs,
    position: "absolute",
    bottom: 0,
    paddingTop: 10,
    paddingBottom: 20,
    right: 0,
    left: 0,
    paddingHorizontal: 25,
  },

  txt_footer: {
    width: "80%",
  },

  btn_next: {
    position: "absolute",
    top: 10,
    right: 20,
    borderWidth: 3,
    borderRadius: 64,
    borderColor: COLORS_APP.cta,
    padding: 8,
  },
});
