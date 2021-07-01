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

// Import Functions.
import { editUserCreator } from "../redux/actionCreators";

// Import Constants.
import { AVATAR, path_icn_finished_bl } from "../utils/ConstantImages";
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const PanelWelcome = () => {
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
        <View style={styles.ctn_sub}>
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
        </View>

        <Text style={[styles.txt_label, styles.txt_label_img]}>
          Profile picture
        </Text>
      </View>
    );
  }, [isEmptyError, userState]);

  const render = useCallback((item) => {
    return (
      <ButtonImage
        path={item.path}
        action={() => setUserState((p) => [{ ...p, img_profile: item.key }][0])}
        key={item.key}
        is_cheched={item.key == userState.img_profile}
        style={styles.btn_img_user}
        style_active={styles.btn_img_user_active}
        size={64}
      />
    );
  });

  const Footer = useCallback(() => {
    return (
      <ButtonImage
        style={styles.btn_next}
        size={24}
        path={path_icn_finished_bl}
        action={onPressValid}
      />
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
        contentContainerStyle={styles.ctn_sub}
        data={AVATAR}
        renderItem={({ item }) => render(item)}
        numColumns={4}
        keyExtractor={(item, index) => index}
      />
      <Footer />
    </Animated.View>
  );
};

export default PanelWelcome;

const styles = StyleSheet.create({
  ctn_flex: {
    flexDirection: "row",
    marginVertical: 10,
  },

  ctn_main: {
    position: "absolute",
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS_APP.background,
    zIndex: 2,
  },

  ctn_panel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    height: "80%",
    backgroundColor: COLORS_APP.background_secs,
    padding: 30,
  },

  txt_welcome: {
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
    fontSize: 35,
    textAlign: "center",
    marginTop: "10%",
  },

  ctn_sub: {
    marginVertical: 10,
  },

  ctn_user_img: {
    flexDirection: "row",
    justifyContent: "center",
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

  btn_img_user_active: {
    borderColor: COLORS_APP.cta,
  },

  btn_next: {
    backgroundColor: COLORS_APP.background_secs,
    position: "absolute",
    right: 20,
    bottom: 20,
    borderColor: COLORS_APP.cta,
    borderWidth: 3,
    borderRadius: 64,
    padding: 8,
  },

  txt_requiered: {
    color: COLORS_APP.destructible,
    marginHorizontal: 20,
    marginVertical: 3,
  },
});
