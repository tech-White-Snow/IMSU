import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TextField  } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import CustomerModal from './CustomerModal';
import SearchForm from './SearchForm';

import { updateModal } from '../redux/action/modalAction';
import { deleteCustomer } from '../redux/action/customerAction';

import {BACKEND_URL} from '../constant';
const axios = require("axios");


function CustomerTable  () {
    const dispatch = useDispatch();

    const {myInfor} = useSelector(state=>state);
    const {customers} = useSelector(state=>state.customers);
    
    const view =(index) =>{
      let data = {
        open: true,
        text: "VIEW",
        index,
        ...customers[index]
      }
      dispatch(updateModal(data));
    }

    const addCustomer =() =>{
      let data = {
        open: true,
        text: "ADD",
        date: "",
        index: 0,
        amount: "",
        type: "",
        description: ""
      }
      dispatch(updateModal(data));
    }



    const update = (index) =>{
      let data = {
        open: true,
        text: "UPDATE",
        index,
        ...customers[index]
      }
      dispatch(updateModal(data));
    }

    const deleteCustoer =(index) =>{
      axios.delete(`${BACKEND_URL}/api/customer/:${index}`, {
        // username: stateInfor.username,
        // password: stateInfor.password,
      }).then((res) => {
        dispatch(deleteCustomer(index));
      }).catch((err) => {
        
      });
    }
    return (
      <div>
        <SearchForm />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>View</TableCell>
              {(myInfor.role == "admin" || myInfor.role == "manager") ? <TableCell>Update</TableCell> : ''}
              {myInfor.role == "admin" ? <TableCell>Delete</TableCell> : ''}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        className='blue-btn'
                        onClick={()=>view(index)}>
                          View
                      </Button>
                </TableCell>
                {(myInfor.role == "admin" || myInfor.role == "manager") ? <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        className='blue-btn'
                        onClick={()=>update(index)}>
                          Update
                      </Button>
                    </TableCell> : ''}
                {myInfor.role == "admin" ? <TableCell>
                      <Button 
                        variant="contained" 
                        color="success"
                        className='blue-btn'
                        onClick={()=>deleteCustoer(index)}
                      >
                        Delete
                      </Button>
                    </TableCell> : ''}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CustomerModal />
        {myInfor.role == "admin" ? <Button
          variant="contained"

          className="add-member-button  blue-btn"
          onClick={addCustomer}
        >
          Add Customer
        </Button>:''}
      </div>
    );
  };
  
  export default CustomerTable;