import addUser from "./reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  addUser,
});

export default rootReducer;
