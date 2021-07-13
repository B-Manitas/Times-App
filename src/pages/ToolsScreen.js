// Import Librairies
import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

// Import Customs Components.
import ButtonTool from "../components/ButtonTool";
import ContainerPage from "../components/ContainerPage";
import Footer from "../components/Footer";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import {
  path_logo_toolbox,
  path_logo_stopwatch,
  path_logo_hourglass,
  path_logo_calculator,
} from "../utils/ConstantImages";

const ToolsScreen = ({ navigation }) => {
  return (
    <ContainerPage>
      <View style={styles.ctn_header}>
        <Image source={path_logo_toolbox} style={styles.icn_logo} />
        <Text style={styles.txt_header}>Toolbox</Text>
      </View>

      <View style={styles.ctn_body}>
        <ButtonTool navigation={navigation} screen={"Stopwatch"} path_img={path_logo_stopwatch} text={"Stopwatch"}/>
        <ButtonTool navigation={navigation} path_img={path_logo_hourglass} text={"Timer"}/>
        <ButtonTool navigation={navigation} path_img={path_logo_calculator} text={"Counter"}/>
      </View>

      <Footer navigation={navigation} current_key_active={"tools"} />
    </ContainerPage>
  );
};

export default ToolsScreen;

const styles = StyleSheet.create({
  ctn_header: {
    paddingTop: 20,
    padding: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  txt_header: {
    marginLeft: 15,
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
  },

  icn_logo: {
    width: 64,
    height: 64,
  },

  ctn_body: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
