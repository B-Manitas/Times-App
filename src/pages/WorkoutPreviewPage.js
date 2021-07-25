// Import Librairies.
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import ButtonCTA from "../components/ButtonCTA";
import RadioList from "../components/RadioList";
import TextField from "../components/TextField";
import LabelContainer from "../components/LabelContainer";
import Header from "../components/Header";
import RadioListMenu from "../components/RadioListMenu";
import ButtonToggleImage from "../components/ButtonToggleImage";

// Import Constants.
import { ICON, LOGO, MUSCLES } from "../utils/ConstantImages";
import { COLORS_APP, COLORS_DIFFICULTY } from "../utils/ConstantColors";

const WorkoutField = ({ series_state }) => {
  return (
    <View style={styles.ctn_series}>
      <View style={[styles.ctn_series_sub, styles.ctn_series_sub_name]}>
        <Text style={styles.txt_input}>{series_state.seriesName}</Text>
      </View>
      <View style={[styles.ctn_series_sub, styles.ctn_series_sub_lap]}>
        <Image style={styles.img_series} source={LOGO.hourglass} />
        <Text style={styles.txt_input}>{String(series_state.lap)}s</Text>
      </View>
    </View>
  );
};

const WorkoutPreviewPage = ({ navigation, route }) => {
  const label_size = 20;
  const menu = [
    { key: "information", key_text: "information", src_img: LOGO.hourglass },
    { key: "program", key_text: "program", src_img: LOGO.stopwatch },
  ];
  const states_difficulty = [1, 2, 3, 4, 5];

  const [menuActive, setMenuActive] = useState(menu[0].key);
  const workout = route.params.workout;
  const propsNumeric = {
    max_len: 3,
    is_center: true,
    is_numeric: true,
  };

  return (
    <ContainerPage>
      <Header
        text={workout.title}
        path_img={LOGO.workout}
        onPressClose={navigation.goBack}
      />

      <View style={styles.ctn_body}>
        <RadioListMenu
          items={menu}
          key_atv={menuActive}
          onPress={(k) => setMenuActive(k)}
        />

        {menuActive === menu[0].key && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.ctn_body_sub}
          >
            {workout.description.length > 0 && (
              <View>
                <LabelContainer key_text={"description"} size={label_size} />
                <TextField
                  multiline={true}
                  editable={false}
                  value={workout.description}
                />
              </View>
            )}
            <View style={styles.ctn_input}>
              <TextField
                key_text={"round"}
                value={workout.round}
                {...propsNumeric}
                key={"wourkout-round"}
                is_center={true}
                flex={1 / 2}
                editable={false}
              />
              <TextField
                flex={1 / 2}
                key_text={"rest_time"}
                value={workout.rest_time}
                key={"wourkout-rest"}
                {...propsNumeric}
                editable={false}
              />
              <TextField
                key_text={"final_rest"}
                value={workout.final_rest}
                key={"wourkout-final-rest"}
                {...propsNumeric}
                editable={false}
              />
            </View>

            <LabelContainer key_text={"difficulty"} size={label_size} />
            <RadioList
              items={states_difficulty}
              current_checked={states_difficulty[workout.difficulty - 1]}
              bd_colors={COLORS_DIFFICULTY}
              disabled={true}
            />

            <LabelContainer key_text={"muscles"} size={label_size} />
            <View style={styles.ctn_flex_boxes}>
              {MUSCLES.slice(0, 4).map((item, id) => {
                return (
                  <ButtonToggleImage
                    disabled={true}
                    state={workout.muscles[item.muscle]}
                    key={id}
                    source={item.source}
                    size={48}
                  />
                );
              })}
            </View>
            <View style={styles.ctn_flex_boxes}>
              {MUSCLES.slice(4, 8).map((item, id) => {
                return (
                  <ButtonToggleImage
                    disabled={true}
                    state={workout.muscles[item.muscle]}
                    key={id}
                    source={item.source}
                    size={48}
                  />
                );
              })}
            </View>
          </ScrollView>
        )}

        {menuActive === menu[1].key && (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.ctn_body_sub}
            keyExtractor={(item, index) => index}
            data={workout.series}
            renderItem={({ item, index }) => (
              <WorkoutField index={index} series_state={item} />
            )}
          />
        )}
      </View>

      <ButtonCTA
        source={ICON.white.save}
        onPress={route.params.download}
        key_text={"save"}
        style={styles.btn_download}
      />
    </ContainerPage>
  );
};

export default WorkoutPreviewPage;

const styles = StyleSheet.create({
  ctn_body: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
  },

  ctn_body_sub: {
    marginVertical: 20,
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

  ctn_flex_boxes: {
    flexDirection: "row",
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

  ctn_input: {
    flexDirection: "row",
  },

  btn_download: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
