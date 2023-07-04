import PropTypes from 'prop-types';
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
import { updateCustomer } from 'src/redux/action/modal';
import { addCustomers ,deleteCustomer} from 'src/redux/action/information';
import axios from 'axios';
import { BACKEND_URL } from 'src/Constant';

export const CustomersTable = (props) => {
  const {
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
  const items = useSelector(state=>state.customers.customers);

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  let MyInfor = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const handleModal=(action, customer, index)=>{
    let modal = {
      text: action,
      open: true,
      ...customer
    }
    
    dispatch(updateCustomer(modal));
  }
  const deleteHandle=async(index)=>{
    // axios.delete(`${process.env.SERVER_URL}/api/customers/${index}`)
    //   .then((res) => {
    //     dispatch(addCustomers(res.data));
    //   })
    //   .catch((err) => {
    //     // Handle any errors that occur during the request
    //     console.error(err);
    //   });
    try {

      const res = await axios.delete(`${BACKEND_URL}/api/customers/${index}`);
                  
      console.log("object")
      const employees = res.data;
      dispatch(addCustomers(employees));
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
                  Location
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, index) => {
                const isSelected = selected.includes(customer.id);
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
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
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
                        <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.address}
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
                        onClick={()=>handleModal("view",customer,index+page*rowsPerPage)}
                      >
                            View
                      </Button>
                      { MyInfor!=null? MyInfor.role != "Normal" ? <Button
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
                        onClick={()=>handleModal("update",customer, index+page*rowsPerPage)}
                      >
                            Update
                      </Button>:"":''}
                    { MyInfor!=null?MyInfor.role == "Admin" ? <Button
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
                        onClick={()=>deleteHandle(customer._id)}
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

CustomersTable.propTypes = {
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
