// React
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Redux store
import { Provider } from "react-redux";
import { store, persistore } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// Constant
import {
  HOME,
  EDIT,
  WORKOUT,
  TOOLS,
  MORE,
  LEGAL,
  ABOUT,
  LIBRAIRIES,
  FEEDBACK,
  SETTINGS,
  LIBRAIRIES_PREVIEW,
} from "./src/utils/ConstantPage";

// Pages
import EditScreen from "./src/pages/EditScreen";
import HomeScreen from "./src/pages/HomeScreen";
import WorkoutScreen from "./src/pages/WorkoutScreen";
import SettingsScreen from "./src/pages/SettingsScreen";
import ToolsScreen from "./src/pages/ToolsScreen";
import MoreScreen from "./src/pages/MoreScreen";
import FeedbackScreen from "./src/pages/FeedbackScreen";
import LegalScreen from "./src/pages/LegalScreen";
import AboutScreen from "./src/pages/AboutScreen";
import LibrairiesScreen from "./src/pages/LibrairiesScreen";
import LibrairiesPreviewScreen from "./src/pages/LibrairiesPreviewScreen";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name={HOME}
                component={HomeScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={SETTINGS}
                component={SettingsScreen}
                options={{ headerShown: false, gestureEnabled: false }}
              />

              <Stack.Screen
                name={EDIT}
                component={EditScreen}
                options={{ headerShown: false, gestureEnabled: false }}
              />

              <Stack.Screen
                name={WORKOUT}
                component={WorkoutScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={TOOLS}
                component={ToolsScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={LIBRAIRIES}
                component={LibrairiesScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={LIBRAIRIES_PREVIEW}
                component={LibrairiesPreviewScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={MORE}
                component={MoreScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={FEEDBACK}
                component={FeedbackScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={LEGAL}
                component={LegalScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={ABOUT}
                component={AboutScreen}
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
