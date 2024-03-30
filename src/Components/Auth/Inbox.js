import React, { useReducer, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

const inboxReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_EMAILS":
      return { ...state, emails: action.payload };
    case "SELECT_EMAIL":
      return { ...state, selectedEmail: action.payload };
    case "MARK_EMAIL_AS_READ":
      return {
        ...state,
        emails: state.emails.map((email) =>
          email.id === action.payload ? { ...email, read: true } : email
        ),
      };
    case "DELETE_EMAIL":
      return {
        ...state,
        emails: state.emails.filter((email) => email.id !== action.payload),
        selectedEmail: null, // Reset selected email after deletion
      };
    default:
      return state;
  }
};

const Inbox = ({ userId, markEmailAsRead, deleteEmail }) => {
  const [state, dispatch] = useReducer(inboxReducer, {
    emails: [],
    selectedEmail: null,
  });

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem("emails"));
    if (storedEmails) {
      dispatch({ type: "FETCH_EMAILS", payload: storedEmails });
    }
  }, []);

  const inboxHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/user/A/email.json`
      );

      if (response.ok) {
        const data = await response.json();
        if (data) {
          dispatch({ type: "FETCH_EMAILS", payload: Object.values(data) });
          localStorage.setItem("emails", JSON.stringify(Object.values(data)));
        } else {
          console.error("No email data available.");
        }
      } else {
        console.error("Failed to retrieve email data.");
      }
    } catch (error) {
      console.error("Error retrieving email data:", error);
    }
  };

  const handleEmailClick = async (email) => {
    // Mark the email as read when clicked
    email.read = true; // Assuming you have a 'read' property in each email object
    // Update the read status in the backend
    try {
      await markEmailAsRead(email.id); // Assuming email.id is the unique identifier for each email
      // Update the local state to reflect the change
      const updatedEmails = state.emails.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      );
      dispatch({ type: "FETCH_EMAILS", payload: updatedEmails });
      // Set the selected email
      dispatch({ type: "SELECT_EMAIL", payload: email });
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  const handleDeleteEmail = async (emailId) => {
    try {
      // Call your backend API to delete the email
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/user/A/email/${emailId}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        // Filter out the deleted email from the state
        const updatedEmails = state.emails.filter(
          (email) => email.id !== emailId
        );
        dispatch({ type: "FETCH_EMAILS", payload: updatedEmails });
        // Clear the selected email if it was deleted
        dispatch({ type: "SELECT_EMAIL", payload: null });
        // Optionally, you can remove the email from local storage as well
      } else {
        console.error("Failed to delete email.");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const renderBlueDot = (email) => {
    return !email.read && <span style={{ color: "blue" }}>&#8226;</span>;
  };

  const countUnreadMessages = () => {
    return state.emails.filter((email) => !email.read).length;
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
            <Button
              onClick={() => dispatch({ type: "SELECT_EMAIL", payload: null })}
            >
              Go Back
            </Button>
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
                    <h3>{state.selectedEmail.subject}</h3>
                    <p>{state.selectedEmail.message}</p>
                  </div>
                  <Button
                    onClick={() => handleDeleteEmail(state.selectedEmail.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div>
            <Button onClick={inboxHandler}>
              Inbox {countUnreadMessages() > 0 && `(${countUnreadMessages()})`}
            </Button>
            {state.emails.map((email) => (
              <Card
                key={email.id}
                style={{
                  margin: "16px",
                  cursor: "pointer",
                  border: "1px solid blue",
                  borderRadius: "5px",
                  backgroundColor:
                    state.selectedEmail === email ? "#f0f0f0" : "inherit",
                }}
                onClick={() => handleEmailClick(email)}
              >
                <Card.Body>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      {renderBlueDot(email)}
                      <Card.Title>{email.subject}</Card.Title>
                    </div>
                    <Button onClick={() => handleDeleteEmail(email.id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
      <div style={{ flex: "0", padding: "10px" }}>
        {/* Display total number of unread messages */}
      </div>
    </div>
  );
};

export default Inbox;
