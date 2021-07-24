// Import Libraries.
import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
} from "react-native";

// Import Functions.
import { getTradText } from "../scripts";

// Import Customs Components.
import ButtonCTA from "./ButtonCTA";
import LabelContainer from "./LabelContainer";
import TextTraduction from "./TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { ICON } from "../utils/ConstantImages";

const FeedbackBodyNoSent = ({
  language,
  sendMessage,
  dataMessage,
  setDataMessage,
  errorData,
}) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={20}
      behavior={"padding"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.ctn_body} showsVerticalScrollIndicator={false}>
        <View style={styles.ctn_field}>
          <LabelContainer text={"Email *"} size={17} />
          <TextInput
            placeholder={getTradText(language, "plh_contact_mail")}
            style={[styles.input, styles.input_mail]}
            autoCompleteType={"email"}
            keyboardType={"email-address"}
            autoCorrect={false}
            defaultValue={dataMessage.mail}
            onChangeText={(v) => setDataMessage((p) => ({ ...p, mail: v }))}
          />
          {errorData.mail && (
            <TextTraduction
              key_text={"error_invalid_mail"}
              style={styles.txt_error}
            />
          )}
        </View>

        <View style={styles.ctn_field}>
          <LabelContainer text={"Message *"} size={17} />
          <TextInput
            placeholder={getTradText(language, "plh_contact_msg")}
            style={[styles.input, styles.input_msg]}
            multiline={true}
            defaultValue={dataMessage.message}
            onChangeText={(v) => setDataMessage((p) => ({ ...p, message: v }))}
          />
          {errorData.message && (
            <TextTraduction
              key_text={"error_empty_message"}
              style={styles.txt_error}
            />
          )}
        </View>
      </ScrollView>

      <ButtonCTA
        key_text={"send"}
        onPress={sendMessage}
        style={styles.btn_footer}
        source={ICON.white.send}
      />
    </KeyboardAvoidingView>
  );
};

export default FeedbackBodyNoSent;

const styles = StyleSheet.create({
  ctn_body: {
    flex: 1,
    margin: 20,
    marginTop: 0,
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

  btn_footer: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
