import React, { useRef, useState } from "react";
import Inbox from "./Inbox";

const EmailComposer = () => {
  const email = useRef();
  const subject = useRef();
  const body = useRef();
  const [showComposeForm, setShowComposeForm] = useState(false);

  const sendHandler = async (e) => {
    e.preventDefault();
    const composer = {
      To: email.current.value,
      subject: subject.current.value,
      message: body.current.value,
    };
    console.log(composer);

    try {
      const userId = "";
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/users/${userId}/email.json`,
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
        // Optionally, you can reset the form here if needed
        email.current.value = "";
        subject.current.value = "";
        body.current.value = "";
        setShowComposeForm(false); // Hide the compose form after sending email
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      {!showComposeForm ? (
        <button variant="primary" onClick={() => setShowComposeForm(true)}>
          Compose
        </button>
      ) : (
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
        <Inbox />
      </div>
    </div>
  );
};

export default EmailComposer;
