import React, { useRef, useState } from "react";
import Inbox from "./Inbox";

const EmailComposer = () => {
  const email = useRef();
  const subject = useRef();
  const body = useRef();
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [showInbox, setShowInbox] = useState(true); // New state to control Inbox visibility
  const UID = localStorage.getItem("UID");

  const markEmailAsRead = async (emailId) => {
    // Update the email status as read in the Firebase database
    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/user/${UID}/email/${emailId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ read: true }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark email as read");
      }
      console.log("Email marked as read successfully!");
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  const sendHandler = async (e) => {
    e.preventDefault();
    const composer = {
      To: email.current.value,
      subject: subject.current.value,
      message: body.current.value,
      read: false, // Assuming the sent email is unread by default
    };

    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/user/${UID}/email.json`,
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

  const toggleInboxVisibility = () => {
    setShowInbox((prevState) => !prevState);
    setShowComposeForm(false); // Ensure the compose form is closed when toggling the Inbox visibility
  };

  return (
    <div>
      <div>
        <button
          variant="primary"
          onClick={() => setShowComposeForm((prevState) => !prevState)} // Toggle the compose form visibility
        >
          {showComposeForm ? "Close Compose" : "Compose"}
        </button>
      </div>
      {showComposeForm && ( // Render the compose form only if showComposeForm is true
        <form onSubmit={sendHandler}>
          <label>To:</label>
          <input type="email" name="email" ref={email} required />
          <br />
          <label>Subject:</label>
          <input type="text" name="subject" ref={subject} />
          <br />
          <textarea typeof="text" name="body" ref={body} placeholder="Body" />
          <br />
          <button type="submit">Send</button>
          <button onClick={() => setShowComposeForm(false)}>Cancel</button>
        </form>
      )}
      <div>
        {showInbox && ( // Render the inbox only if showInbox is true
          <Inbox userId={UID} markEmailAsRead={markEmailAsRead} />
        )}
      </div>
    </div>
  );
};

export default EmailComposer;
