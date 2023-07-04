
//init customers
const initialState = {
    customers: [ 
      {
        id: '5e887ac47eed253091be10cb',
        address: "4808 Brew Creek Rd",
        avatar: '/assets/avatars/avatar-carson-darrin.png',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin',
      },
      {
        id: '5e887b209c28ac3dd97f6db5',
        address: "4808 Brew Creek Rd",

        avatar: '/assets/avatars/avatar-fran-perez.png',
        email: 'fran.perez@devias.io',
        name: 'Fran Perez',
      },
      {
        id: '5e86809283e28b96d2d38537',
        address: "4808 Brew Creek Rd",

        avatar: '/assets/avatars/avatar-anika-visser.png',
        email: 'anika.visser@devias.io',
        name: 'Anika Visser',
      },
      {
        id: '5e86805e2bafd54f66cc95c3',
        address: "4808 Brew Creek Rd",

        avatar: '/assets/avatars/avatar-miron-vitold.png',
        email: 'miron.vitold@devias.io',
        name: 'Miron Vitold',
      },
      {
        id: '5e887a1fbefd7938eea9c981',
        address: "4808 Brew Creek Rd",

        avatar: '/assets/avatars/avatar-penjani-inyene.png',
        email: 'penjani.inyene@devias.io',
        name: 'Penjani Inyene',
      },
      {
        id: '5e887d0b3d090c1b8f162003',
        address: "4808 Brew Creek Rd",

        avatar: '/assets/avatars/avatar-omar-darboe.png',
        email: 'omar.darobe@devias.io',
        name: 'Omar Darobe',
      },
      {
        id: '5e88792be2d4cfb4bf0971d9',
        address: "4808 Brew Creek Rd",

        avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
        email: 'siegbert.gottfried@devias.io',
        name: 'Siegbert Gottfried',
      },
      {
        id: '5e8877da9a65442b11551975',
        address: "4808 Brew Creek Rd",
        avatar: '/assets/avatars/avatar-iulia-albu.png',
        email: 'iulia.albu@devias.io',
        name: 'Iulia Albu',
      },
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