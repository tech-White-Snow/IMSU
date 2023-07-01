import { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem,Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeEmployee } from 'src/redux/action/modal';
import { addEmployees } from 'src/redux/action/information';

const EmployeeModal = () =>{
  const dispatch = useDispatch();
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

  const handleUpdate=()=>{
        // axios.put(`${process.env.SERVER_URL}/api/users/${formValues.id}`)
    //   .then((res) => {
    //     dispatch(addEmployees(res.data));
    //   })
    //   .catch((err) => {
    //     // Handle any errors that occur during the request
    //     console.error(err);
    //   });
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
          <TextField
            name="gender"
            label="Gender"
            value={formValues.gender}
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
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