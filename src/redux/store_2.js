import { combineReducers, createStore } from "redux";
import { workoutReducer } from "./reducers";

export function createReducerManager() {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove = [];

  return {
    getReducerMap: () => reducers,

    reduce: (state, action) => {
      if (keysToRemove.length > 0) {
        state = { ...state };

        for (let key of keysToRemove) {
          delete state[key];
        }

        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },

    add: (key, reducer) => {
      if (!key || reducer[key]) {
        return;
      }

      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key) => {
      if (!key || !reducer[key]) {
        return;
      }

      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}

const staticReducer = {
  workout: workoutReducer
}

export function configureStore(initialState){
  const reducerManager = createReducerManager(staticReducer)
  const store = createStore(reducerManager, initialState)
  store.reducerManager = reducerManager
}
