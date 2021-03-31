// Librairies
import React from 'react';
import { View } from 'react-native';

// Custom components
import ContainerPage from '../components/containers/ContainerPage';
import Header from '../components/Header';
import BodyView from '../components/BodyView';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <ContainerPage>
      <Header />
      <BodyView />
      <Footer />
    </ContainerPage>
  );
};

export default Home;