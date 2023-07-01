export const addCustomer = (Customer) => {
    return {
      type: 'ADD_CUSTOMER',
      payload: Customer,
    };
  };

  export const addCustomers = (Customers) => {
    return {
      type: 'ADD_CUSTOMERS',
      payload: Customers,
    };
  };
  
  export const updateCustomer = (updatedCustomer) => {
    return {
      type: 'UPDATE_CUSTOMER',
      payload:  updatedCustomer ,
    };
  };
  
  export const deleteCustomer = (CustomerId) => {
    return {
      type: 'DELETE_CUSTOMER',
      payload: CustomerId,
    };
  };


