import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Slider } from "react-native-elements";
import { convertMSToMin } from "../scripts";
import {
  ColorsApp,
  path_icn_nav_bl,
  path_icn_play_bl,
  path_icn_shuffle_bl,
  path_icn_loop_bl,
} from "../utils/app_properties";
import ButtonImage from "./ButtonImage";
import TimeBar from "./TimeBar";

const PanelMusicController = ({ client_id, scopes, token }) => {
  const endpoint = "https://api.spotify.com/v1/me/player/";

  const [data, setData] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [isPlayed, setIsPlayed] = useState(true);
  const [isShuffle, setIsShuffle] = useState(true);
  const [isLoop, setIsLoop] = useState(false);

  const request = (method = "GET", options) => {
    return {
      method: method,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  };

  useEffect(() => {
    const time_interval = setInterval(() => {
      if (token != "")
        fetch(endpoint + "currently-playing", request("GET"))
          .then((response) => response.json())
          .then((response) => setData(response));
    }, 1000);

    return () => clearInterval(time_interval);
  }, [token, data]);

  const onPressAction = useCallback((action, method, setState, new_value) => {
    if (token)
      fetch(endpoint + action, request(method)).then((rep) => {
        console.log(JSON.stringify(rep));
      }).then(rep => {console.log(rep)});
    if (setState && new_value) setState(new_value);
  }, []);

  const onPressNav = useCallback((action, method = "POST") => {
    if (token) fetch(endpoint + action, request(method));
  }, []);

  const onPressShuffle = useCallback(()=>{
    setIsShuffle(v=>!v)
    if (token) fetch(endpoint + "shuffle"+ "?state=" + !isShuffle, {
      method: "PUT",
      headers:{
        Authorization: "Bearer " + token,
      },
    });
  })

  const onPressLoop = useCallback(()=>{
    setIsLoop(v=>!v)
    const state = isLoop ? "track":"off";
    if (token) fetch(endpoint + "repeat"+ "?state=" + state, {
      method: "PUT",
      headers:{
        Authorization: "Bearer " + token,
      },
    });
  })

  return (
    <View style={styles.ctn_body}>
      <View style={styles.ctn_controller}>

        <View style={styles.ctn_flex}>
          <Text style={styles.txt_artists}>
            {data !== undefined && data !== null && data.item.artists[0].name}
          </Text>

          <Text> - </Text>
          
          <Text style={styles.txt_track_title}>
            {data !== undefined && data !== null && data.item.name}
          </Text>
        </View>
        
        <View style={styles.ctn_slider}>
          <Text style={[styles.txt_time, styles.txt_pre_time]}>
            {data ? convertMSToMin(data.progress_ms) : "00:00"}
          </Text>

          <TimeBar
            style={styles.slider}
            colorBar={ColorsApp.outline_third}
            colorFill={ColorsApp.cta}
            currentValue={data ? data.progress_ms : 0}
            maxValue={data ? data.item.duration_ms : 1}
            invert={true}
          />
          
          <Text style={[styles.txt_time, styles.txt_curr_time]}>
            {data ? convertMSToMin(data.item.duration_ms) : "00:00"}
          </Text>
        </View>

        <View style={styles.ctn_btn_player}>
          <ButtonImage
            path={path_icn_shuffle_bl}
            size={28}
            action={onPressShuffle}
          />
          <View style={styles.ctn_flex}>
            <ButtonImage
              path={path_icn_nav_bl}
              size={36}
              action={() => onPressNav("previous")}
            />

            <ButtonImage
              path={path_icn_play_bl}
              size={56}
              action={
                isPlayed
                  ? () => onPressAction("pause", "PUT", setIsPlayed, false)
                  : () => onPressAction("play", "PUT", setIsPlayed, true)
              }
            />
            <ButtonImage
              path={path_icn_nav_bl}
              size={36}
              style={styles.btn_next}
              action={() => onPressNav("next")}
            />
          </View>
          <ButtonImage
            path={path_icn_loop_bl}
            size={28}
            action={onPressLoop}
          />
        </View>
      </View>

      <View style={styles.ctn_img}>
        <Image
          style={styles.img}
          source={require("../../assets/icon/icn-radio.png")}
        />
      </View>
    </View>
  );
};

export default PanelMusicController;

const styles = StyleSheet.create({
  ctn_flex: {
    flexDirection: "row",
    alignItems: "center",
  },

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

  ctn_controller: {
    alignItems: "center",
  },

  txt_music: {
    fontSize: 18,
  },

  txt_artists: {
    fontWeight: "bold",
  },

  txt_track_title: {},

  ctn_slider: {
    width: "100%",
  },

  slider: {
    margin: 10,
  },

  txt_time: {
    fontSize: 13,
    position: "absolute",
    bottom: -12,
  },

  txt_pre_time: {
    left: 10,
  },

  txt_curr_time: {
    right: 10,
  },

  ctn_btn_player: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    margin: 15,
  },

  ctn_btn_player_secs: {
    flexDirection: "row",
  },

  btn_next: {
    transform: [{ rotate: "180deg" }],
  },
});
