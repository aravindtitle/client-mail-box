import React, { useReducer } from "react";
import { Card, Button } from "react-bootstrap";
import useFetch from "../custom-hooks/use-fetch";
import styles from "./sent-page.module.css";
import sentReducer from "../reducers/sent-reducer";

const Sent = () => {
  const initialState = {
    selectedMessage: null,
  };

  const [state, dispatch] = useReducer(sentReducer, initialState);

  const { data } = useFetch(
    "https://login-94bb8-default-rtdb.firebaseio.com/email.json",
    "Sent"
  );

  const renderMessageDetails = ({ key, value }) => {
    return (
      <div>
        <p>To: {value.To}</p>
        <p>Subject: {value.subject}</p>
        <p>Message: {value.message}</p>
      </div>
    );
  };

  const handleViewDetails = (message) => {
    dispatch({ type: "SELECT_MESSAGE", payload: message });
  };

  const handleCloseDetails = () => {
    dispatch({ type: "CLOSE_DETAILS" });
  };

  return (
    <div className={styles.sentContainer}>
      <h2>Sent Messages</h2>
      {state.selectedMessage ? (
        <div>
          <Button onClick={handleCloseDetails}>Close Details</Button>
          {renderMessageDetails(state.selectedMessage)}
        </div>
      ) : (
        data.map((message) => (
          <Card key={message.key} className={styles.sentCard}>
            <Card.Body className={styles.sentCardBody}>
              <Card.Title>{message.value.subject}</Card.Title>
              <Button
                className={styles.sentButton}
                onClick={() => handleViewDetails(message)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Sent;
