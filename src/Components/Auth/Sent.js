import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import useFetch from "../../Useeffect/CustomHook";

const Sent = () => {
  // Destructure props object to access A (UID)
  const [sentMessages, setSentMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const UID = localStorage.getItem("UID");
  const { data, loading } = useFetch(
    "https://login-94bb8-default-rtdb.firebaseio.com/email.json",
    "Sent"
  );

  const renderMessageDetails = ({ key, value }) => {
    //we will seind request to firebase using key and get object from firebase

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
    <div>
      <h2>Sent Messages</h2>
      {selectedMessage ? (
        <div>
          <Button onClick={handleCloseDetails}>Close Details</Button>
          {renderMessageDetails(selectedMessage)}
        </div>
      ) : (
        data.map((message) => (
          <Card key={message.key} style={{ marginBottom: "10px" }}>
            <Card.Body>
              <Card.Title>{message.value.subject}</Card.Title>

              <Button onClick={() => handleViewDetails(message)}>
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
