import * as React  from 'react';
import {Box, Button, Typography, Modal, TextField} from "@material-ui/core";
import { useDispatch, useSelector, } from 'react-redux';
import { updateOpen } from '../redux/action/modalAction';
import { useState, useEffect } from 'react';
import { addTransaction, updateTransaction } from '../redux/action/transaction'; 
import { addUser, updateUser } from '../redux/action/userAction';

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
    if(modal.text == "UPDATE") dispatch(updateUser(state));
    else dispatch(addUser(state));
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

        <h2 className='modal-title'>{modal.text} User</h2>
        <TextField
          label="Name"
          className="login-input"
          type="text"
          name="name"
          value={state.name}
          onChange={onChange}
        />
        <br /><br />
        <TextField
          label="Email"
          id="standard-basic"
          className="login-input"
          type="text"
          name="email"
          value={state.email}
          onChange={onChange}
        />
        <br /><br />
        <TextField
          label="Gender"
          className="login-input"
          type="text"
          name="gender"
          value={state.gender}
          onChange={onChange}
        />
        <br /><br />
        <TextField
          id="outlined-multiline-static"
          label="Role"
          className="login-input"
          type="text"
          name="role"
          multiline
          value={state.role}
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