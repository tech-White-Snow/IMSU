const initialState = {
    error:''
  };
  

  //Alerts reducer
  
  const Alerts = (state = initialState, action) => {
    switch (action.type) {
      //update alert infor
      case 'ALERT':
        return {
            ...state,
            error: action.payload};
      default:
        return state;
    }
  };
  
  export default Alerts;