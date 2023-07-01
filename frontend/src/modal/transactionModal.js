import { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem,Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeTransaction } from 'src/redux/action/modal';

const TransactionModal = () =>{
  const dispatch = useDispatch();
  const {transaction} = useSelector(state=>state.modal);
  const [formValues, setFormValues] = useState({transaction
  });

  // const [isOpen, setOpen] = useState(true);
 
  const handleClose = () =>{
    dispatch(closeTransaction());
  }

  useEffect(()=>{
    setFormValues(transaction);
  }, [transaction])

  const handleUpdate=(e)=>{
    // if(!e){
    // axios.put(`${process.env.SERVER_URL}/api/transactions/${formValues.id}`)
//   .then((res) => {
//     dispatch(addTransactions(res.data));
//   })
//   .catch((err) => {
//     // Handle any errors that occur during the request
//     console.error(err);
//   });
    // }else{
          // axios.post(`${process.env.SERVER_URL}/api/transactions/`, formValues)
          //   .then((res) => {
          //     dispatch(addTransactions(res.data));
          //   })
          //   .catch((err) => {
          //     // Handle any errors that occur during the request
          //     console.error(err);
          //   });
   // }
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
              marginLeft: `50px`,
            }}
          >
            {formValues.text == 'view'? "View" : formValues.text == 'add'? "Add" : 'Update'}          
          </Typography>
          <TextField
            name="date"
            label="Date"
            value={formValues.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="type"
            label="Type"
            value={formValues.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
       
          <TextField
            name="amount"
            label="Amount"
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