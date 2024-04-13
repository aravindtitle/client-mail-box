import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Inbox from "./Inbox";
import Sent from "./Sent";

const EmailComposer = () => {
  const email = useRef();
  const subject = useRef();
  const body = useRef();
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [showInbox, setShowInbox] = useState(true); // New state to control Inbox visibility
  const [showSent, setShowSent] = useState(false); // New state to control Sent visibility
  const UID = localStorage.getItem("UID");

  var A = UID.replace(/[.@]/g, "");

  const sendHandler = async (e) => {
    e.preventDefault();

    const composer = {
      from: UID,
      To: email.current.value,
      subject: subject.current.value,
      message: body.current.value,
      read: false,
    };

    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/email.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(composer),
        }
      );

      if (response.ok) {
        console.log("Email sent successfully!");
        email.current.value = "";
        subject.current.value = "";
        body.current.value = "";
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const toggleComposeForm = () => {
    setShowComposeForm((prevState) => !prevState);
    setShowInbox(false);
    setShowSent(false);
  };

  const toggleInbox = () => {
    setShowInbox((prevState) => !prevState);
    setShowComposeForm(false);
    setShowSent(false);
  };

  const toggleSent = () => {
    setShowSent((prevState) => !prevState);
    setShowComposeForm(false);
    setShowInbox(false);
  };

  return (
    <div style={{ display: "flex", height: "99vh" }}>
      <div style={{ width: "15%", borderRight: "1px solid black" }}>
        <ul>
          <li>
            <Button onClick={toggleComposeForm}>
              {showComposeForm ? "Close Composer" : "Open Composer"}
            </Button>
          </li>
          <li>
            <Button onClick={toggleInbox}>
              {showInbox ? "Close Inbox" : "Open Inbox"}
            </Button>
          </li>
          <li>
            <Button onClick={toggleSent}>
              {showSent ? "Close Sent" : "Open Sent"}
            </Button>
          </li>
        </ul>
      </div>
      <div style={{ width: "65%" }}>
        {showComposeForm && (
          <Form onSubmit={sendHandler}>
            <Form.Group controlId="formTo">
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={email}
                required
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formSubject">
              <Form.Label>Subject:</Form.Label>

              <Form.Control type="text" placeholder="Subject" ref={subject} />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBody">
              <Form.Control
                as="textarea"
                rows="40"
                cols="150"
                placeholder="Body"
                ref={body}
              />
            </Form.Group>
            <br />

            <Button type="submit">Send</Button>
            <Button onClick={toggleComposeForm}>Cancel</Button>
          </Form>
        )}
        {showInbox && <Inbox userId={UID} />}
        {showSent && <Sent UID={UID} />}{" "}
      </div>
    </div>
  );
};

export default EmailComposer;
