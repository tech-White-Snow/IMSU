import { UPDATE_OPEN } from './../types'

export const updateOpen = (open) => (dispatch) => {
    // ... perform any necessary logic or asynchronous operations here
  
    dispatch({
      type: 'UPDATE_OPEN',
      payload: open
    });
};

export const updateModal = (modal) => (dispatch) => {
    // ... perform any necessary logic or asynchronous operations here
  
    dispatch({
      type: 'UPDATE_MODAL',
      payload: modal
    });
};