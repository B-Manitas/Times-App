// Import Libraries.
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Image, View, StyleSheet } from "react-native";

import { getTradText, isValidEmail } from "../scripts";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import HeaderBack from "../components/HeaderBack";
import TextTraduction from "../components/TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { LOGO } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import FeedbackBody from "../components/FeedbackBody";
import { JSB } from "../utils/ConstantKey";

const FeedbackScreen = ({ navigation }) => {
  const user_store = useSelector((state) => state.user);

  const [dataMessage, setDataMessage] = useState({ mail: "", message: "" });
  const [errorData, setErrorData] = useState({ mail: false, message: false });
  const [statusReq, setStatusReq] = useState(0);

  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      setStatusReq(req.status);
      console.log(req.response);
    }
  };

  req.open("POST", "https://api.jsonbin.io/v3/b", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", JSB);

  return (
    <ContainerPage>
      <HeaderBack onPress={navigation.goBack} key_text={"contact_us"} />
      <FeedbackBody
        status={statusReq}
        language={user_store.language}
        navigation={navigation}
        dataMessage={dataMessage}
        setDataMessage={setDataMessage}
        sendMessage={sendMessage}
        errorData={errorData}
      />
    </ContainerPage>
  );

  function sendMessage() {
    setErrorData({ mail: false, message: false });

    if (isValidEmail(dataMessage.mail) && dataMessage.message.length > 0) {
      req.send(JSON.stringify(dataMessage));
    } else if (!isValidEmail(dataMessage.mail))
      setErrorData((p) => ({ ...p, mail: true }));
    else setErrorData((p) => ({ ...p, message: true }));
  }
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  ctn_body: {
    margin: 20,
    marginTop: 0,
  },

  ctn_sent: {
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS_APP.background,
    zIndex: 1,
    paddingTop: 20,
  },

  txt_sent: {
    fontSize: 20,
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    marginTop: 20,
  },

  img_delivering: {
    width: 200,
    height: 200,
  },

  ctn_field: {
    marginBottom: 10,
  },

  input: {
    paddingHorizontal: 20,
    backgroundColor: COLORS_APP.background_secs,
    paddingTop: 8,
    paddingBottom: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    color: COLORS_APP.font_third,
  },

  input_msg: {
    minHeight: 150,
    paddingTop: 10,
  },

  txt_error: {
    marginHorizontal: 15,
    color: COLORS_APP.destructible,
  },

  ctn_footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS_APP.background,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    paddingVertical: 15,
  },

  btn_back: {
    width: 120,
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
