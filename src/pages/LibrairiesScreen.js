// Import Librairies.
import React from "react";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import Footer from "../components/Footer";

// Import Constants.
import { LIBRAIRIES } from "../utils/ConstantPage";

const LibrairiesScreen = ({navigation}) => {
  return (
    <ContainerPage>
      <Footer navigation={navigation} current_key_active={LIBRAIRIES} />
    </ContainerPage>
  );
};

export default LibrairiesScreen;
