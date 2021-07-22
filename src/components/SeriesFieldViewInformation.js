import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { isLastHorizontalField } from "../scripts";
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import TextTraduction from "./TextTraduction";

const SeriesFieldViewInformation = ({
  source,
  data,
  index,
  workout_len,
  key_text,
  suffix,
}) => {
  return (
    <View
      style={[
        styles.ctn_info_sub,
        !isLastHorizontalField(workout_len, index) && {
          marginHorizontal: 3,
        },
      ]}
    >
      <Image source={source} style={styles.info_img} />
      <Text style={styles.txt_info}>{data}</Text>
      {isLastHorizontalField(workout_len, index) && (
        <TextTraduction
          key_text={key_text}
          suffix={suffix}
          style={styles.txt_info}
        />
      )}
    </View>
  );
};

export default SeriesFieldViewInformation;

const styles = StyleSheet.create({
  ctn_info_sub: {
    flexDirection: "row",
    marginHorizontal: 10,
  },

  txt_info: {
    paddingLeft: 2,
    color: COLORS_APP.font_third,
    fontFamily: FONT_FAMILY.main,
    textTransform: "lowercase",
  },

  info_img: {
    width: 18,
    height: 18,
  },
});
