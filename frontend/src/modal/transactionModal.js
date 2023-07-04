import { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem,Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeTransaction } from 'src/redux/action/modal';
import axios from 'axios';
import { BACKEND_URL } from 'src/Constant';
import { addTransactions } from 'src/redux/action/information';
import { useRouter } from 'next/router';


//customer modal companent

const TransactionModal = () =>{
  const dispatch = useDispatch();
  const router = useRouter();
  const {transaction} = useSelector(state=>state.modal);
  const [formValues, setFormValues] = useState({transaction});

  // const [isOpen, setOpen] = useState(true);
 
  const handleClose = () =>{
    dispatch(closeTransaction());
  }

  useEffect(()=>{
    setFormValues(transaction);
  }, [transaction])


  //update or add transaction : normal user cannot do
  const handleUpdate=(e)=>{
    if(!e){

      //update transaction : admin and manager can do
      axios.put(`${BACKEND_URL}/api/transactions/${formValues._id}`, formValues)
              .then((res) => {
                dispatch(addTransactions(res.data));
                handleClose();
                router.push('/transactions');
              })
              .catch((err) => {
                // Handle any errors that occur during the request
                console.error(err);
              });
      }else{
       console.log("object")

       //add transaction : admin only can do
            axios.post(`${BACKEND_URL}/api/transactions/`, formValues)
              .then((res) => {
                dispatch(addTransactions(res.data));
                handleClose();
                router.push('/transactions');
                
              })
              .catch((err) => {
                // Handle any errors that occur during the request
                console.error(err);
              });
     }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
 
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  return(
      <Modal 
        open={transaction.open} 
        onClose={handleClose}
        style={{margin: "auto"}}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          p: 2}}
        >
          <Typography 
            variant="h4"
            sx={{
              display: 'inline-flex',
              marginLeft: `100px`,
              marginBottom: `10px`,
            }}
          >
            {formValues.text == 'view'? "View" : formValues.text == 'add'? "Add" : 'Update'}          
          </Typography>
          <InputLabel >Date</InputLabel> 
          <TextField
            style={{marginTop: '0px'}}
            name="date"
            type='date'
            value={formValues.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <InputLabel>Type</InputLabel> 
          <FormControl fullWidth margin="small">
            <Select   
              name="type"
              value={formValues.type}
              onChange={handleChange}
            >
              <MenuItem value="Withdrawal">Withdrawal</MenuItem>
              <MenuItem value="Deposit">Deposit</MenuItem>
              <MenuItem value="Transfer">Transfer</MenuItem>
            </Select>
          </FormControl>
       
          <TextField
            name="amount"
            label="Amount"
            type='number'
            value={formValues.amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={formValues.description}
            onChange={handleChange}
            fullWidth
            multiline
            margin="normal"
          />
        {formValues.text=='update' ? <Button variant="contained" color="primary" fullWidth onClick={()=>handleUpdate(0)}>
            Update
          </Button> : formValues.text=='add' ? <Button variant="contained" color="primary" fullWidth
          onClick={()=>handleUpdate(1)}>
            Add
          </Button>:''}
        </Box>
      </Modal>
  );
}

export default TransactionModal;