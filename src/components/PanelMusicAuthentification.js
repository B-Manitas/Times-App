import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import ButtonURL from "./ButtonURL";
import { ColorsApp, FontFamily } from "../utils/app_properties";

const PanelMusicAuthentification = ({setAuthToken}) => {
  const auth_end_point = "https://accounts.spotify.com/authorize";
  const client_id = "def10de378734eaeae4a89f80feec2da";
  const redirect_uri = "exp://192.168.1.74:19000";
  const scopes = "user-read-playback-state"; 

  const url_signup = "https://www.spotify.com/signup/";
  const url_login =
    auth_end_point +
    "?response_type=code" +
    "&client_id=" +
    client_id +
    (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
    "&redirect_uri=" +
    encodeURIComponent(redirect_uri);

    return (
    <View>
      <Text style={styles.txt_auth_desc}>
        Authenticate to access the music controller.
      </Text>
      <View style={styles.ctn_auth}>
        <ButtonURL
          url={url_signup}
          text={"Sign Up"}
          style={[styles.btn_auth, styles.btn_auth_sign]}
          txt_style={styles.txt_auth}
        />
        <ButtonURL
          url={url_login}
          text={"Login"}
          setAuthToken={setAuthToken}
          style={[styles.btn_auth, styles.btn_auth_login]}
          txt_style={[styles.txt_auth, styles.txt_auth_login]}
        />
      </View>
      <View style={styles.ctn_img}>
        <Image
          style={styles.img}
          source={require("../../assets/icon/icn-auth-denied.png")}
        />
      </View>
    </View>
  );
};

export default PanelMusicAuthentification;

const styles = StyleSheet.create({
  ctn_auth: {
    flexDirection: "row",
  },

  ctn_img: {
    marginTop: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  img: {
    width: 150,
    height: 150,
  },

  txt_auth_desc: {
    textAlign: "center",
    color: ColorsApp.font_third,
    marginTop: 0,
    marginBottom: 20,
  },

  btn_auth: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    margin: 5,
    flex: 1,
    borderColor: ColorsApp.outline_forth,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  btn_auth_sign: {
    borderColor: ColorsApp.cta,
  },

  btn_auth_login: {
    backgroundColor: ColorsApp.cta,
  },

  txt_auth: {
    fontFamily: FontFamily.main_reg,
    fontSize: 18,
    color: ColorsApp.font_third,
  },

  txt_auth_login: {
    color: ColorsApp.font_main,
    fontWeight: "bold",
  },
});
