// React
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Redux store
import { Provider } from "react-redux";
import { store, persistore } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// Pages
import EditScreen from "./src/pages/EditScreen";
import HomeScreen from "./src/pages/HomeScreen";
import TimerScreen from "./src/pages/TimerScreen";


const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
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
                options={{ headerShown: false, gestureEnabled:false }}
              />

              <Stack.Screen
                name="Timer"
                component={TimerScreen}
                options={{ headerShown: false, gestureEnabled:false, animationEnabled:false }}
              />
            </Stack.Navigator>

          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
