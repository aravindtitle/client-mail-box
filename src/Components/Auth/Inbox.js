import React, { useReducer, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

const inboxReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_EMAILS":
      return { ...state, emails: action.payload };
    case "SELECT_EMAIL":
      return { ...state, selectedEmail: action.payload };
    default:
      return state;
  }
};

const Inbox = ({ userId }) => {
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
        dispatch({ type: "FETCH_EMAILS", payload: Object.values(data) });
        localStorage.setItem("emails", JSON.stringify(Object.values(data)));
      } else {
        console.error("Failed to retrieve email data.");
      }
    } catch (error) {
      console.error("Error retrieving email data:", error);
    }
  };

  const handleEmailClick = (email) => {
    dispatch({ type: "SELECT_EMAIL", payload: email });
    // Mark the email as read when clicked
    email.read = true; // Assuming you have a 'read' property in each email object
    // Update the read status in the backend (you'll need to implement this)
    // Call your API or update the database accordingly
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
        <Button onClick={inboxHandler}>
          Inbox {countUnreadMessages() > 0 && `(${countUnreadMessages()})`}
        </Button>
        {state.emails.map((email, index) => (
          <Card
            key={index}
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
              <div>
                {renderBlueDot(email)}
                <Card.Title>{email.subject}</Card.Title>
              </div>
              {state.selectedEmail === email && (
                <div>
                  <Card.Subtitle className="mb-2 text-muted">
                    To: {email.To}
                  </Card.Subtitle>
                  <Card.Text>{email.message}</Card.Text>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
      <div style={{ flex: "0", padding: "110px" }}>
        {/* Display total number of unread messages */}
      </div>
    </div>
  );
};

export default Inbox;
