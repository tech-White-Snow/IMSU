
  
  // transactionActions.js
  export const addTransaction = (transaction) =>(dispatch) => {
    // ...
    dispatch({
        type: 'ADD_TRANSACTION',
        payload: transaction
      });
  };
  
  export const updateTransaction = (updatedTransaction) => (dispatch) => {
    // ...
    dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: updatedTransaction
      });
  };
  
  export const deleteTransaction = (transactionId) => (dispatch)=> {
    // ...
    dispatch({
        type: 'DELETE_TRANSACTION',
        payload: transactionId
      });
  };