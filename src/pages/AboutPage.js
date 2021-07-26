// Import Librairies.
import React from "react";
import { useSelector } from "react-redux";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// Import Customs Components.
import ButtonText from "../components/ButtonText";
import ContainerPage from "../components/ContainerPage";
import HeaderBack from "../components/HeaderBack";
import LabelContainer from "../components/LabelContainer";
import TextTraduction from "../components/TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { ICON } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const AboutPage = ({ navigation }) => {
  const authors = [
    { author: "Darius Dan", link: "darius-dan" },
    { author: "DinosoftLabs", link: "dinosoftlabs" },
    { author: "Flat Icons", link: "flat-icons" },
    { author: "Freepik", link: "freepik" },
    { author: "Pixel perfect", link: "pixel-perfect" },
    { author: "photo3idea_studio", link: "photo3idea-studio" },
    { author: "smalllikeart", link: "smalllikeart" },
    { author: "Smashicons", link: "smashicons" },
    { author: "Vitaly Gorbachev", link: "vitaly-gorbachev" },
  ];

  const user_store = useSelector((state) => state.user);

  return (
    <ContainerPage>
      <HeaderBack onPress={navigation.goBack} key_text={"about"} />
      <ScrollView style={styles.ctn_body}>
        <View style={styles.ctn}>
          <LabelContainer key_text={"credit"} size={20} />
          <TextTraduction key_text={"txt_credit"} style={styles.txt} />
          {authors.map((a) => (
            <View key={a.author} style={styles.ctn_list}>
              <Text style={styles.list_decoration}>-</Text>
              <ButtonText
                language={user_store.language}
                is_url={true}
                text={a.author}
                onPress={`https://www.flaticon.com/authors/` + a.link}
                color={COLORS_APP.font_main}
              />
            </View>
          ))}
        </View>

        <View style={styles.ctn}>
          <LabelContainer key_text={"contact"} size={20} />

          <View style={styles.ctn_list}>
            <Image source={ICON.white.mail} style={styles.img} />
            <Text style={styles.txt}>timesapp.contact@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
    </ContainerPage>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  ctn_body: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  ctn: {
    marginBottom: 20,
  },

  txt: {
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    marginLeft: 10,
  },
  
  ctn_list: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    marginTop: 10,
  },
  
  list_decoration: {
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    marginRight: 10,
  },

  img: {
    width: 28,
    height: 28,
  },
});
