const initialState = {
    name: "",
    email: "",
    gender: "",
    role: "",
    company: "",
    company_id:"",
    accountnumber: ""    
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_MYINFOR':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userReducer;