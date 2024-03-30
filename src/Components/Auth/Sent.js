import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const Sent = (A) => {
  const [sentMessages, setSentMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchSentMessages();
  }, []);

  const fetchSentMessages = async () => {
    try {
      const response = await fetch(
        "https://login-94bb8-default-rtdb.firebaseio.com/users/A/email.json"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Filter sent messages sent by the logged-in user
        const sent = Object.values(data).filter(
          (email) => email.folder === "Sent" && email.From === A
        );
        setSentMessages(sent);
      } else {
        console.error("Failed to fetch sent messages.");
      }
    } catch (error) {
      console.error("Error fetching sent messages:", error);
    }
  };

  const renderMessageDetails = (message) => {
    return (
      <div>
        <p>To: {message.To}</p>
        <p>Subject: {message.subject}</p>
        <p>Message: {message.message}</p>
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
        sentMessages.map((message) => (
          <Card key={message.id} style={{ marginBottom: "10px" }}>
            <Card.Body>
              <Card.Title>{message.subject}</Card.Title>

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
