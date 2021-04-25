// Librairies
import React, { useState } from 'react';

// Custom components
import ContainerPage from '../components/containers/ContainerPage';
import Header from '../components/Header';
import BodyView from '../components/BodyView';
import BodyEdit from '../components/BodyEdit';
import Footer from '../components/Footer';

const Home = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [workoutId, setWorkoutId] = useState(undefined);

  const switcherMode = (id = undefined) => {
    setWorkoutId(id);
    setIsEditMode(!isEditMode);
  };

  return (
    <ContainerPage>
      <Header showSearchBar={!isEditMode} />
      {!isEditMode ? (
        <BodyView switcherMode={switcherMode} />
      ) : (
        <BodyEdit {...{ switcherMode, workoutId }} />
      )}
      <Footer />
    </ContainerPage>
  );
};

export default Home;
