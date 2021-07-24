// Import Libraries.
import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

// Import Custom Components.
import TextTraduction from "./TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const TextField = ({
  key_text,
  txt_placeholder,
  max_len,
  value,
  onChange,
  flex = 1,
  is_center = false,
  is_numeric = false,
  multiline = false,
  editable = true,
  autoCorrect = false,
}) => {
  return (
    <View style={[styles.ctn_main, { flex }]}>
      {key_text && (
        <View style={[styles.ctn_lbl, is_center && { left: 15, right: 15 }]}>
          <TextTraduction key_text={key_text} style={styles.lbl_input} />
        </View>
      )}

      <TextInput
        onEndEditing={(e) => onChange(e.nativeEvent.text)}
        defaultValue={value}
        placeholder={txt_placeholder}
        autoCapitalize={"sentences"}
        autoCompleteType={"username"}
        keyboardType={is_numeric ? "number-pad" : "default"}
        maxLength={max_len}
        style={[
          styles.input,
          !key_text && { marginVertical: 0 },
          is_center && { textAlign: "center" },
        ]}
        returnKeyType={is_numeric ? "done" : "next"}
        placeholderTextColor={COLORS_APP.font_secs}
        autoCorrect={autoCorrect}
        multiline={multiline}
        editable={editable}
      />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  ctn_main: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
    marginVertical: 5,
  },

  ctn_lbl: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: COLORS_APP.background_third,
    paddingHorizontal: 7,
    paddingTop: 5,
    zIndex: 1,
    justifyContent: "center",
    left: 20,
  },

  lbl_input: {
    color: COLORS_APP.font_main,
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },

  input: {
    margin: 10,
    marginHorizontal: 5,
    paddingHorizontal: 13,
    paddingTop: 13,
    paddingBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS_APP.background,
    color: COLORS_APP.font_main,
    fontSize: 16,
    fontFamily: FONT_FAMILY.regular,
    backgroundColor: COLORS_APP.background_third,
  },
});
