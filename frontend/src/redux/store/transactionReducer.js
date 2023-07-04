const initialState = {
    transactions: [
        {
            id: 0,
            date: "1st January 2022",
            amount: "$100",
            type: "Deposit",
            description: "deposited $1,000 into checking account. The transaction was successful, and the new balance in the account is now $5,000.",
        },
        {
            id: 1,
            date: "5th February 2022",
            amount: "$1,000",
            type: "Withdrawal",
            description: "transferred $2,000 from her checking account to other's account. The transaction was successful, and the new balance in checking account is now $7,500",
        },
        {
            id: 2,
            date: "10th March 2022",
            amount: "$500",
            type: "Transfer",
            description: "deposited $1,500 into savings account. The transaction was successful, and the new balance in account is now $10,000.",
        },
    ],
  };
  
  const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [...state.transactions, action.payload],
        };
      case 'ADD_TRANSACTIONS':
        return {
          ...state,
          transactions: action.payload,
        };
      case 'DELETE_Transaction':
        let trans = [];
        state.transactions.forEach((value, index) => {
          if (index != action.payload) {
            trans = [...trans, value];
          }
        });
        // console.log(trans);
        return {
            ...state,
            transactions:[   ...trans],
        }
      case 'UPDATE_TRANSACTION':
          let trans1 = [];
          state.transactions.forEach((value, index) => {
              if (index != action.payload.index) {
                  trans1 = [...trans1, value];
              }else{
                  let tran = {
                      date: action.payload.date,
                      amount: action.payload.amount,
                      type: action.payload.type,
                      description: action.payload.description
                  }
                  trans1 = [...trans1, tran];
              }
          });
          // console.log(trans);
          return {
              ...state,
              transactions:[   ...trans1],
          }
      default:
        return state;
    }
  };
  
  export default transactionReducer;