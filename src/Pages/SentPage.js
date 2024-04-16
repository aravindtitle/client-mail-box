import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import useFetch from "../Custom Hooks/CustomHook";
import styles from "./SentPage.module.css";

const Sent = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { data } = useFetch(
    "https://login-94bb8-default-rtdb.firebaseio.com/email.json",
    "Sent"
  );

  const renderMessageDetails = ({ key, value }) => {
    return (
      <div>
        <p>To: {value.To}</p>
        <p>Subject: {value.subject}</p>
        <p>Message: {value.message}</p>
      </div>
    );
  };

  const handleViewDetails = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseDetails = () => {
    setSelectedMessage(null);
  };

  return (
    <div className={styles.sentContainer}>
      <h2>Sent Messages</h2>
      {selectedMessage ? (
        <div>
          <Button onClick={handleCloseDetails}>Close Details</Button>
          {renderMessageDetails(selectedMessage)}
        </div>
      ) : (
        data.map((message) => (
          <Card key={message.key} className={styles.sentCard}>
            <Card.Body className={styles.sentCardBody}>
              <Card.Title>{message.value.subject}</Card.Title>
              <Button
                className={styles.sentButton}
                onClick={() => handleViewDetails(message)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Sent;
