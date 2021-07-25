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
  TOOLS,
  MORE,
  LEGAL,
  ABOUT,
  FEEDBACK,
  SETTINGS,
  LIBRAIRIES_PREVIEW,
  SEARCH,
  TIMER,
} from "./src/utils/ConstantPage";

// Pages
import EditPage from "./src/pages/EditPage";
import HomePage from "./src/pages/HomePage";
import TimerPage from "./src/pages/TimerPage";
import SettingsPage from "./src/pages/SettingsPage";
import ToolsPage from "./src/pages/ToolsPage";
import MorePage from "./src/pages/MorePage";
import FeedbackPage from "./src/pages/FeedbackPage";
import LegalPage from "./src/pages/LegalPage";
import AboutPage from "./src/pages/AboutPage";
import WorkoutPreviewPage from "./src/pages/WorkoutPreviewPage";
import SearchPage from "./src/pages/SearchPage";

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
                component={HomePage}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={TOOLS}
                component={ToolsPage}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={SEARCH}
                component={SearchPage}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={MORE}
                component={MorePage}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={SETTINGS}
                component={SettingsPage}
                options={{ headerShown: false, gestureEnabled: false }}
              />

              <Stack.Screen
                name={EDIT}
                component={EditPage}
                options={{ headerShown: false, gestureEnabled: false }}
              />

              <Stack.Screen
                name={TIMER}
                component={TimerPage}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animationEnabled: false,
                }}
              />

              <Stack.Screen
                name={LIBRAIRIES_PREVIEW}
                component={WorkoutPreviewPage}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={FEEDBACK}
                component={FeedbackPage}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={LEGAL}
                component={LegalPage}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={ABOUT}
                component={AboutPage}
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
