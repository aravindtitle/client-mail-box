// Import the function to be tested
const EmailComposer = require("../Auth/Composer").default; // Ensure to import default export
const { markEmailAsRead } = require("../Auth/Inbox");

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("markEmailAsRead function", () => {
  it("should mark an email as read in the database", async () => {
    // Mock email ID
    const emailId = "exampleEmailId";

    // Call the function with the mock email ID
    await markEmailAsRead(emailId);

    // Check if fetch was called with the correct parameters
    expect(fetch).toHaveBeenCalledWith(
      `https://login-94bb8-default-rtdb.firebaseio.com/user/A/email/${emailId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      }
    );
  });
});
