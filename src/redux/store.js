// Redux store
import { createStore } from 'redux';
import workoutReducer from './reducers';

const store = createStore(workoutReducer);

export default store;
