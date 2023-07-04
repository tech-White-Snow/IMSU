export const addCustomers = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'ADD_CUSTOMERS',
        payload: infor
      });
  };
 export const deleteCustomer = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'DELETE_CUSTOMERS',
        payload: infor
      });
  };
  export const deleteTransactions = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'DELETE_Transaction',
        payload: infor
      });
  };
  export const addTransactions = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'ADD_TRANSACTIONS',
        payload: infor
      });
  };
  export const addEmployees = (infor) => (dispatch) => {
    // ...
    console.log("object")
    dispatch({
        type: 'ADD_EMPLOYEES',
        payload: infor
      });
  };

  export const updateUsers = () => (dispatch) => {
    // ...
  
    dispatch({
        type: 'UPDATE_USERS',
        payload: ""
      });
  };