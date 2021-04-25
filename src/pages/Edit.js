import React from 'react';
import { Text } from 'react-native';
import BodyEdit from '../components/BodyEdit';
import ContainerPage from '../components/containers/ContainerPage';

import Footer from '../components/Footer';
import Header from '../components/Header';

const Edit = ({ route }) => {
  return (
    <ContainerPage>
      {/* <Header showSearchBar={false} /> */}
      <BodyEdit workoutId={route.params.workoutId} />
      <Footer />
    </ContainerPage>
  );
};

export default Edit;
