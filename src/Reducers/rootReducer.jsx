import { combineReducers } from "@reduxjs/toolkit";
import inboxReducer from "./InboxReducer";
import sentReducer from "./SentReducer";

const rootReducer = combineReducers({
  inbox: inboxReducer,
  sent: sentReducer
});

export default rootReducer;
