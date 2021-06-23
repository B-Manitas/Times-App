// Redux store
import { createStore } from "redux";
import workoutReducer from "./reducers";

// const persist_config = {
//   key="root",
// }

const store = createStore(workoutReducer);


export default store;
