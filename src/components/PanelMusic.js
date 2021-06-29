import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SwipeablePanel } from "rn-swipeable-panel";
import { ColorsApp, FontFamily } from "../utils/app_properties";

import PanelMusicAuthentification from "./PanelMusicAuthentification";
import PanelMusicController from "./PanelMusicController";

const PanelMusic = ({ is_active, onClose }) => {
  const [authToken, setAuthToken] = useState(null);
  const [token, setToken] = useState(null);

  let client_id = "def10de378734eaeae4a89f80feec2da";
  let client_secret = "df313485247f4ad296f632e0fab763ec";
  const redirect_uri = "exp://192.168.1.74:19000";

  useEffect(() => {
    if (authToken != null && token == null) {
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
          setToken(response.access_token);
        })
        .catch((err) => console.log(err));
    }
    // else console.log(token);
  });

  console.log(token)

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
        {token != null && token != undefined ? (
          <PanelMusicController token={token} />
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
