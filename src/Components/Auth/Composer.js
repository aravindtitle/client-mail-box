import React, { useRef } from "react";

const EmailComposer = () => {
  const email = useRef();
  const subject = useRef();
  const body = useRef();

  const sendHandler = async (e) => {
    e.preventDefault();
    const composer = {
      To: email.current.value,
      subject: subject.current.value,
      message: body.current.value,
    };
    console.log(composer);

    try {
      const response = await fetch(
        "https://expenses-tracker-2f825-default-rtdb.firebaseio.com/send-email",
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
        e.target.reset();
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  return (
    <form onSubmit={sendHandler}>
      <label>To:</label>
      <input type="email" name="email" ref={email} required />
      <br></br>
      <lable>Subject:</lable>
      <input type="text" name="subject" ref={subject} />
      <br></br>
      <textarea typeof="text" name="body" ref={body} placeholder="Body" />
      <br></br>
      <button type="submit">Send</button>
    </form>
  );
};
export default EmailComposer;
