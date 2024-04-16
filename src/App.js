import React, { useState } from "react";

import Home from "./Pages/Home-Page";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("idToken"));

  const handleLogin = (idToken) => {
    setIsLoggedIn(idToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    setIsLoggedIn(null);
  };

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
