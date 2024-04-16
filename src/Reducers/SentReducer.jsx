const initialState = {
    selectedMessage: null,
  };
  
  const sentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_MESSAGE':
        return {
          ...state,
          selectedMessage: action.payload
        };
      case 'CLOSE_DETAILS':
        return {
          ...state,
          selectedMessage: null
        };
      default:
        return state;
    }
  };
  
  export default sentReducer;
  