import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import UserModal from './UserModal';
import SearchForm from './SearchForm';

import { updateOpen } from '../redux/action/modalAction';
import { updateModal } from '../redux/action/modalAction';
import { deleteUser } from '../redux/action/userAction';
import {BACKEND_URL} from '../constant';
const axios = require("axios");


function UserTable  () {
    const dispatch = useDispatch();

    const {myInfor} = useSelector(state=>state);
    const {users} = useSelector(state=>state.user);
    
    const viewTransaction =(index) =>{
      let data = {
        open: true,
        text: "VIEW",
        index,
        ...users[index]
      }
      dispatch(updateModal(data));
    }

    const addTransact =() =>{
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



    const updateTransaction = (index) =>{
      let data = {
        open: true,
        text: "UPDATE",
        index,
        ...users[index]
      }
      
      dispatch(updateModal(data));
    }

    const deleteuser =(index) =>{
      axios.delete(`${BACKEND_URL}/api/user/:${index}`, {
        // username: stateInfor.username,
        // password: stateInfor.password,
      }).then((res) => {
        dispatch(deleteUser(index));
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
              <TableCell>Role</TableCell>
              <TableCell>View</TableCell>
              {(myInfor.role == "admin" || myInfor.role == "manager") ? <TableCell>Update</TableCell> : ''}
              {myInfor.role == "admin" ? <TableCell>Delete</TableCell> : ''}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        className='blue-btn'
                        onClick={()=>viewTransaction(index)}>
                          View
                      </Button>
                </TableCell>
                {(myInfor.role == "admin" || myInfor.role == "manager") ? <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        className='blue-btn'
                        onClick={()=>updateTransaction(index)}>
                          Update
                      </Button>
                    </TableCell> : ''}
                {myInfor.role == "admin" ? <TableCell>
                      <Button 
                        variant="contained" 
                        color="success"
                        className='blue-btn'
                        onClick={()=>deleteuser(index)}
                      >
                        Delete
                      </Button>
                    </TableCell> : ''}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <UserModal />
      </div>
    );
  };
  
  export default UserTable;