import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Slider } from "react-native-elements";
import {
  ColorsApp,
  path_icn_nav_bl,
  path_icn_play_bl,
  path_icn_shuffle_bl,
  path_icn_loop_bl,
} from "../utils/app_properties";
import ButtonImage from "./ButtonImage";

const PanelMusicController = ({ client_id, scopes, token }) => {
  const endpoint = "https://api.spotify.com/v1/me/player/currently-playing";
  const [currentTrack, setCurrentTrack] = useState(null);

  const [data, setData] = useState(null);
  const [isSent, setIsSent] = useState(false);

  // console.log(token)

  useEffect(() => {
    if (token != null || token == undefined)
      if (!isSent) {
        fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization:
              "Bearer " + token,
          },
        })
          .then((response) => response.json())
          .then(response => setData(response))

        setIsSent(true);
      } 
      // else console.log("token undefined");
  }, [isSent, data]);

  // console.log(token);
  // console.log("[OUT]\n", JSON.stringify(data, null, "\t"));

  return (
    <View>
      <View style={styles.ctn_body}>
        <View style={styles.ctn_btn_action}>
          <Text style={styles.txt_music}>{data ? data.item.artists[0].name:""} - {data ? data.item.name:""}</Text>
          <View style={styles.ctn_slider}>
            <Slider
              allowTouchTrack={false}
              style={styles.slider}
              thumbTintColor={ColorsApp.cta}
              thumbStyle={{ width: 10, height: 15 }}
            />
            <Text style={styles.txt_time}>2:25</Text>
          </View>
          <View style={styles.ctn_btn_player}>
            <ButtonImage path={path_icn_shuffle_bl} size={33} />
            <View style={styles.ctn_btn_player_secs}>
              <ButtonImage path={path_icn_nav_bl} size={36} />
              <ButtonImage path={path_icn_play_bl} size={36} />
              <ButtonImage
                path={path_icn_nav_bl}
                size={36}
                style={styles.btn_next}
              />
            </View>
            <ButtonImage path={path_icn_loop_bl} size={30} />
          </View>
        </View>
        <View style={styles.ctn_img}>
          <Image
            style={styles.img}
            source={require("../../assets/icon/icn-radio.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default PanelMusicController;

const styles = StyleSheet.create({
  ctn_body: {
    justifyContent: "center",
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

  ctn_btn_action: {
    alignItems: "center",
  },

  txt_music: {
    fontSize: 18,
  },

  ctn_slider: {
    width: "100%",
  },

  txt_time: {
    fontSize: 13,
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  ctn_auth: {
    flexDirection: "row",
  },

  txt_auth_desc: {
    textAlign: "center",
    color: ColorsApp.font_third,
    marginTop: 0,
    marginBottom: 20,
  },

  ctn_btn_player: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },

  ctn_btn_player_secs: {
    flexDirection: "row",
  },

  btn_next: {
    transform: [{ rotate: "180deg" }],
  },
});
