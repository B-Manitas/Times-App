// Redux store
import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { workoutReducer, userReducer, statisticsReducer } from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persist_config = {
  key: "root",
  storage: AsyncStorage,
};

const root_reducer = combineReducers({
  workouts: workoutReducer,
  user: userReducer,
  statistics :statisticsReducer,
});

const persited_reducer = persistReducer(persist_config, root_reducer);
export const store = createStore(persited_reducer);

export const persistore = persistStore(store);
