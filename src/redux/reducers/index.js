import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
});

export default reducers;
