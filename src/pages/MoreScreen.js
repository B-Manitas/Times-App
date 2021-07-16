// Import Librairies
import React from "react";
import { View, StyleSheet } from "react-native";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import ButtonMore from "../components/ButtonMore";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Import Constants.
import { LOGO } from "../utils/ConstantImages";
import { LEGAL, Feedback, Settings } from "../utils/ConstantPage";

const MoreScreen = ({ navigation }) => {
  return (
    <ContainerPage>
      <Header text={"More options"} path_img={LOGO.options} />

      <View style={styles.ctn_body}>
        <View style={styles.ctn_btn}>
          <ButtonMore
            text={"Settings"}
            navigation={navigation}
            screen={Settings}
            path_img={LOGO.settings}
          />
          <ButtonMore
            text={"About"}
            navigation={navigation}
            screen={LEGAL}
            path_img={LOGO.info}
          />
        </View>
        <View style={styles.ctn_btn}>
          <ButtonMore
            text={"Legal Notice"}
            navigation={navigation}
            screen={LEGAL}
            path_img={LOGO.legal}
          />
          <ButtonMore
            flex={1 / 2}
            text={"Send a feedback"}
            navigation={navigation}
            screen={Feedback}
            path_img={LOGO.feedback}
          />
        </View>
      </View>

      <Footer navigation={navigation} current_key_active={"more"} />
    </ContainerPage>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  ctn_body: {
    marginVertical: 10,
    marginHorizontal: 20,
    flex: 1,
  },

  ctn_btn: {
    flexDirection: "row",
  },
});
