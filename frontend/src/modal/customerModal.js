import { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem,Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeCustomer } from 'src/redux/action/modal';
import { addCustomers } from 'src/redux/action/information';
import axios from 'axios';
import { BACKEND_URL } from 'src/Constant';
import { useRouter } from 'next/router';


//customer modal companent

const CustomerModal = () =>{
  const dispatch = useDispatch();
  const [alert, setAlert] = useState("");
  const {customer} = useSelector(state=>state.modal);
  const [formValues, setFormValues] = useState({customer
  });

  // const [isOpen, setOpen] = useState(true);
 
  const handleClose = () =>{
    dispatch(closeCustomer());
  }

  useEffect(()=>{
    setFormValues(customer);
  }, [customer])

  const router = useRouter();

  //update or add customer : normal user cannot
  const handleUpdate=(e)=>{
    
   if(!e){
    //update customer: admin and manager can do
    axios.put(`${BACKEND_URL}/api/customers/${formValues._id}`, formValues)
            .then((res) => {
              dispatch(addCustomers(res.data));
              handleClose();
              router.push('/customers');
              setAlert("");
            })
            .catch((err) => {
              // Handle any errors that occur during the request
              console.error(err);
              setAlert(err.data.errors);
            });
    }else{

         //add customer: admin only can do
          axios.post(`${BACKEND_URL}/api/customers/`, formValues)
            .then((res) => {
              dispatch(addCustomers(res.data));
              handleClose();
              router.push('/customers');
              setAlert("");
            })
            .catch((err) => {
              // Handle any errors that occur during the request
              console.error(err.data.errors);
              setAlert(err.data.errors);
            });
   }
  }

  //change input value
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  return(
      <Modal 
        open={customer.open} 
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
          {alert.length ? <Alert>{alert}</Alert>:''}
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
            name="name"
            label="Name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="address"
            label="Address"
            value={formValues.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
       
          <TextField
            name="email"
            label="Email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="company"
            label="Company"
            value={formValues.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="role"
            label="Role"
            value={formValues.role}
            onChange={handleChange}
            fullWidth
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

export default CustomerModal;