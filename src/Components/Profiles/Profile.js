import React, { useState } from "react";
import SignUpPage from "./SignUpForm";
import LogInForm from "./SignIn";

const ProfilePage = ({ firebase }) => {
  const [mode, setMode] = useState("login");

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn me-3 ${
            mode === "login" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleModeChange("login")}
        >
          Log In
        </button>
        <button
          className={`btn ${
            mode === "signup" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleModeChange("signup")}
        >
          Sign Up
        </button>
      </div>
      {mode === "login" ? (
        <LogInForm firebase={firebase} />
      ) : (
        <SignUpPage firebase={firebase} />
      )}
    </div>
  );
};

export default ProfilePage;
