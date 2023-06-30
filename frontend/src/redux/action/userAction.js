export const addUser = (user) => {
    return {
      type: 'ADD_USER',
      payload: user,
    };
  };
  
  export const updateUser = (userId, updatedUser) => {
    return {
      type: 'UPDATE_USER',
      payload: { userId, updatedUser },
    };
  };
  
  export const deleteUser = (userId) => {
    return {
      type: 'DELETE_USER',
      payload: userId,
    };
  };