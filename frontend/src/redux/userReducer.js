const initialState = {
    users: [ 
        {
            name: "Maria Müller",
            email: "maria.muller@example.com",
            gender: "Female",
            role: "admin",    
        },
        {
            name: "Hans Schmidt",
            email: "hans.schmidt@example.com",
            gender: "Male",
            role: "manager",   
        },
        {
            name: "Markus Wagner",
            email: "markus.wagner@example.com",
            gender: "Male",
            role: "normal", 
        },
    ],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_USER':
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default userReducer;