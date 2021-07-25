// Import Librairies.
import React from "react";
import { useSelector } from "react-redux";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Import Customs Components.
import ButtonText from "../components/ButtonText";
import ContainerPage from "../components/ContainerPage";
import HeaderBack from "../components/HeaderBack";
import LabelContainer from "../components/LabelContainer";
import TextTraduction from "../components/TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

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
      <ScrollView style={styles.ctn}>
        <LabelContainer key_text={"credit"} size={20} />
        <TextTraduction key_text={"txt_credit"} style={styles.txt} />
        {authors.map((a) => (
          <View key={a.author} style={styles.ctn_list_authors}>
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
      </ScrollView>
    </ContainerPage>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  ctn: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  txt: {
    color: COLORS_APP.font_main,
  },

  ctn_credit: {
    flexDirection: "row",
    // alignItems: "baseline",
    // // marginLeft: 25,
    // marginBottom: 20,
  },

  ctn_list_authors: {
    flexDirection: "row",
    marginLeft: 25,
    marginTop: 10,
  },

  list_decoration: {
    color: COLORS_APP.font_main,
    marginRight: 10,
  },
});
