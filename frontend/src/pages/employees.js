import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeesTable } from 'src/sections/employee/employees';
import { EmployeesSearch } from 'src/sections/employee/employees-search';
import EmployeeModal from 'src/modal/employModal';
import axios from 'axios';
import { BACKEND_URL } from 'src/Constant';
import { addEmployees } from 'src/redux/action/information';

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

const Page = () => {
  const dispatch = useDispatch();
  const data = useSelector(state=>state.users.users);
  const [data1, setData] = useState([
    {
      id: 1,
      name: "Hans Schmidt",
      email: "manager@example.com",
      gender: "Male",
      role: "Manager",  
      company: "Microsoft",
      company_id:"",
      avatar: '/assets/avatars/avatar-miron-vitold.png',
      password: "123456"
  },
  {
      id: 2,
      name: "Markus Wagner",
      email: "normal@example.com",
      gender: "Male",
      role: "Normal", 
      company: "Microsoft",
      company_id:"",
      avatar: '/assets/avatars/avatar-fran-perez.png',
      password: "123456"
  },
  ])
 
  
  let MyInfor = JSON.parse(localStorage.getItem("user"));
  const useCustomers = ( page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customers, setCustomers] = useState(useCustomers( page, rowsPerPage));
  useEffect(()=>{
    async function fetchData(){try {
      const res = await axios.get(`${BACKEND_URL}/api/users`);
      
      const employees = res.data;
      dispatch(addEmployees(employees))
      // console.log(res)
      setData(employees);
      setCustomers(useCustomers(page, rowsPerPage));
    }
    catch(err) {
      if(!err) console.log(err);
    };}
    fetchData();
  }, [])


  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers.map((customer) => customer.id);
      },
      [customers]
    );
  };

  
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  // const [modalData, setModal] = useState({
  //   open: false,
  //   text: "Update",
  //   name: "",
  //   gender:"",
  //   address:"",
  //   role:"",
  // });


  // const  closeModal=()=>{
  //   setModal({
  //     ...modalData,
  //     open:false
  //   })
  // }  

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handlModal = (action) =>{
    
  }

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
                  Employees
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  
                </Stack>
              </Stack>
              <div>
                {/* {MyInfor.role=="Admin" ? <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={()=>handlModal("add")}
                >
                  Add
                </Button> : ""} */}
              </div>
            </Stack>
            {/* <EmployeesSearch /> */}
            <EmployeesTable
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
              // setModal = {setModal}
            />
          </Stack>
        </Container>
      </Box>
      {/* <employModal 
        modal = {modalData}
        closeModal = {closeModal}
      /> */}
      <EmployeeModal />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
