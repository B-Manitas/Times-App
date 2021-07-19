// Import Librairies.
import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Import Function.
import { getID } from "../scripts";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import ButtonCustom from "../components/ButtonCustom";
import ButtonImage from "../components/ButtonImage";
import LabelContainer from "../components/LabelContainer";

// Import Constants.
import { STORE } from "../utils/ConstantStore";
import { ICON, LOGO } from "../utils/ConstantImages";
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { useEffect } from "react";

const Header = (workout_state) => {
  return (
    <View>
      <View style={styles.ctn_sub}>
        <LabelContainer text={"Description"} size={22} />
        <Text style={styles.txt_description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
          corporis quaerat repellendus officiis saepe quidem quae, autem
          veritatis corrupti fuga quisquam inventore voluptas alias error, eum
          obcaecati explicabo amet quo.
        </Text>
      </View>

      <View style={styles.ctn_sub}>
        <LabelContainer text={"Information"} size={22} />
        <View style={styles.ctn_info}>
          <Image source={ICON.white.workout} style={styles.img_info} />
          <Text style={styles.txt_info}>
            Difficulty : {workout_state.difficulty}
          </Text>
        </View>

        <View style={styles.ctn_info}>
          <Image source={ICON.white.body} style={styles.img_info} />
          <Text style={styles.txt_info}>Zone : Tous le corps</Text>
        </View>

        <View style={styles.ctn_info}>
          <Image source={LOGO.hourglass} style={styles.img_info} />
          <Text style={styles.txt_info}>
            Repos : {workout_state.rest_time}s
          </Text>
        </View>
      </View>

      <LabelContainer text={"Program"} size={22} />
    </View>
  );
};

const Footer = (setShowSeries, showSeries) => {
  return (
    <View style={styles.ctn_footer}>
      <TouchableOpacity
        style={styles.footer_btn}
        onPress={() => setShowSeries((v) => !v)}
      >
        <Image
          style={[
            styles.footer_btn_img,
            !showSeries && { transform: [{ rotate: "180deg" }] },
          ]}
          source={ICON.white.expand}
        />
        <Text style={styles.footer_btn_txt}>
          {showSeries ? "show less" : "show more"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SeriesField = ({ series_state }) => {
  return (
    <View style={styles.ctn_series}>
      <View style={[styles.ctn_series_sub, styles.ctn_series_sub_name]}>
        {/* <Image style={styles.img_series} /> */}
        <Text style={styles.txt_input}>{series_state.seriesName}</Text>
      </View>
      <View style={[styles.ctn_series_sub, styles.ctn_series_sub_lap]}>
        <Image style={styles.img_series} source={LOGO.hourglass} />
        <Text style={styles.txt_input}>{series_state.lap}s</Text>
      </View>
    </View>
  );
};

const LibrairiesPreviewScreen = ({ navigation, route }) => {
  const max_item = 5;
  const id = getID(STORE, route.params.workout_UID);
  const workout_state = STORE[id];
  const [completeProgram, setCompleteProgram] = useState(false);

  const [dataProgram, setDataProgram] = useState(
    workout_state.series.slice(0, max_item)
  );

  useEffect(() => {
    if (completeProgram) setDataProgram(workout_state.series);
    else setDataProgram(workout_state.series.slice(0, 6));
  }, [completeProgram]);

  return (
    <ContainerPage>
      <View style={styles.ctn_header}>
        <ButtonImage
          onPress={navigation.goBack}
          style={styles.header_btn_back}
          path={ICON.white.back}
        />
        <Text style={styles.header_txt}>{workout_state.title}</Text>
      </View>

      <FlatList
        style={styles.ctn_body}
        data={dataProgram}
        keyExtractor={(item) => item.uid}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => Header(workout_state)}
        ListFooterComponent={() =>
          workout_state.series.length > max_item + 1 &&
          Footer(setCompleteProgram, completeProgram)
        }
        renderItem={({ item, index }) => (
          <SeriesField index={index} series_state={item} />
        )}
      />
    </ContainerPage>
  );
};

export default LibrairiesPreviewScreen;

const styles = StyleSheet.create({
  ctn_header: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    width: "100%",
    alignItems: "center",
  },

  header_btn_back: {
    left: 20,
    top: 20,
    position: "absolute",
  },

  header_txt: {
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
    fontSize: 19,
    top: 30,
  },

  ctn_body: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  ctn_sub: {
    marginBottom: 20,
  },

  txt_description: {
    fontSize: 15,
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    marginLeft: 10,
  },

  ctn_info: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginVertical: 5,
  },

  img_info: {
    width: 24,
    height: 24,
  },

  txt_info: {
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    fontSize: 16,
    marginLeft: 10,
  },

  ctn_series: {
    height: 50,
    flexDirection: "row",
    backgroundColor: COLORS_APP.font_third,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },

  ctn_series_sub: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  ctn_series_sub_name: { flex: 3 },

  ctn_series_sub_lap: { flex: 1 },

  img_series: {
    width: 20,
    height: 20,
  },

  txt_input: {
    marginHorizontal: 3,
    borderBottomWidth: 2,
    padding: 5,
    borderColor: COLORS_APP.outline_third,
    color: COLORS_APP.font_main,
  },

  ctn_footer: {
    alignItems: "center",
    marginVertical: 15,
  },

  footer_btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS_APP.cta,
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    width: 150,
    height: 40,
  },

  footer_btn_img: {
    width: 20,
    height: 20,
  },

  footer_btn_txt: {
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    fontSize: 16,
  },
});
