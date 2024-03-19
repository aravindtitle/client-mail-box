import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

const SignUpForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const emailChangeHnadler = (event) => {
    event.preventDefault();
    setMail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const passwordConfirmHandler = (event) => {
    event.preventDefault();
    setCpassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== cpassword) {
      alert("Passwords do not match");
    }
    let url;
    if (!isSignup) {
      // Sign-up logic
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwnQ2dBOhhzKcsnrtASwoq4kc9RiEWYRg";
      setIsSignup(true);
      console.log("Signed up successfully");
    }
    console.log("Signed up successfully");

    setMail("");
    setPassword("");
    setCpassword("");
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <div className="border rounded p-4" style={{ maxWidth: "400px" }}>
        <Form style={{ width: "200px" }} onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={mail}
              onChange={emailChangeHnadler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={passwordChangeHandler}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={cpassword}
              onChange={passwordConfirmHandler}
              required
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpForm;
