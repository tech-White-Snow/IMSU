//add all customers
export const addCustomers = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'ADD_CUSTOMERS',
        payload: infor
      });
  };

  //add all customers
export const addCustomer = (infor) => (dispatch) => {
  // ...
  dispatch({
      type: 'ADD_CUSTOMER',
      payload: infor
    });
};

  //delete customer
 export const deleteCustomer = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'DELETE_CUSTOMERS',
        payload: infor
      });
  };
    //delete transaction
  export const deleteTransactions = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'DELETE_Transaction',
        payload: infor
      });
  };
    //add transaction
  export const addTransactions = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'ADD_TRANSACTIONS',
        payload: infor
      });
  };
  //add employee 
  export const addEmployees = (infor) => (dispatch) => {
    // ...
    console.log("object")
    dispatch({
        type: 'ADD_EMPLOYEES',
        payload: infor
      });
  };

  //update user
  export const updateUsers = () => (dispatch) => {
    // ...
  
    dispatch({
        type: 'UPDATE_USERS',
        payload: ""
      });
  };