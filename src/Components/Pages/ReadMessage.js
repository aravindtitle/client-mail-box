import React, { useEffect, useState } from "react";

const ReadMessages = () => {
  const [codes, setCodes] = useState([]);
  //const [ashoka, setAshoka] = useState([]);

  const readMessages = async () => {
    try {
      const response = await fetch(
        `https://login-94bb8-default-rtdb.firebaseio.com/email.json`
      );
      if (response.ok) {
        const data = await response.json();
        var arrayOfObjects = Object.keys(data).map((key) => ({
          key: key,
          value: data[key],
        }));
        console.log("Response data:", arrayOfObjects);

        setCodes(arrayOfObjects);
        console.log(codes);

        //console.log(arrayOfObjects);
        // Extract the keys (codes) from the data object
      } else {
        console.error(
          "Failed to fetch data messages. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching sent messages:", error);
    }
  };

  // This one is your method which get call on button click
  // let dataToUpdate = {
  //   name: "purushotam",
  //   fatherName: "Umesh Mehta",
  // };

  // const keysGetter = (id) => {
  //   const markEmailAsRead = async (id) => {
  //     // Update the email status as read in the Firebase database

  //     try {
  //       const response = await fetch(
  //         `https://login-94bb8-default-rtdb.firebaseio.com/email/${id}.json`, // Interpolating id into the URL
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ read: true }), // Assuming you only want to update the read status
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to mark email as read");
  //       }
  //       console.log("Email marked as read successfully!");
  //     } catch (error) {
  //       console.error("Error marking email as read:", error);
  //     }
  //   };
  //   markEmailAsRead();
  // };

  //This one es ending over here

  return (
    <div>
      <button onClick={readMessages}>Read Messages</button>
      {/* Render codes here */}
      <div>
        {/* Map over codes and render each one */}
        {codes.map(({ key, value }) => (
          <div >
            <h3>{key}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadMessages;
