// Librairies
import React, { useState } from 'react';
import { View } from 'react-native';

// Custom components
import ContainerPage from '../components/containers/ContainerPage';
import Header from '../components/Header';
import BodyView from '../components/BodyView';
import BodyEdit from '../components/BodyEdit';
import Footer from '../components/Footer';

const Home = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <ContainerPage>
      <Header showSearchBar={isEditMode}/>
      {
        isEditMode ? <BodyView /> : <BodyEdit />
      }
      
      <Footer />
    </ContainerPage>
  );
};

export default Home;