import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import UserModal from './UserModal';
import { updateOpen } from '../redux/action/modalAction';
import { updateModal } from '../redux/action/modalAction';
import { deleteUser } from '../redux/action/userAction';


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
      dispatch(deleteUser(index));
    }
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        onClick={()=>viewTransaction(index)}>
                          View
                      </Button>
                </TableCell>
                {(myInfor.role == "admin" || myInfor.role == "manager") ? <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        onClick={()=>updateTransaction(index)}>
                          Update
                      </Button>
                    </TableCell> : ''}
                {myInfor.role == "admin" ? <TableCell>
                      <Button 
                        variant="contained" 
                        color="success"
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