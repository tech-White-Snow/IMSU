import exp from "constants";

export const updateEmployee = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'UPDATE_MEMPLOYEE',
        payload: infor
      });
  };

  export const updateCustomer = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'UPDATE_MCUSTOMER',
        payload: infor
      });
  };
  export const updateTransaction = (infor) => (dispatch) => {
    // ...
    console.log("object")
    dispatch({
        type: 'UPDATE_MTRANSACTION',
        payload: infor
      });
  };

  export const closeEmployee = () => (dispatch) =>{
    dispatch({
        type: 'CLOSE_MEMPLOYEE',
    })
  }
  export const closeCustomer = () => (dispatch) =>{
    dispatch({
        type: 'CLOSE_MCUSTOMER',
    })
  }
  export const closeTransaction = () => (dispatch) =>{
    dispatch({
        type: 'CLOSE_MTRANSACTION',
    })
  }