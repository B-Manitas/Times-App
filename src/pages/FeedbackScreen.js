// Import Libraries.
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import ButtonCTA from "../components/ButtonCTA";
import ButtonImage from "../components/ButtonImage";
import HeaderBack from "../components/HeaderBack";
import LabelContainer from "../components/LabelContainer";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { ICON, LOGO } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { Home } from "../utils/ConstantPage";

const FeedbackScreen = ({ navigation }) => {
  const [mail, setMail] = useState();
  const [message, setMessage] = useState();
  const [isSent, setIsSent] = useState(false);

  return (
    <ContainerPage>
      <HeaderBack onPress={navigation.goBack} text={"Send a feedback"} />

      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={"padding"}
        style={{ flex: 1 }}
      >
        {isSent && (
          <View style={[styles.ctn_sent, styles.ctn_body]}>
            <Image style={styles.img_delivering} source={LOGO.delivering} />
            <Text style={styles.txt_sent}>Thanks you for this feedback.</Text>
          </View>
        )}
        <ScrollView
          style={styles.ctn_body}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <LabelContainer text={"Email *"} size={17} />
            <TextInput
              placeholder={"mail@example.com"}
              style={[styles.input, styles.input_mail]}
              autoCompleteType={"email"}
              keyboardType={"email-address"}
              autoCorrect={false}
              defaultValue={mail}
              onChangeText={(v) => setMail(v)}
            />
            <LabelContainer text={"Message *"} size={17} />
            <TextInput
              placeholder={"Enter your message here"}
              style={[styles.input, styles.input_msg]}
              multiline={true}
              defaultValue={message}
              onChangeText={(v) => setMessage(v)}
            />
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
            text={"Send"}
            onPress={sendMessage}
            source={ICON.white.send}
          />
        </View>
      ) : (
        <View style={styles.ctn_footer}>
          <ButtonCTA
            text={"Home"}
            onPress={() => navigation.navigate(Home)}
            style={styles.btn_back}
            source={ICON.white.home}
          />
        </View>
      )}
    </ContainerPage>
  );

  function cleanMessage() {
    Alert.alert("Clean message", "Are your sure to remove your message ?", [
      { text: "Yes, revome it", style: "destructive", onPress: setMessage },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function sendMessage() {
    setIsSent((b) => !b);
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
    marginBottom: 20,
    borderRadius: 20,
    color: COLORS_APP.font_third,
  },

  input_msg: {
    minHeight: 150,
    paddingTop: 10,
    paddingBottom: 10,
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
