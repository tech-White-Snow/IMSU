export const addUser = (user) => {
    return {
      type: 'ADD_USER',
      payload: user,
    };
  };
  
  export const updateUser = (updatedUser) => {
    return {
      type: 'UPDATE_USER',
      payload: updatedUser,
    };
  };
  
  export const deleteUser = (userId) => {
    return {
      type: 'DELETE_USER',
      payload: userId,
    };
  };