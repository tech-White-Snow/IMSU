import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import TransactionModal from './TransactionModal';
import { updateOpen } from '../redux/action/modalAction';
import { updateModal } from '../redux/action/modalAction';
import { addTransaction, deleteTransaction } from '../redux/action/transaction';


function DataTable  () {
    const dispatch = useDispatch();

    const {myInfor} = useSelector(state=>state);
    const {transactions} = useSelector(state=>state.transaction);
    
    const viewTransaction =(index) =>{
      let data = {
        open: true,
        text: "VIEW",
        index,
        ...transactions[index]
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
        ...transactions[index]
      }
      dispatch(updateModal(data));
    }

    const deleteTransact =(index) =>{
      dispatch(deleteTransaction(index));
      console.log(index)
    }
    return (
      <div>
        {myInfor.role == "admin" ? <Button
          variant="contained"
          color="success"
          onClick={addTransact}
        >
          Add Transaction
        </Button>:''}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>View</TableCell>
              {(myInfor.role == "admin" || myInfor.role == "manager") ? <TableCell>Update</TableCell> : ''}
              {myInfor.role == "admin" ? <TableCell>Delete</TableCell> : ''}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.date}</TableCell>
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
                        onClick={()=>deleteTransact(index)}
                      >
                        Delete
                      </Button>
                    </TableCell> : ''}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TransactionModal />
      </div>
    );
  };
  
  export default DataTable;