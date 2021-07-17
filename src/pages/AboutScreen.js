// Import Librairies.
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Import Customs Components.
import HeaderBack from "../components/HeaderBack";
import ContainerPage from "../components/ContainerPage";
import LabelContainer from "../components/LabelContainer";
import ButtonText from "../components/ButtonText";
import { COLORS_APP } from "../utils/ConstantColors";
import { ScrollView } from "react-native-gesture-handler";

const AboutScreen = ({ navigation }) => {
  const authors = [
    { author: "DinosoftLabs", link: "dinosoftlabs" },
    { author: "Flat Icons", link: "flat-icons" },
    { author: "Freepik", link: "freepik" },
    { author: "Pixel perfect", link: "pixel-perfect" },
    { author: "photo3idea_studio", link: "photo3idea-studio" },
    { author: "smalllikeart", link: "smalllikeart" },
  ];

  return (
    <ContainerPage>
      <HeaderBack onPress={navigation.goBack} text={"About"} />
      <ScrollView style={styles.ctn}>
          <LabelContainer text={"Credit"} size={20} />
          <View style={styles.ctn_credit}>
            <Text style={styles.txt}>
              We would like to thank the following artists for drawing the icons
              of the Time's App, from the flaticon platform{" "}
              <ButtonText
                color={COLORS_APP.cta}
                text="Flaticon"
                onPress={"https://www.flaticon.com"}
                is_url={true}
              />{" "}
              :
            </Text>
          </View>
          {authors.map((a) => (
            <View key={a.author} style={styles.ctn_list_authors}>
              <Text style={styles.list_decoration}>-</Text>
              <ButtonText
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

export default AboutScreen;

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
    marginLeft: 25,
    marginBottom: 20,
  },

  ctn_list_authors: {
    flexDirection: "row",
    marginLeft: 25,
    marginBottom: 10,
  },

  list_decoration: {
    color: COLORS_APP.font_main,
    marginRight: 10,
  },
});
