import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Composer-Page.module.css";
const EmailComposer = () => {
  const email = useRef();
  const subject = useRef();
  const body = useRef();

  const sendHandler = async (e) => {
    e.preventDefault();

    const composer = {
      from: localStorage.getItem("UID"),
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

  return (
    <div className={styles["compose-container"]}>
      <Form onSubmit={sendHandler}>
        <Form.Group controlId="formTo" className={styles["form-group"]}>
          <Form.Label className={styles["form-label"]}>To:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={email}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSubject" className={styles["form-group"]}>
          <Form.Label className={styles["form-label"]}>Subject:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Subject"
            ref={subject}
            className={styles["form-control"]}
          />
        </Form.Group>
        <Form.Group controlId="formBody" className={styles["form-group"]}>
          <Form.Control
            as="textarea"
            rows="40"
            cols="200"
            placeholder="Body"
            ref={body}
            className={`${styles["form-control"]} ${styles["textarea-control"]}`}
          />
        </Form.Group>
        <div className={styles["button-container"]}>
          <Button type="submit" className={styles["button"]}>
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EmailComposer;
