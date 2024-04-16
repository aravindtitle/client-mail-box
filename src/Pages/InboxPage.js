import React, { useReducer, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import useFetch from "../Custom Hooks/CustomHook";
import inboxReducer from "../Reducers/InboxReducer";
import styles from "./InboxPage.module.css";

const Inbox = () => {
  const {
    data: Database,
    loading,

    setData1,
  } = useFetch(
    "https://login-94bb8-default-rtdb.firebaseio.com/email.json",
    "Inbox"
  );

  const UID = localStorage.getItem("UID");
  const [state, dispatch] = useReducer(inboxReducer, {
    emails: [],
    selectedEmail: null,
  });
  const [data, setData] = useState([]);

  const fetchEmails = async () => {
    console.log("Fetching emails...");
    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/email.json`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);
        if (data) {
          const received = Object.values(data).filter((obj) => obj.To === UID);
          console.log("Filtered emails:", received);
          setData(received);
          dispatch({ type: "FETCH_EMAILS", payload: received });
        } else {
          console.error("No email data available.");
        }
      } else {
        console.error(
          "Failed to fetch inbox messages. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching inbox messages:", error);
    }
  };

  const handleEmailClick = async (emailId) => {
    const clickedEmail = Database.find((email) => email.key === emailId);

    if (clickedEmail) {
      try {
        await fetch(
          `https://login-94bb8-default-rtdb.firebaseio.com/email/${clickedEmail.key}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...clickedEmail.value, read: true }),
          }
        );
        setData1((state) => !state);
        const updatedEmails = state.emails.map((e) =>
          e.key === clickedEmail.key ? { ...e, read: true } : e
        );
        dispatch({ type: "FETCH_EMAILS", payload: updatedEmails });
        dispatch({ type: "SELECT_EMAIL", payload: clickedEmail.value });
      } catch (error) {
        console.error("Error updating email in the backend:", error);
      }
    } else {
      console.error("Clicked email not found in the database.");
    }
  };

  const handleDeleteEmail = async (key) => {
    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/email/${key}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedEmails = state.emails.filter((email) => email.key !== key);
        dispatch({ type: "DELETE_EMAIL", payload: key });
        setData1((state) => !state);
      } else {
        console.error("Failed to delete email.");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const renderBlueDot = (email) => {
    return email.read ? null : (
      <span className={styles.unreadDot}>&#8226;</span>
    );
  };

  const countUnreadMessages = () => {
    const unreadEmails = Database.filter((email) => {
      console.log(email);
      return !email.value.read;
    });

    console.log("Unread emails:", unreadEmails);

    return unreadEmails.length;
  };

  const handleGoBack = () => {
    dispatch({ type: "SELECT_EMAIL", payload: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.emailList}>
        {state.selectedEmail ? (
          <div>
            <Button onClick={handleGoBack}>Go Back</Button>
            <Card key={state.selectedEmail.id} className={styles.emailDetails}>
              <Card.Body>
                <div className={styles.emailHeader}>
                  <div>
                    <h3>From: {state.selectedEmail.from}</h3>
                    <h4>Subject: {state.selectedEmail.subject}</h4>
                    <h4>Message:</h4>
                    <p className={styles.emailContent}>
                      {state.selectedEmail.message}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div>
            <Button onClick={fetchEmails}>
              Inbox {countUnreadMessages() > 0 && `(${countUnreadMessages()})`}
            </Button>
            <ul>
              {Database.map(({ key, value }) => (
                <li
                  key={key}
                  className={styles.emailItem}
                  onClick={() => handleEmailClick(key)}
                >
                  <Card className={styles.emailCard}>
                    <Card.Body className={styles.emailBody}>
                      <div className={styles.emailHeader}>
                        <div>
                          {renderBlueDot(value)}
                          <Card.Title className={styles.emailTitle}>
                            {value.subject}
                          </Card.Title>
                        </div>
                        <Button
                          className={styles.deleteButton}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEmail(key);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
