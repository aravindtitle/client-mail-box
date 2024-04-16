const initialState = {
  emails: [],
  selectedEmail: null,
};

const inboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EMAILS":
      return {
        ...state,
        emails: action.payload,
      };
    case "SELECT_EMAIL":
      return {
        ...state,
        selectedEmail: action.payload,
      };
    case "DELETE_EMAIL":
      return {
        ...state,
        emails: state.emails.filter((email) => email.key !== action.payload),
      };
    default:
      return state;
  }
};

export default inboxReducer;
