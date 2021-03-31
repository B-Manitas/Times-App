// React
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Pages
import Home from './src/pages/Home';

// Main app properties
import { ColorsApp } from './src/utils/app_properties'

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
			<NavigationContainer>
				<Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
				</Stack.Navigator>
			</NavigationContainer>
    );
  }
};

export default App;
