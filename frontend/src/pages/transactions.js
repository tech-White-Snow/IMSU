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
import { TransactionsTable } from 'src/sections/transaction/transactions';
import { TransactionsSearch } from 'src/sections/transaction/transactions-search';
import { updateTransaction } from 'src/redux/action/modal';
import TransactionModal from 'src/modal/transactionModal';
import axios from 'axios';
import { BACKEND_URL } from 'src/Constant';
import { addTransactions } from 'src/redux/action/information';

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


//transaction component
const Page = () => {
  const data = useSelector(state=>state.transactions.transactions);

  //get logined user information 
  let MyInfor = JSON.parse(localStorage.getItem("user"));
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
  let customers = useCustomers( page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  
  

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const {transaction} = useSelector(state=>state.modal);
const dispatch = useDispatch();

//get transaction data
useEffect(()=>{
  async function fetchData(){try {
    const res = await axios.get(`${BACKEND_URL}/api/transactions`);
    
    const employees = res.data;
    dispatch(addTransactions(employees))
    // setData(employees);
    //setCustomers(useCustomers(page, rowsPerPage));
  }
  catch(err) {
    if(!err) console.log(err);
  };}
  fetchData();
}, [])


//callback function of add button click : only admin can do...
const handleAdd=()=>{
  let cus = {
    ...transaction,
    open: true,
    text: 'add'
  }
  dispatch(updateTransaction(cus));
}

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
                  Transaction history
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  
                </Stack>
              </Stack>
              <div>
                {MyInfor!=null ? MyInfor.role=="Admin" ? <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAdd}
                >
                  Add
                </Button> : "":''}
              </div>
            </Stack>
            {/* <TransactionsSearch /> */}
            <TransactionsTable
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
      <TransactionModal />
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
