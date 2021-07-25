// Import Librairies
import React, { useCallback, useState } from "react";
import { Alert, Linking, Text, TouchableOpacity } from "react-native";
import { getAlertText } from "../scripts";

const ButtonURL = ({ url, text, style, txt_style, setAuthToken }) => {
  const [isSent, setIsSent] = useState(false);

  function getUrlParameter(name, url) {
    name = name.replace("/[[]/", "\\[").replace("/[]]/", "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(url);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace("/+/", " "));
  }

  const onPress = useCallback(async () => {
    const isValided = await Linking.canOpenURL(url);
    if (!isSent && isValided) await Linking.openURL(url);
    else
      Alert.alert(getAlertText("En", "inaccessible_link"));

    Linking.addEventListener("url", ({ url }) => {
      setAuthToken(getUrlParameter("code", url));
    });
    setIsSent(true);
  }, []);

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={txt_style}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonURL;
