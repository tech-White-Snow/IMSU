const initialState = {
    employee: {   
        text:"",
        open: false,
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
    customer: {   
        open: false,
        text:"",
        id: 0,
        address: "",
        avatar: '',
        email: '',
        name: '',
    },
    transaction: {   
        open: false,
        text:"",
        id: 0,
        date: "",
        amount: "",
        type: "",
        description: ""
    },
};
    //modal reducer
  const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_MEMPLOYEE':
        return {
            ...state,
            employee: action.payload
        };
    case 'CLOSE_MEMPLOYEE':
        return {
            ...state,
            employee: {
                ...state.employee,
                open: false
            }
        };
    case 'UPDATE_MTRANSACTION':
        return {
            ...state,
            transaction: action.payload
        };
    case 'CLOSE_MTRANSACTION':
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    open: false
                }
            };

    case 'UPDATE_MCUSTOMER':
        return {
            ...state,
            customer: action.payload
        };

    case 'CLOSE_MCUSTOMER':
        return {
            ...state,
            customer: {
                ...state.customer,
                open: false
            }
        };
        
      default:
        return state;
    }
  };
  
  export default modalReducer;