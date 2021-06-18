// Librairies
import React, { useState } from "react";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { EditMode, TimerMode, ViewMode } from "../utils/app_type";

// Custom components
import ContainerPage from "../components/containers/ContainerPage";
import Header from "../components/Header";
import BodyView from "../components/BodyView";
import BodyEdit from "../components/BodyEdit";
import Footer from "../components/Footer";
import BodyTimer from "../components/BodyTimer";


const Home = () => {
  const [mode, setMode] = useState(ViewMode);
  const [workoutId, setWorkoutId] = useState(undefined);

  const switcherMode = (bodyMode, id = undefined) => {
    setWorkoutId(id);
    setMode(bodyMode);
  };

  const Body = () => {
    switch (mode) {
      case EditMode:
        lockAsync(OrientationLock.PORTRAIT);
        return <BodyEdit {...{ switcherMode, workoutId }} />;

      case TimerMode:
        lockAsync(OrientationLock.LANDSCAPE);
        return <BodyTimer {...{ switcherMode, workoutId }} />;

      default:
        lockAsync(OrientationLock.PORTRAIT);
        return <BodyView switcherMode={switcherMode} />;
    }
  };

  return (
    <ContainerPage>
      <Header showSearchBar={mode === ViewMode} />
      <Body />
      {/* <Footer /> */}
    </ContainerPage>
  );
};

export default Home;
