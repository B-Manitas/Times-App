// Librairies
import React  from 'react';
import { StyleSheet, View } from 'react-native';

// Main app properties
import { ColorsApp } from '../../utils/app_properties';


const WidgetFlexContainer = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

export default WidgetFlexContainer;

// Style Component
const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorsApp.bg,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 2,
  },
});
