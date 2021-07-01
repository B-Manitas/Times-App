import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  FlatList,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { avatar, ColorsApp, FontFamily } from "../utils/app_properties";
import ButtonImage from "./ButtonImage";
import { path_icn_finished_bl } from "../utils/app_properties";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserCreator, resetUserCreator } from "../redux/actionCreators";
import { useEffect } from "react";

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
      }).start(() => dispatch(editUserCreator({...userState, is_new:false})));
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
              !isEmptyError ? ColorsApp.font_secs : ColorsApp.destructible
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
        data={avatar}
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
    backgroundColor: ColorsApp.background_,
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
    backgroundColor: ColorsApp.background_secs,
    padding: 30,
  },

  txt_welcome: {
    fontFamily: FontFamily.main,
    color: ColorsApp.font_main,
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
    fontFamily: FontFamily.main,
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
    borderColor: ColorsApp.outline_main,
    padding: 5,
  },

  input_error: {
    borderColor: ColorsApp.destructible,
  },

  input_txt: {
    fontFamily: FontFamily.main,
    color: ColorsApp.font_secs,
  },

  btn_img_user: {
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 64,
  },

  btn_img_user_active: {
    borderColor: ColorsApp.cta,
  },

  btn_next: {
    backgroundColor: ColorsApp.background_secs,
    position: "absolute",
    right: 20,
    bottom: 20,
    borderColor: ColorsApp.cta,
    borderWidth: 3,
    borderRadius: 64,
    padding: 8,
  },

  txt_requiered: {
    color: ColorsApp.destructible,
    marginHorizontal: 20,
    marginVertical: 3,
  },
});
