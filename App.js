// React
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Redux store
import { Provider } from "react-redux";
import store from "./src/redux/store";

// Pages
import EditScreen from "./src/pages/EditScreen";
import HomeScreen from "./src/pages/HomeScreen";
import TimerScreen from "./src/pages/TimerScreen";


const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Edit"
              component={EditScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Timer"
              component={TimerScreen}
              options={{ headerShown: false, gestureEnabled:false, animationEnabled:false }}
            />
          </Stack.Navigator>

        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
