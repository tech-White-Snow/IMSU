const initialState = {
    users: [ 
        {
            id: 0,
            name: "Maria Müller",
            email: "admin@example.com",
            gender: "Female",
            role: "Admin", 
            company: "Microsoft",
            company_id:"",
            avatar: '/assets/avatars/avatar-anika-visser.png',
            password: "123456"   
        },
        {
            id: 1,
            name: "Hans Schmidt",
            email: "manager@example.com",
            gender: "Male",
            role: "Manager",  
            company: "Microsoft",
            company_id:"",
            avatar: '/assets/avatars/avatar-miron-vitold.png',
            password: "123456"
        },
        {
            id: 2,
            name: "Markus Wagner",
            email: "normal@example.com",
            gender: "Male",
            role: "Normal", 
            company: "Microsoft",
            company_id:"",
            avatar: '/assets/avatars/avatar-fran-perez.png',
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
      case 'ADD_EMPLOYEES':
        return {
          ...state,
          users: action.payload,
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
              users:[ ...trans1],
          }
      case 'UPDATE_USERS':
        return state;
      default:
        return state;
    }
  };
  
  export default userReducer;