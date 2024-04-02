import React from "react";
import { Button } from "react-bootstrap";

const Logout = ({ handleLogout }) => {
  const logoutHandler = () => {
    // Call the handleLogout function passed from the parent component
    handleLogout();
  };

  return (
    <div>
      <Button onClick={logoutHandler}>Log Out</Button>
    </div>
  );
};

export default Logout;
