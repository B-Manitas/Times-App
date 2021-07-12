// Import Librairies.
import React, { useEffect } from "react";
import {
  Alert,
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
import { AVATAR, path_icn_back_wh } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { COLORS_APP } from "../utils/ConstantColors";
import { useState } from "react";

const SettingsScreen = ({ navigation }) => {
  const userStore = useSelector((state) => state.user);
  const [userState, setUserState] = useState(userStore);
  const dispatch = useDispatch();
  const languages = [{ key: "En" }, { key: "Fr" }];

  return (
    <ContainerPage>
      <View style={styles.ctn_header}>
        <ButtonImage
          onPress={goBack}
          path={path_icn_back_wh}
        />
      </View>

      <ScrollView>
        <View style={styles.ctn_body}>
          <ButtonImage
            path={AVATAR[userState.img_profile].path}
            size={100}
            style={styles.img_user}
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
});
