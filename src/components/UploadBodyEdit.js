// Import Librairies
import React from "react";
import { Text, TextInput, StyleSheet, ScrollView, View } from "react-native";

// Import Custom components.
import LabelContainer from "./LabelContainer";
import TextField from "./TextField";

const UploadBodyEdit = () => {
  return (
    <ScrollView>
      <View style={styles.ctn_boxes}>
        <LabelContainer text={"Information"} />
        <TextField key_text={"Description"} multiline={true} txt_placeholder={"Your training advice here."} />
      </View>
    </ScrollView>
  );
};

export default UploadBodyEdit;

const styles = StyleSheet.create({
  ctn_boxes: {
    marginTop: 15,
  },
});
