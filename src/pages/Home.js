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
  const [currentIdEdit, setCurrentIdEdit] = useState(-1);
  
  const changeMode = (workoutId=-1) => {
    setCurrentIdEdit(workoutId)
    setIsEditMode(!isEditMode);
  };
  
  return (
    <ContainerPage>
      <Header showSearchBar={!isEditMode}/>
      {
        isEditMode 
        ? <BodyEdit handleMode={changeMode} workoutId={currentIdEdit}/> 
        : <BodyView handleMode={changeMode} />
      }
      
      <Footer />
    </ContainerPage>
  );
};

export default Home;