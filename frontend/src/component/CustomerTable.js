import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import CustomerModal from './CustomerModal';
import { updateOpen } from '../redux/action/modalAction';
import { updateModal } from '../redux/action/modalAction';
import { deleteCustomer } from '../redux/action/customerAction';


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
      dispatch(deleteCustomer(index));
      console.log(index)
    }
    return (
      <div>
        {myInfor.role == "admin" ? <Button
          variant="contained"
          color="success"
          onClick={addCustomer}
        >
          Add Customer
        </Button>:''}
        <Table>
          <TableHead>
            <TableRow>
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        onClick={()=>view(index)}>
                          View
                      </Button>
                </TableCell>
                {(myInfor.role == "admin" || myInfor.role == "manager") ? <TableCell>
                      <Button 
                        variant="contained" 
                        color="success" 
                        onClick={()=>update(index)}>
                          Update
                      </Button>
                    </TableCell> : ''}
                {myInfor.role == "admin" ? <TableCell>
                      <Button 
                        variant="contained" 
                        color="success"
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
      </div>
    );
  };
  
  export default CustomerTable;