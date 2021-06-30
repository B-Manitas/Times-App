import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SwipeablePanel } from "rn-swipeable-panel";
import { editUserCreator, resetUserCreator } from "../redux/actionCreators";
import { getCurrentTimeSecs, isValidTokenMusic } from "../scripts";
import { ColorsApp, FontFamily } from "../utils/app_properties";

import PanelMusicAuthentification from "./PanelMusicAuthentification";
import PanelMusicController from "./PanelMusicController";

const PanelMusic = ({ is_active, onClose }) => {
  const redirect_uri = "exp://192.168.1.74:19000";
  const user_state = useSelector((state) => state.user[0]);
  const [authToken, setAuthToken] = useState(user_state.music_token);
  const dispacth = useDispatch();
  // if (user_state.length > 0) dispacth(resetUserCreator());

  console.log(user_state);
  var current_time = getCurrentTimeSecs();
  const isValidToken = isValidTokenMusic(user_state.music);

  if (isValidToken) {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          "ZGVmMTBkZTM3ODczNGVhZWFlNGE4OWY4MGZlZWMyZGE6ZGYzMTM0ODUyNDdmNGFkMjk2ZjYzMmUwZmFiNzYzZWM=",
      },

      body: `grant_type=authorization_code&code=${encodeURIComponent(
        authToken
      )}&redirect_uri=${encodeURIComponent(redirect_uri)}`,
    })
      .then((response) => response.json())
      .then((response) => {
        var access_token = response.access_token;
        // console.log(response)
        if (access_token)
          dispacth(
            editUserCreator({
              music_token:access_token
              // music_token: {
              //   token: access_token,
              //   expires_in: response.expires_in,
              //   time_init: current_time,
              //   refresh_token: response.refresh_token,
              // },
            })
          );
      });
  }

  return (
    <View style={styles.ctn_main}>
      <SwipeablePanel
        isActive={is_active}
        openLarge={true}
        fullWidth={true}
        onClose={onClose}
        showCloseButton={true}
        noBackgroundOpacity={true}
        onlySmall={true}
        style={styles.panel_music_controller}
      >
        <Text style={styles.txt_header}>Spotify Controller</Text>
        {isValidToken ? (
          <PanelMusicController token={user_state.music_token} />
        ) : (
          <PanelMusicAuthentification setAuthToken={setAuthToken} />
        )}
      </SwipeablePanel>
    </View>
  );
};

export default PanelMusic;

const styles = StyleSheet.create({
  panel_music_controller: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  txt_header: {
    fontFamily: FontFamily.main,
    fontSize: 17,
    textAlign: "center",
    marginBottom: 8,
  },
});
