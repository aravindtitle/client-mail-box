import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "./InboxReducer";

const store = configureStore({
  reducer: {
    inbox: inboxReducer,
  },
});

export default store;
