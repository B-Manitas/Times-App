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
import WorkoutScreen from "./src/pages/WorkoutScreen";
import SettingsScreen from "./src/pages/SettingsScreen";
import ToolsScreen from "./src/pages/ToolsScreen";
import MoreScreen from "./src/pages/MoreScreen";

// Constant
import {
  Home,
  Settings,
  Edit,
  Workout,
  Tools,
  More,
  Feedback,
} from "./src/utils/ConstantPage";
import FeedbackScreen from "./src/pages/FeedbackScreen";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name={Home}
                component={HomeScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={Settings}
                component={SettingsScreen}
                options={{ headerShown: false, gestureEnabled: false }}
              />

              <Stack.Screen
                name={Edit}
                component={EditScreen}
                options={{ headerShown: false, gestureEnabled: false }}
              />

              <Stack.Screen
                name={Workout}
                component={WorkoutScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={Tools}
                component={ToolsScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={More}
                component={MoreScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={Feedback}
                component={FeedbackScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
