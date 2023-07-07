
//init customers
const initialState = {
    customers: [ 
      {
        id: '5e8680e60cba5019c5ca6fda',
        address: "4808 Brew Creek Rd",
        avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
        email: 'nasimiyu.danai@devias.io',
        name: 'Nasimiyu Danai',
      }
    ],
  };
  
  //customer reducer
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      //add customer to customers reducer
      case 'ADD_CUSTOMER':
        return {
          ...state,
          customers: [...state.customers, action.payload],
        };
      
      //update all customers
      case 'ADD_CUSTOMERS':
        return {
          ...state,
          customers: action.payload,
        };

      //delete customer
      case 'DELETE_CUSTOMER':
        let trans = [];
        state.customers.forEach((value, index) => {
          console.log("object")
            if (value._id != action.payload) {
                trans = [...trans, value];
            }
        });
        // console.log(trans);
        return {
            ...state,
            customers:[   ...trans],
        }

        //update customer
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