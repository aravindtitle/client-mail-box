import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const Inbox = () => {
  const [emails, setEmails] = useState([]);

  const inboxHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://login-94bb8-default-rtdb.firebaseio.com/email.json"
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Email data retrieved successfully:", data);
        setEmails(Object.values(data)); // Assuming data is an object of emails, convert it to an array and set it as the state
      } else {
        console.error("Failed to retrieve email data.");
      }
    } catch (error) {
      console.error("Error retrieving email data:", error);
    }
  };

  return (
    <div>
      <Button onClick={inboxHandler}>Inbox</Button>
      {emails.map((email, index) => (
        <Card key={index} style={{ width: "18rem", margin: "10px" }}>
          <Card.Body>
            <Card.Title>Subject: {email.subject}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              To: {email.To}
            </Card.Subtitle>
            <Card.Text>message: {email.message}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Inbox;
