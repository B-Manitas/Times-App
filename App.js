// React
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Redux store
import { Provider } from "react-redux";
import store from "./src/redux/store";

// Pages
import Home from "./src/pages/Home";
import BodyEdit_2 from "./src/components/BodyEdit_2";
import BodyView from "./src/components/BodyView";
import BodyTimer from "./src/components/BodyTimer";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={BodyView}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Edit"
              component={BodyEdit_2}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Timer"
              component={BodyTimer}
              options={{ headerShown: false, gestureEnabled:false, animationEnabled:false }}
            />
          </Stack.Navigator>

        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
