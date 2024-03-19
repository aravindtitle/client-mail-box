import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const LogInForm = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Redirect the user to the dashboard or another page after successful login
      window.location.href = "/dashboard"; // Redirect using window.location.href
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Handle login errors (e.g., display error messages to the user)
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <h2>Log In</h2>
      <Form onSubmit={handleLogIn}>
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
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default LogInForm;
