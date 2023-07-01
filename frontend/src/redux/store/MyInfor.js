const initialState = {
    name: "",
    email: "",
    gender: "",
    role: "Admin",
    company: "Microsoft",
    company_id:"",
    avatar: '/assets/avatars/avatar-anika-visser.png',
    accountnumber: "20234454444454514557"    
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