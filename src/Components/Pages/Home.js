import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Logout from "../Auth/Logout";
import Auth from "../Auth/Auth";
import Welcome from "../Header/Welcome";
import EmailComposer from "../Auth/Composer";
import MyComponent from "../MyComponent";
import YourComponent from "../YourComponent";

const Home = () => {
  const [idtoken, setIdToken] = useState("");
  const [senderId, setSenderId] = useState("");

  useEffect(() => {
    let A = localStorage.getItem("idToken");
    handleLogin(A);
  }, []);

  const handleLogin = (token, userId) => {
    setIdToken(token);
    setSenderId(userId);
  };

  const handleLogout = () => {
    setIdToken(""); // Clear the token
    setSenderId(""); // Clear the senderId
  };

  return (
    <div style={{ backgroundColor: "skyblue", minHeight: "100vh" }}>
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                {idtoken ? (
                  <>
                    <Welcome />
                    <EmailComposer UID={senderId} />
                    <Logout handleLogout={handleLogout} />
                  </>
                ) : (
                  <Auth handleLogin={handleLogin} />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
