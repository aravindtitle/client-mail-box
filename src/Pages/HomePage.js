import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from "../Components/Welcome";
import EmailComposer from "../Pages/ComposerPage";
import Logout from "../Components/Logout";
import Inbox from "../Pages/InboxPage";
import Auth from "../Components/Auth";
import Sent from "../Pages/SentPage";
import styles from "./homepage.module.css";

const Home = () => {
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));

  const handleLogin = (token) => {
    setIdToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    setIdToken(null);
  };

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                {idToken ? (
                  <>
                    <Welcome />
                    <div className={styles.container}>
                      <div className={styles.sidebar}>
                        <h5
                          style={{
                            marginBottom: "20px",
                            fontSize: "20px",
                            color: "brown",
                          }}
                        >
                          Gmail
                        </h5>
                        <ul>
                          <li>
                            <Link to="/compose">Compose</Link>
                          </li>
                          <li>
                            <Link to="/inbox">Inbox</Link>
                          </li>
                          <li>
                            <Link to="/sent">Sent</Link>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.content}>
                        <Routes>
                          <Route path="/compose" element={<EmailComposer />} />
                          <Route path="/inbox" element={<Inbox />} />
                          <Route path="/sent" element={<Sent />} />
                        </Routes>
                      </div>
                    </div>
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
