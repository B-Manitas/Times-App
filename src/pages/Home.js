// Librairies
import React, { useState } from 'react';

// Custom components
import ContainerPage from '../components/containers/ContainerPage';
import Header from '../components/Header';
import BodyView from '../components/BodyView';
import BodyEdit from '../components/BodyEdit';
import Footer from '../components/Footer';
import BodyTimer from '../components/BodyTimer';
import { EditMode, TimerMode, ViewMode } from '../utils/app_type';
import BodyTimer_2 from '../components/BodyTimer_2';

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
        return <BodyEdit {...{ switcherMode, workoutId }} />;

      case TimerMode:
        return <BodyTimer_2 {...{ switcherMode, workoutId }}/>
        // return <BodyTimer {...{ switcherMode, workoutId }} />;

      default:
        // return <BodyTimer_2 {...{ switcherMode, workoutId }}/>
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
