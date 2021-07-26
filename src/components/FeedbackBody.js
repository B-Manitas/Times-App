// Import Libraries.
import React from "react";

// Import Customs Components.
import FeedbackBodyNoSent from "./FeedbackBodyNoSent";
import FeedbackBodySent from "./FeedbackBodySent";

const FeedbackBody = ({
  status,
  language,
  navigation,
  cleanMessage,
  sendMessage,
  dataMessage,
  setDataMessage,
  errorData,
}) => {
  switch (status) {
    case 0:
      return (
        <FeedbackBodyNoSent
          language={language}
          cleanMessage={cleanMessage}
          sendMessage={sendMessage}
          dataMessage={dataMessage}
          setDataMessage={setDataMessage}
          errorData={errorData}
        />
      );

    default:
      return <FeedbackBodySent navigation={navigation} status={status} />;
  }
};

export default FeedbackBody;
