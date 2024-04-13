import React, { useReducer, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import useFetch from "../../Useeffect/CustomHook";
import inboxReducer from "../Store/InboxReducer";

const Inbox = () => {
  const {
    data: Database,
    loading,
    setData: setDataBase,
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
    return email.read ? null : <span style={{ color: "blue" }}>&#8226;</span>;
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
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: "1",
          padding: "10px",
          maxHeight: "calc(100vh - 20px)",
          overflowY: "auto",
        }}
      >
        {state.selectedEmail ? (
          <div>
            <Button onClick={handleGoBack}>Go Back</Button>
            <Card
              key={state.selectedEmail.id}
              style={{
                margin: "16px",
                border: "1px solid blue",
                borderRadius: "5px",
              }}
            >
              <Card.Body>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h3>From: {state.selectedEmail.from}</h3>
                    <h4>Subject: {state.selectedEmail.subject}</h4>
                    <h4>Message:</h4>
                    <p>{state.selectedEmail.message}</p>
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
                  style={{
                    margin: "16px",
                    cursor: "pointer",
                    border: "1px solid blue",
                    borderRadius: "5px",
                    backgroundColor:
                      state.selectedEmail === value.email
                        ? "#f0f0f0"
                        : "inherit",
                  }}
                  onClick={() => handleEmailClick(key)}
                >
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {renderBlueDot(value)}
                        <Card.Title>{value.subject}</Card.Title>
                      </div>
                      <Button
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
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div style={{ flex: "0", padding: "10px" }}></div>
    </div>
  );
};

export default Inbox;
