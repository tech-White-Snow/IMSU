import { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem,Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeEmployee } from 'src/redux/action/modal';
import { addEmployees } from 'src/redux/action/information';
import { BACKEND_URL } from 'src/Constant';
import axios from 'axios';


//customer modal companent

const EmployeeModal = () =>{
  const dispatch = useDispatch();
  const [alert, setAlert] = useState("");
  const {employee} = useSelector(state=>state.modal);
  const [formValues, setFormValues] = useState({employee
  });

  // const [isOpen, setOpen] = useState(true);
 
  const handleClose = () =>{
    dispatch(closeEmployee());
  }


  useEffect(()=>{
    setFormValues(employee);
  }, [employee])

  //update employee 's data : admin and manager can do
  const handleUpdate=async()=>{
        // axios.put(`${process.env.SERVER_URL}/api/users/${formValues.id}`)
    //   .then((res) => {
    //     dispatch(addEmployees(res.data));
    //   })
    //   .catch((err) => {
    //     // Handle any errors that occur during the request
    //     console.error(err);
    //   });
    
    try {
   
      const res = await axios.put(`${BACKEND_URL}/api/users/${formValues._id}`, formValues);
      
      const employees = res.data;
      dispatch(addEmployees(employees));
    
      handleClose();
      setAlert("");
    }
  catch(err) {
      if(!err) console.log(err);
      setAlert(err.data.errors);
    };
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
        open={employee.open} 
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
          {alert.length?<Alert>{alert}</Alert>:''}
          <Typography 
            variant="h4"
            sx={{
              display: 'inline-flex',
              marginLeft: `50px`,
            }}
          >
            {formValues.text == 'view'? "View" : 'Update'} 
          </Typography>
          <TextField
            name="name"
            label="Name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <InputLabel>Gender</InputLabel> 
          <FormControl fullWidth margin="small">
            <Select   
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
       
          <TextField
            name="email"
            label="Email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <InputLabel>Role</InputLabel>
          <FormControl fullWidth margin="normal">
            <Select
              name="role"
              value={formValues.role}
              onChange={handleChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
            </Select>
          </FormControl>
          {formValues.text=='update' ? <Button variant="contained" color="primary" fullWidth
            onClick={handleUpdate}
          >
            Update
          </Button> : ''}
        </Box>
      </Modal>
  );
}

export default EmployeeModal;