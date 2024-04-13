import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Logout from "../Auth/Logout";
import Auth from "../Auth/Auth";
import Welcome from "../Header/Welcome";
import EmailComposer from "../Auth/Composer";

const Home = ({ handlerTiggle }) => {
  const [idtoken, setIdToken] = useState("");

  useEffect(() => {
    let A = localStorage.getItem("idToken");
    handleLogin(A);
  }, []);

  const handleLogin = (token) => {
    setIdToken(token);
  };

  const handleLogout = () => {
    setIdToken("");
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
                    <EmailComposer handlerTiggle={handlerTiggle} />
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
