// Import Libraries.
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";

// Import Functions.
import { isValidEmail } from "../scripts";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import HeaderBack from "../components/HeaderBack";
import FeedbackBody from "../components/FeedbackBody";

// Import Constants.
import { JSB, JSBFB } from "../utils/ConstantKey";

const FeedbackPage = ({ navigation }) => {
  const user_store = useSelector((state) => state.user);

  const [dataMessage, setDataMessage] = useState({ mail: "", message: "" });
  const [errorData, setErrorData] = useState({ mail: false, message: false });
  const [statusReq, setStatusReq] = useState(0);

  // Define http request.
  let req = new XMLHttpRequest();
  
  // Wait for response from the server.
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      setStatusReq(req.status);
    }
  };
  
  // Define the header of the request.
  req.open("POST", "https://api.jsonbin.io/v3/b", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", JSB);
  req.setRequestHeader("X-Collection-Id", JSBFB);

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

  /** Send the message. */
  function sendMessage() {
    setErrorData({ mail: false, message: false });

    if (isValidEmail(dataMessage.mail) && dataMessage.message.length > 0)
      req.send(JSON.stringify(dataMessage));
    else if (!isValidEmail(dataMessage.mail))
      setErrorData((p) => ({ ...p, mail: true }));
    else setErrorData((p) => ({ ...p, message: true }));
  }
};

export default FeedbackPage;
