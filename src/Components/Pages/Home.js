import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Auth from "../Auth/Auth";
import Welcome from "../Header/Welcome";

const Home = () => {
  const [idtoken, setIdToken] = useState("");

  useEffect(() => {
    // Effect code
  }, []);
  return (
    <>
      {idtoken && <Welcome />}
      <Auth setIdToken={setIdToken} />
    </>
  );
};

export default Home;
