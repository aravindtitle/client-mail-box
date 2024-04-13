import React from "react";
import { Button } from "react-bootstrap";

const Logout = ({ handleLogout }) => {
  const logoutHandler = () => {
    handleLogout();
  };

  return (
    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
      <Button onClick={logoutHandler}>Log Out</Button>
    </div>
  );
};

export default Logout;
