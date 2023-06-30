const initialState = {
    customers: [ 
        {
            name: "Maria Müller",
            email: "admin@example.com",
            gender: "Female",
            address: "4808 Brew Creek Rd",
        },
        {
            name: "Hans Schmidt",
            email: "manager@example.com",
            gender: "Male",
            address: "4808 Brew Creek Rd",
        },
        {
            name: "Markus Wagner",
            email: "Hans@example.com",
            gender: "Male",
            address: "4808 Brew Creek Rd",
        },
    ],
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CUSTOMER':
        
        
        return {
          ...state,
          customers: [...state.customers, action.payload],
        };
    case 'DELETE_CUSTOMER':
        let trans = [];
        state.customers.forEach((value, index) => {
            if (index != action.payload) {
                trans = [...trans, value];
            }
        });
        // console.log(trans);
        return {
            ...state,
            customers:[   ...trans],
        }
        case 'UPDATE_CUSTOMER':
            let trans1 = [];
            state.customers.forEach((value, index) => {
                if (value.email != action.payload.email) {
                    trans1 = [...trans1, value];
                }else{
                    let tran = {
                        name: action.payload.name,
                        email: action.payload.email,
                        gender: action.payload.gender,
                        address: action.payload.address
                    }
                    trans1 = [...trans1, tran];
                }
            });
            // console.log(trans);
            return {
                ...state,
                customers:[   ...trans1],
            }
      default:
        return state;
    }
  };
  
  export default customerReducer;