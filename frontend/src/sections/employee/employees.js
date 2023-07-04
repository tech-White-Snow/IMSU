import PropTypes from 'prop-types';
import {useMemo} from 'react';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from 'src/redux/action/modal';
import { addEmployees } from 'src/redux/action/information';
import axios from 'axios';
import { BACKEND_URL } from 'src/Constant';
import { useState } from 'react';
import { applyPagination } from 'src/utils/apply-pagination';

export const EmployeesTable = (props) => {
  let {
    count = 0,
    //items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const items = useSelector(state=>state.users.users);
  const useCustomers = (data, page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };
  
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  let MyInfor = JSON.parse(localStorage.getItem("user"));
  
  const dispatch = useDispatch();
  const handleModal=(action, employee, index)=>{
    let modal = {
      text: action,
      open: true,
      ...employee
    }
    dispatch(updateEmployee(modal));
  }

  const deleteHandle=async(index)=>{
    // axios.delete(`${process.env.SERVER_URL}/api/users/${index}`)
    //   .then((res) => {
    //     dispatch(addEmployees(res.data));
    //   })
    //   .catch((err) => {
    //     // Handle any errors that occur during the request
    //     console.error(err);
    //   });
    try {
   
      const res = await axios.delete(`${BACKEND_URL}/api/users/${index}`);
                  
      console.log("object")
      const employees = res.data;
      dispatch(addEmployees(employees));
    
      handleClose();
    }
    catch(err) {
        if(!err) console.log(err);
      };
  }
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Gender
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(items)}
              {items.map((Employee,index) => {
                const isSelected = selected.includes(Employee.id);
                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(Employee.id);
                          } else {
                            onDeselectOne?.(Employee.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={Employee.avatar}>
                          {getInitials(Employee.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {Employee.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {Employee.email}
                    </TableCell>
                    <TableCell>
                      {Employee.gender}
                    </TableCell>
                    <TableCell>
                      {Employee.role}
                    </TableCell>
                    <TableCell
                      style={{
                        paddingRight: "5px",
                        marginRight: "5px"
                      }}
                      >
                      <Button
                        variant="contained"
                        sx={{
                          display: 'inline-flex',
                          height: 32,
                          width: 0,
                        }}
                        style={{
                          padding: "0px",
                          margin: "5px"
                        }}
                        onClick={()=>handleModal("view",Employee, index+page*rowsPerPage)}
                      >
                            View
                      </Button>
                      {MyInfor!=null? MyInfor.role != "Normal" ? <Button
                        variant="contained"
                        sx={{
                          display: 'inline-flex',
                          height: 32,
                          width: 0,
                          padding: "5px"
                        }}
                        style={{
                          padding: "0px",
                          margin: "5px"
                        }}
                        onClick={()=>handleModal("update", Employee, index+page*rowsPerPage)}
                      >
                            Update
                      </Button>:"":''}
                    {MyInfor!=null? MyInfor.role == "Admin" ? <Button
                        variant="contained"
                        sx={{
                          display: 'inline-flex',
                          height: 32,
                          width: 0,
                          padding: "5px"
                        }}
                        style={{
                          padding: "0px",
                          margin: "5px"
                        }}
                        onClick={()=>deleteHandle(Employee._id)}
                      >
                            Delete
                      </Button>:"":''}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

EmployeesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
