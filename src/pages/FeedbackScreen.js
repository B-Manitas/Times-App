// Import Libraries.
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import ButtonCTA from "../components/ButtonCTA";
import HeaderBack from "../components/HeaderBack";
import LabelContainer from "../components/LabelContainer";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { ICON, LOGO } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { Home } from "../utils/ConstantPage";
import { getTradText, isValidEmail } from "../scripts";
import TextTraduction from "../components/TextTraduction";

const FeedbackScreen = ({ navigation }) => {
  const user_store = useSelector((state) => state.user);

  const [mail, setMail] = useState();
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(false);

  console.log(user_store.language);

  return (
    <ContainerPage>
      <HeaderBack onPress={navigation.goBack} key_text={"contact_us"} />

      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={"padding"}
        style={{ flex: 1 }}
      >
        {isSent && (
          <View style={[styles.ctn_sent, styles.ctn_body]}>
            <Image style={styles.img_delivering} source={LOGO.delivering} />
            <TextTraduction key_text={"contact_sent"} style={styles.txt_sent} />
          </View>
        )}
        <ScrollView
          style={styles.ctn_body}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.ctn_field}>
              <LabelContainer text={"Email *"} size={17} />
              <TextInput
                placeholder={getTradText(
                  user_store.language,
                  "plh_contact_mail"
                )}
                style={[styles.input, styles.input_mail]}
                autoCompleteType={"email"}
                keyboardType={"email-address"}
                autoCorrect={false}
                defaultValue={mail}
                onChangeText={(v) => setMail(v)}
              />
              {errorMail && (
                <TextTraduction
                  key_text={"error_invalid_mail"}
                  style={styles.txt_error}
                />
              )}
            </View>
            <View style={styles.ctn_field}>
              <LabelContainer text={"Message *"} size={17} />
              <TextInput
                placeholder={getTradText(
                  user_store.language,
                  "plh_contact_msg"
                )}
                style={[styles.input, styles.input_msg]}
                multiline={true}
                defaultValue={message}
                onChangeText={(v) => setMessage(v)}
              />
              {emptyMessage && (
                <TextTraduction
                  key_text={"error_empty_message"}
                  style={styles.txt_error}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {!isSent ? (
        <View style={styles.ctn_footer}>
          <ButtonCTA
            onPress={cleanMessage}
            source={ICON.white.remove}
            is_main={false}
          />
          <ButtonCTA
            key_text={"send"}
            onPress={sendMessage}
            source={ICON.white.send}
          />
        </View>
      ) : (
        <View style={styles.ctn_footer}>
          <ButtonCTA
            key_text={"home"}
            onPress={() => navigation.navigate(Home)}
            style={styles.btn_back}
            source={ICON.white.home}
          />
        </View>
      )}
    </ContainerPage>
  );

  function cleanMessage() {
    if (message.length > 0)
      Alert.alert(getTradText(user_store.language, "alert_rmv_msg_ttl"), "", [
        {
          text: getTradText(user_store.language, "alert_remove_bt1"),
          style: "destructive",
          onPress: ()=>setMessage(""),
        },
        {
          text: getTradText(user_store.language, "cancel"),
          style: "cancel",
        },
      ]);
  }

  function sendMessage() {
    setErrorMail(false);
    setEmptyMessage(false);
    if (isValidEmail(mail) && message.length > 0) setIsSent(true);
    else if (!isValidEmail(mail)) setErrorMail(true);
    else setEmptyMessage(true);
  }
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  ctn_body: {
    margin: 20,
    marginTop: 0,
  },

  ctn_sent: {
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS_APP.background,
    zIndex: 1,
    paddingTop: 20,
  },

  txt_sent: {
    fontSize: 20,
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    marginTop: 20,
  },

  img_delivering: {
    width: 200,
    height: 200,
  },

  ctn_field: {
    marginBottom: 10,
  },

  input: {
    paddingHorizontal: 20,
    backgroundColor: COLORS_APP.background_secs,
    paddingTop: 8,
    paddingBottom: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    color: COLORS_APP.font_third,
  },

  input_msg: {
    minHeight: 150,
    paddingTop: 10,
  },

  txt_error: {
    marginHorizontal: 15,
    color: COLORS_APP.destructible,
  },

  ctn_footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS_APP.background,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    paddingVertical: 15,
  },

  btn_back: {
    width: 120,
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
