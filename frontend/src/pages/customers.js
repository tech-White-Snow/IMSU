import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, FormControl,Select,MenuItem, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useDispatch, useSelector } from 'react-redux';
import CustomerModal from 'src/modal/customerModal';
import { updateCustomer } from 'src/redux/action/modal';
import { BACKEND_URL } from 'src/Constant';
import axios from 'axios';
import { addCustomer, addCustomers } from 'src/redux/action/information';

const now = new Date();


// const data = [
//   {
//     id: '5e8680e60cba5019c5ca6fda',
//     address: {
//       city: 'Salt Lake City',
//       country: 'USA',
//       state: 'Utah',
//       street: '368 Lamberts Branch Road'
//     },
//     avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
//     createdAt: subDays(subHours(now, 1), 9).getTime(),
//     email: 'nasimiyu.danai@devias.io',
//     name: 'Nasimiyu Danai',
//     phone: '801-301-7894'
//   },
// ];



//customer component

const Page = () => {
  const dispatch = useDispatch();
  const data = useSelector(state=>state.customers.customers);

  //get logined user's information
  let MyInfor = JSON.parse(localStorage.getItem("user"));
  
  //pagination setting
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };


  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers.map((customer) => customer.id);
      },
      [customers]
    );
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const {customer} = useSelector(state=>state.modal);

  const [username, setUsername] = useState("");

  const handleChange = (e) => setUsername(e.target.value);

  const [users, setUsers] = useState([]);

  async function fetchData(){
    try {
     
   // console.log('object')
    if(!MyInfor) { 
      dispatch(addCustomers([]));
      return ;
    }
   // console.log('object')
    const res = await axios.get(`${BACKEND_URL}/api/company/customer/${MyInfor.company}`);

    const customer = res.data;
    //console.log(customer)
   // console.log(res)
    dispatch(addCustomers(customer));
  }
  catch(err) {
    if(!err) console.log(err);
  };}

  const ifOurCustomer = (id) =>{
    console.log(customers)
    if(customers.length==0) return false;
    let res = false;

    console.log(id)
    customers.map((u, index)=>{
      if(u._id==id) res = true;
    })

    return res;
  }

  async function fetchUsers(){try {
   // console.log('object')
    const res = await axios.get(`${BACKEND_URL}/api/users/`);
   // console.log(res)
    let userss = [];
    if(res.data.length) {
      res.data.map((u, index)=>{
        if(u.company!=MyInfor.company){
          console.log(u._id)
          const r = ifOurCustomer(u._id);
          console.log(r)
          if(!r)  {
            userss = [
              ...userss,
              u
            ]}
        }
      })
    }

    //console.log(userss)
    setUsers(userss);
  }
  catch(err) {
    if(!err) console.log(err);
  };}

  //get customer's data every component called
  useEffect(()=>{

    fetchUsers();
    fetchData();
  }, [])

  //callback function called by click add function : only admin can do
  const handleAdd = async () => {
    try {
      // console.log('object')
      const reqBody = {
        customer_id: username,
        companyname: MyInfor.company
      }
       const res = await axios.post(`${BACKEND_URL}/api/company/customer`, reqBody);
       //console.log(res)
       dispatch(addCustomer(res.data))
     }
     catch(err) {
       if(!err) console.log(err);
     };

  }
  
  //pagination function
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  //pagination function
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Customers | IM Serve
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  
                </Stack>
              </Stack>
              <div>
                {MyInfor!=null&&MyInfor? MyInfor.role=="Admin" ? <div>
                  <FormControl fullWidth 
                    sx={{
                      width: '300px',
                      marginRight: '5px'
                    }}
                  >
                    <Select   
                      name="username"
                      value={username}
                      onChange={handleChange}
                      onClick={fetchData}
                      sx={{
                        height: '43px'
                      }}
                    >
                      {users.length&&users.map((user, index)=>{
                        return <MenuItem key = {index} value={user._id}>{user.name}</MenuItem>
                      })}
                      {/* <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem> */}
                    </Select>
                  </FormControl>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    onClick={handleAdd}
                  >
                    Add
                  </Button></div> : "" :''}
              </div>
            </Stack>
            {/* <CustomersSearch /> */}
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
      <CustomerModal />
    </>
  );
};

//get layout of page
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
