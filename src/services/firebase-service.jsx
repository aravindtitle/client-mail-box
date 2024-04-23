import firebase from "firebase/compat/app"; 

const firebaseConfig = {
  apiKey: "AIzaSyATlRMmgZhx_d86BZAvGHprgCUO2Nxo6ck",
  authDomain: "login-94bb8.firebaseapp.com",
  databaseURL: "https://login-94bb8-default-rtdb.firebaseio.com",
  projectId: "login-94bb8",
  storageBucket: "login-94bb8.appspot.com",
  messagingSenderId: "176717676173",
  appId: "1:176717676173:web:afe0dc37f43c55bddc6cc4",
  measurementId: "G-RHWS9Z0GTD",
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
