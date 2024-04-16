import { combineReducers } from "@reduxjs/toolkit";
import inboxReducer from "./inbox-reducer";
import sentReducer from "./sent-reducer";

const rootReducer = combineReducers({
  inbox: inboxReducer,
  sent: sentReducer
});

export default rootReducer;
