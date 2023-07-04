import exp from "constants";

//update employee
export const updateEmployee = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'UPDATE_MEMPLOYEE',
        payload: infor
      });
  };
//update customer
  export const updateCustomer = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'UPDATE_MCUSTOMER',
        payload: infor
      });
  };
  //update transaction
  export const updateTransaction = (infor) => (dispatch) => {
    // ...
    console.log("object")
    dispatch({
        type: 'UPDATE_MTRANSACTION',
        payload: infor
      });
  };
//close eployee modal
  export const closeEmployee = () => (dispatch) =>{
    dispatch({
        type: 'CLOSE_MEMPLOYEE',
    })
  }

  //close customer modal

  export const closeCustomer = () => (dispatch) =>{
    dispatch({
        type: 'CLOSE_MCUSTOMER',
    })
  }

  //close transaction modal

  export const closeTransaction = () => (dispatch) =>{
    dispatch({
        type: 'CLOSE_MTRANSACTION',
    })
  }