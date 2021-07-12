// Import Librairies.
import React, { useState, useCallback } from "react";
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

// Import Customs Components.
import ButtonImage from "../components/ButtonImage";
import ContainerPage from "../components/ContainerPage";
import LabelContainer from "../components/LabelContainer";
import RadioList from "../components/RadioList";

// Import Function.
import {
  editUserCreator,
  resetUserCreator,
  resetWorkoutCreator,
} from "../redux/actionCreators";

// Import Constants.
import {
  AVATAR,
  path_icn_back_wh,
  path_icn_close_bl,
} from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";
import { Dimensions } from "react-native";
import { useEffect } from "react";

const SettingsScreen = ({ navigation }) => {
  const userStore = useSelector((state) => state.user);
  const [userState, setUserState] = useState(userStore);
  const [visibleModalImgUser, setVisibleModalImgUser] = useState(false);
  const dispatch = useDispatch();
  const languages = [{ key: "En" }, { key: "Fr" }];

  let posModalY = new Animated.Value(Dimensions.get("screen").height);

  const changeImgUser = (item) => {
    setVisibleModalImgUser(false);
    setUserState((p) => [{ ...p, img_profile: item.key }][0]);
  };

  useEffect(() => {
    if (visibleModalImgUser)
      Animated.spring(posModalY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
  }, [visibleModalImgUser]);

  const render = useCallback((item) => {
    return (
      <ButtonImage
        path={item.path}
        onPress={() => changeImgUser(item)}
        key={item.key}
        is_cheched={item.key == userState.img_profile}
        style={styles.btn_img_user}
        style_active={styles.btn_img_user_active}
        size={64}
      />
    );
  });

  return (
    <ContainerPage>
      <View style={styles.ctn_header}>
        <ButtonImage onPress={goBack} path={path_icn_back_wh} />
      </View>

      <ScrollView>
        <View style={styles.ctn_body}>
          <ButtonImage
            path={AVATAR[userState.img_profile].path}
            size={100}
            style={styles.img_user}
            onPress={() => setVisibleModalImgUser((b) => !b)}
          />
          <View style={styles.ctn_section}>
            <LabelContainer text={"User Information"} size={20} />
            <TextInput
              onEndEditing={(e) =>
                setUserState((p) => ({ ...p, username: e.nativeEvent.text }))
              }
              placeholder={"Username"}
              placeholderTextColor={COLORS_APP.font_forth}
              style={styles.input}
              defaultValue={userState.username}
              maxLength={13}
            />
          </View>

          <View style={styles.ctn_section}>
            <LabelContainer text={"General"} size={20} />
            <View style={styles.ctn_sub_section}>
              <Text style={styles.sub_label}>Languages</Text>
              <View style={styles.ctn_obj}>
                <RadioList
                  items={languages}
                  current_checked={userState.language}
                  onChange={(t) => setUserState((p) => ({ ...p, language: t }))}
                />
              </View>
            </View>
            <View style={styles.ctn_sub_section}>
              <Text style={styles.sub_label}>Notification</Text>
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

          <View style={styles.ctn_section}>
            <LabelContainer
              text={"Reset"}
              size={20}
              style={styles.ctn_sub_section}
            />
            <TouchableOpacity
              onPress={alertReset}
              style={[styles.btn_reset, styles.ctn_sub_section]}
            >
              <Text style={[styles.sub_label, styles.btn_txt_reset]}>
                Reset the application
              </Text>
            </TouchableOpacity>
          </View>
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
                path={path_icn_close_bl}
                style={styles.btn_close}
              />
            </View>

            <FlatList
              data={AVATAR}
              renderItem={({ item }) => render(item)}
              numColumns={4}
              keyExtractor={(item, index) => index}
            />
          </View>
        </Animated.View>
      )}
    </ContainerPage>
  );

  function goBack() {
    var payload = userState;

    if (userState.username == "")
      payload = { ...userState, username: userStore.username };

    dispatch(editUserCreator(payload));
    navigation.goBack();
  }

  function alertReset() {
    Alert.alert("Reset Application", "Do you want to reset the application ?", [
      {
        text: "Reset",
        onPress: reset,
        style: "destructive",
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function reset() {
    dispatch(resetUserCreator());
    dispatch(resetWorkoutCreator());
    navigation.goBack();
  }
};

export default SettingsScreen;

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
    width: "60%",
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
    marginVertical: 20,
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

  btn_img_user_active: {
    borderColor: COLORS_APP.cta,
  },

  btn_close: {
    position: "absolute",
    right: 20,
  },
});
