// Import Librairies
import React from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import ButtonMore from "../components/ButtonMore";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Import Constants.
import { LOGO } from "../utils/ConstantImages";
import { LEGAL, SETTINGS, ABOUT, FEEDBACK } from "../utils/ConstantPage";

const MoreScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <ContainerPage>
      <Header key_text={"more_options"} path_img={LOGO.options} />

      <View style={styles.ctn_body}>
        <View style={styles.ctn_btn}>
          <ButtonMore
            key_text={"settings"}
            navigation={navigation}
            screen={SETTINGS}
            path_img={LOGO.settings}
          />
          <ButtonMore
            key_text={"about"}
            navigation={navigation}
            screen={ABOUT}
            path_img={LOGO.info}
          />
        </View>
        <View style={styles.ctn_btn}>
          <ButtonMore
            key_text={"legal_notice"}
            navigation={navigation}
            screen={LEGAL}
            path_img={LOGO.legal}
          />
          <ButtonMore
            flex={1 / 2}
            key_text={"contact_us"}
            navigation={navigation}
            screen={FEEDBACK}
            path_img={LOGO.feedback}
          />
        </View>
      </View>

      <Footer
        navigation={navigation}
        dispatch={dispatch}
        current_key_active={"more"}
      />
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
