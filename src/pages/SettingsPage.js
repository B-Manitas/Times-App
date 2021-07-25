// Import Librairies.
import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";

// Import Function.
import {
  editUserCreator,
  resetUserCreator,
  resetWorkoutCreator,
} from "../redux/actionCreators";
import TextTraduction from "../components/TextTraduction";
import { getAlertText, getPlaceholderText } from "../scripts";

// Import Customs Components.
import ButtonImage from "../components/ButtonImage";
import ContainerPage from "../components/ContainerPage";
import HeaderBack from "../components/HeaderBack";
import LabelContainer from "../components/LabelContainer";
import RadioList from "../components/RadioList";

// Import Constants.
import { AVATAR, ICON } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";

const SettingsPage = ({ navigation }) => {
  const user_store = useSelector((state) => state.user);
  const [userState, setUserState] = useState(user_store);
  const [visibleModalImgUser, setVisibleModalImgUser] = useState(false);
  const dispatch = useDispatch();
  const languages = ["En", "Fr"];

  let posModalY = new Animated.Value(Dimensions.get("screen").height);

  const changeImgUser = (index) => {
    setVisibleModalImgUser(false);
    setUserState((p) => [{ ...p, img_profile: index }][0]);
  };

  useEffect(() => {
    if (visibleModalImgUser)
      Animated.spring(posModalY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
  }, [visibleModalImgUser]);

  const render = useCallback((item, index) => {
    return (
      <ButtonImage
        path={item.path}
        onPress={() => changeImgUser(index)}
        key={index}
        is_cheched={index == userState.img_profile}
        style={styles.btn_img_user}
        size={64}
      />
    );
  });

  return (
    <ContainerPage>
      <HeaderBack onPress={goBack} key_text={"settings"} />

      <ScrollView>
        <View style={styles.ctn_body}>
          <ButtonImage
            path={AVATAR[userState.img_profile].path}
            size={100}
            style={styles.img_user}
            onPress={() => setVisibleModalImgUser((b) => !b)}
          />
          <View style={styles.ctn_section}>
            <LabelContainer key_text={"user_info"} size={20} />
            <TextInput
              onEndEditing={(e) =>
                setUserState((p) => ({ ...p, username: e.nativeEvent.text }))
              }
              placeholder={getPlaceholderText(user_store.language, "username")}
              placeholderTextColor={COLORS_APP.font_forth}
              style={styles.input}
              defaultValue={userState.username}
              maxLength={13}
            />
          </View>

          <View style={styles.ctn_section}>
            <LabelContainer key_text={"general"} size={20} />
            <View style={styles.ctn_sub_section}>
              <TextTraduction key_text={"language"} style={styles.sub_label} />
              <View style={styles.ctn_obj}>
                <RadioList
                  items={languages}
                  current_checked={userState.language}
                  onChange={(t) => setUserState((p) => ({ ...p, language: t }))}
                />
              </View>
            </View>
            <View style={styles.ctn_sub_section}>
              <TextTraduction
                style={styles.sub_label}
                key_text={"notification"}
                language={user_store.language}
              />
              <Switch
                style={styles.ctn_obj}
                value={userState.notification.is_active}
                onValueChange={(b) =>
                  setUserState((p) => ({
                    ...p,
                    notification: { ...p.notification, is_active: b },
                  }))
                }
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={alertReset}
            style={[styles.btn_reset, styles.ctn_sub_section]}
          >
            <TextTraduction
              language={user_store.language}
              key_text={"reset_btn"}
              style={[styles.sub_label, styles.btn_txt_reset]}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {visibleModalImgUser && (
        <Animated.View
          style={[styles.ctn_fill, { transform: [{ translateY: posModalY }] }]}
        >
          <TouchableOpacity
            onPress={() => setVisibleModalImgUser((b) => !b)}
            style={styles.ctn_fill}
          />

          <View style={styles.ctn_panel}>
            <View style={styles.ctn_panel_header}>
              <Text style={styles.panel_txt_label}>Profile picture</Text>
              <ButtonImage
                onPress={() => setVisibleModalImgUser((b) => !b)}
                path={ICON.black.close}
                style={styles.btn_close}
              />
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={AVATAR}
              renderItem={({ item, index }) => render(item, index)}
              numColumns={4}
              keyExtractor={(item, index) => index}
              contentContainerStyle={styles.ctn_panel_avatar}
            />
          </View>
        </Animated.View>
      )}
    </ContainerPage>
  );

  function goBack() {
    var payload = userState;

    if (userState.username == "")
      payload = { ...userState, username: user_store.username };

    dispatch(editUserCreator(payload));
    navigation.goBack();
  }

  function alertReset() {
    Alert.alert(
      getAlertText(userState.language, "reset_ttl"),
      getAlertText(userState.language, "reset_body"),
      [
        {
          text: getAlertText(userState.language, "reset_btn"),
          onPress: reset,
          style: "destructive",
        },
        {
          text: getAlertText(userState.language, "cancel"),
          style: "cancel",
        },
      ]
    );
  }

  function reset() {
    dispatch(resetUserCreator());
    dispatch(resetWorkoutCreator());
    navigation.goBack();
  }
};

export default SettingsPage;

const styles = StyleSheet.create({
  ctn_header: {
    paddingHorizontal: 10,
    paddingTop: 30,
  },

  img_user: {
    alignSelf: "center",
  },

  img_txt_user: {
    alignSelf: "center",
    marginVertical: 5,
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
  },

  ctn_body: {
    paddingHorizontal: 20,
  },

  ctn_sub_section: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  ctn_section: {
    marginTop: 30,
  },

  input: {
    marginTop: 10,
    marginLeft: 20,
    borderBottomWidth: 2,
    borderColor: COLORS_APP.outline_forth,
    padding: 5,
    color: COLORS_APP.font_main,
  },

  sub_label: {
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
    flex: 1,
    fontSize: 15,
  },

  ctn_obj: {
    flex: 1 / 3,
  },

  btn_reset: {
    backgroundColor: COLORS_APP.background_destructible,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 30,
  },

  btn_txt_reset: {
    textAlign: "center",
  },

  ctn_fill: {
    ...StyleSheet.absoluteFill,
  },

  ctn_panel: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: COLORS_APP.background_secs,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "70%",
  },

  ctn_panel_header: {
    marginVertical: 10,
    width: "100%",
  },

  panel_txt_label: {
    color: COLORS_APP.font_third,
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontFamily: FONT_FAMILY.main,
    textAlign: "center",
    fontSize: 20,
  },

  btn_img_user: {
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 64,
  },

  btn_close: {
    position: "absolute",
    right: 20,
  },
});
