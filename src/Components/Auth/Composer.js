import React, { useRef, useState } from "react";
import Inbox from "./Inbox";
import Sent from "./Sent"; // Import the Sent component

const EmailComposer = () => {
  const email = useRef();
  const subject = useRef();
  const body = useRef();
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [showInbox, setShowInbox] = useState(true); // New state to control Inbox visibility
  const [showSent, setShowSent] = useState(false); // New state to control Sent visibility
  const UID = localStorage.getItem("UID");
  let A = UID.replace(/[.@]/g, "");
  const markEmailAsRead = async (emailId) => {
    // Update the email status as read in the Firebase database
    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/users/A/email.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body, read: true }),
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
      folder: "Sent", // Assign the folder as "Sent"
    };

    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/users/A/email.json`,
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
    <div style={{ display: "flex" }}>
      <div style={{ width: "30%", borderRight: "1px solid black" }}>
        <ul>
          <li>
            <button onClick={toggleComposeForm}>
              {showComposeForm ? "Close Compose" : "Open Compose"}
            </button>
          </li>
          <li>
            <button onClick={toggleInbox}>
              {showInbox ? "Close Inbox" : "Open Inbox"}
            </button>
          </li>
          <li>
            <button onClick={toggleSent}>
              {showSent ? "Close Sent" : "Open Sent"}
            </button>
          </li>
        </ul>
      </div>
      <div style={{ width: "70%" }}>
        {showComposeForm && (
          <form onSubmit={sendHandler}>
            <label>To:</label>
            <input type="email" name="email" ref={email} required />
            <br />
            <br />
            <label>Subject:</label>
            <input type="text" name="subject" ref={subject} />
            <br />
            <br />
            <textarea
              typeof="text"
              name="body"
              ref={body}
              placeholder="Body"
              rows="40"
              cols="150"
            />
            <br />
            <button type="submit">Send</button>
            <button onClick={toggleComposeForm}>Cancel</button>
          </form>
        )}
        {showInbox && <Inbox userId={UID} markEmailAsRead={markEmailAsRead} />}
        {showSent && <Sent A={A} />}{" "}
        {/* Show the Sent component if showSent is true */}
      </div>
    </div>
  );
};

export default EmailComposer;
