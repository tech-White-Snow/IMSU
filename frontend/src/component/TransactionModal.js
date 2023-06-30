import * as React  from 'react';
import {Box, Button, Typography, Modal, TextField} from "@material-ui/core";
import { useDispatch, useSelector, } from 'react-redux';
import { updateOpen } from '../redux/action/modalAction';
import { useState, useEffect } from 'react';
import { addTransaction, updateTransaction } from '../redux/action/transaction'; 

export default function BasicModal() {
  const dispatch = useDispatch();
  const {modal}= useSelector(state=>state);
  const [state, setState] = useState(modal);
 
  const handleClose = () =>{
    dispatch(updateOpen(false));
  }

  useEffect(() => {
    // This code will run when the component mounts or when the 'value' prop changes
    setState(modal);
  }, [modal]);

  const onChange = (e) => {
    setState({ 
      ...state,
      [e.target.name]: e.target.value
    })
  };

  const updateTran=()=>{
    if(modal.text == "UPDATE") dispatch(updateTransaction(state));
    else dispatch(addTransaction(state));
    handleClose();
  }

  return (
    <div>
      <Modal
        open={modal.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><div className='transaction-modal'>

        <h2 className='modal-title'>{modal.text} Transaction</h2>
        <TextField
          label="Amount"
          className="login-input"
          type="text"
          name="amount"
          value={state.amount}
          onChange={onChange}
        />
        <br /><br />
        <TextField
          label="Type"
          id="standard-basic"
          className="login-input"
          type="text"
          name="type"
          value={state.type}
          onChange={onChange}
        />
        <br /><br />
        <TextField
          label="Date"
          className="login-input"
          type="text"
          name="date"
          value={state.date}
          onChange={onChange}
        />
        <br /><br />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          className="login-input"
          type="text"
          name="description"
          multiline
          value={state.description}
          onChange={onChange}
        />
        <br/><br/>
        {modal.text!="VIEW" ? 
          <Button 
          variant="contained" 
            color="success" 
            onClick={updateTran}>{modal.text}</Button>:""}
        </div>
      </Modal>
    </div>
  );
}