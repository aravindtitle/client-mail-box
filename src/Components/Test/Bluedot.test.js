import React from "react";
import { render } from "@testing-library/react";
import Inbox from "../Auth/Inbox";

test("renders blue dot for unread emails", () => {
  // Mock unread emails
  const unreadEmails = [
    { id: 1, subject: "Unread Email 1", read: false },
    { id: 2, subject: "Unread Email 2", read: false },
  ];

  // Render Inbox component with mock emails
  const { container } = render(
    <Inbox userId="testUserId" emails={unreadEmails} />
  );

  // Assert that blue dots are rendered for each unread email
  unreadEmails.forEach((email) => {
    const emailElement = container.querySelector(
      `[data-testid="email-${email.id}"]`
    );
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveStyle("color: blue");
  });
});
