/*import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app"; // Import only the necessary Firebase modules
import "firebase/compat/auth"; // Import Firebase Authentication module

import Home from "./Components/Profiles/Home";

import ProfilePage from "./Components/Profiles/Profile";

// Initialize Firebase with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBvfI765RzQerwARKTJwziACEhKtAt03Cg",
  authDomain: "expenses-tracker-2f825.firebaseapp.com",
  databaseURL: "https://expenses-tracker-2f825-default-rtdb.firebaseio.com",
  projectId: "expenses-tracker-2f825",
  storageBucket: "expenses-tracker-2f825.appspot.com",
  messagingSenderId: "241432493087",
  appId: "1:241432493087:web:9e45793d4e2586c131a92a",
  measurementId: "G-77E9SZ69CK",
};

firebase.initializeApp(firebaseConfig)*/
import Home from "./Components/Pages/Home";
//import MyComponent from "./Components/MyComponent";

const App = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default App;
