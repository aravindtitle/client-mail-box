import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Auth from "../Auth/Auth";
import Welcome from "../Header/Welcome";
import EmailComposer from "../Auth/Composer";

const Home = () => {
  const [idtoken, setIdToken] = useState("");
  const [senderId, setSenderId] = useState(""); // Define senderId state

  useEffect(() => {
    // Effect code
  }, []);

  const handleLogin = (token, userId) => {
    console.log("User ID:", userId); // Check if userId is received correctly
    setIdToken(token);
    setSenderId(userId); // Set the senderId state after authentication
  };

  return (
    <>
      {idtoken ? (
        <>
          <Welcome />
          <EmailComposer senderId={senderId} /> {/* Pass senderId as a prop */}
        </>
      ) : (
        <Auth handleLogin={handleLogin} />
      )}
    </>
  );
};

export default Home;
