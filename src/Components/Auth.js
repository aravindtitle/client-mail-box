import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Auth = ({ handleLogin }) => {
  const [SIGNUP, setSignup] = useState(false);
  const Email = useRef();
  const Password = useRef();
  const confirmPassword = useRef();

  const modeHandler = () => {
    setSignup((value) => !value);
  };

  async function submitHandler(event) {
    event.preventDefault();

    let url;
    if (!SIGNUP) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATlRMmgZhx_d86BZAvGHprgCUO2Nxo6ck`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATlRMmgZhx_d86BZAvGHprgCUO2Nxo6ck`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: Email.current.value,
        password: Password.current.value,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      throw new Error("Signup was not successful");
    }

    const data = await response.json();
    localStorage.setItem("UID", data.email);
    localStorage.setItem("idToken", data.idToken);
    handleLogin(data.idToken);
  }

  const handleLinkClick = (event) => {
    event.preventDefault();
    modeHandler();
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row className="justify-content-center">
        <Col xs={12} sm={9} md={7} lg={6}>
          <div
            className="p-4"
            style={{
              marginTop: "-300px", 
              borderWidth: "5px",
              padding: "100px",
              backgroundColor: "lightblue",
              border: "5px solid red",
              borderRadius: "0.55rem",
            }}
          >
            <h3 className="text-center">{SIGNUP ? "Login" : "Sign Up"}</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  ref={Email}
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  ref={Password}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>

              {!SIGNUP && (
                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Control
                    ref={confirmPassword}
                    type="password"
                    placeholder="Confirm Password"
                    required
                  />
                </Form.Group>
              )}

              <Button variant="primary" type="submit" block={true}>
                {SIGNUP ? "Login" : "Sign Up"}
              </Button>
              <Button
                variant="secondary"
                onClick={modeHandler}
                block
                className="mt-2"
              >
                Go To {SIGNUP ? "Sign Up" : "Login"}
              </Button>
            </Form>
            <div className="mt-3">
              <p className="text-center">
                {SIGNUP ? "Already have an account?" : "Don't have an account?"}{" "}
                <a href="/" onClick={handleLinkClick}>
                  {SIGNUP ? "Sign up here" : "Log in here"}
                </a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
