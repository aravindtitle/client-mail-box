import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SignUpPage = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Redirect the user to the dashboard or another page after successful sign-up
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle sign-up errors (e.g., display error messages to the user)
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <Form onSubmit={handleSignUp}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignUpPage;
