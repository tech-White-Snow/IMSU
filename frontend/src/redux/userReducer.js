const initialState = {
    users: [ 
        {
            name: "Maria Müller",
            email: "admin@example.com",
            gender: "Female",
            role: "admin", 
            company: "www",
            accountnumber: "2023 1231 1122 1123 5",
            password: "123456"   
        },
        {
            name: "Hans Schmidt",
            email: "manager@example.com",
            gender: "Male",
            role: "manager",  
            company: "www",
            accountnumber: "2023 1231 1122 1123 5", 
            password: "123456"
        },
        {
            name: "Markus Wagner",
            email: "normal@example.com",
            gender: "Male",
            role: "normal", 
            company: "www",
            accountnumber: "2023 1231 1122 1123 5",
            password: "123456"
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
      case 'DELETE_USER':
        let trans = [];
        state.users.forEach((value, index) => {
            if (index != action.payload) {
                trans = [...trans, value];
            }
        });
        // console.log(trans);
        return {
            ...state,
            users:[...trans],
        }
        case 'UPDATE_USER':
          let trans1 = [];
          console.log(action);
          state.users.forEach((value, index) => {
              if (value.email != action.payload.email) {
                  trans1 = [...trans1, value];
              }else{
                  let tran = {
                      name: action.payload.name,
                      gender: action.payload.gender,
                      email: action.payload.email,
                      role: action.payload.role
                  }
                  trans1 = [...trans1, tran];
              }
          });
          // console.log(trans);
          return {
              ...state,
              users:[   ...trans1],
          }
      default:
        return state;
    }
  };
  
  export default userReducer;