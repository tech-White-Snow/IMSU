  const initialState = {
    open: false,
    text: "UPDATE",
    date: "",
    index: 0,
    amount: "",
    type: "",
    description: "",
  };
  
  const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_OPEN':
        return {
          ...state,
          open: action.payload,
        };
      case 'UPDATE_MODAL':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default modalReducer;