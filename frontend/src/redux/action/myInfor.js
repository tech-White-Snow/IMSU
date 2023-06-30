export const updateMyinfor = (infor) => (dispatch) => {
    // ...
    dispatch({
        type: 'UPDATE_MYINFOR',
        payload: infor
      });
  };