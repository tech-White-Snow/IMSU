import React, { Component, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import all from '../constant';
import { withRouter } from '../utils';
import DataTable from '../component/DataTable';
import UserTable from '../component/UserTable';
import { useDispatch, useSelector } from 'react-redux';
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import CustomerTable from '../component/CustomerTable';
import { updateMyinfor } from '../redux/action/myInfor';
import "./Dashboard.css"
const axios = require('axios');

function Dashboard(props) {
  const dispatch = useDispatch();
  const {myInfor} = useSelector(state=>state)
  const [activeButton, setActiveButton] = useState('data');

  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  // useEffect() => {
  //   let token = localStorage.getItem('token');
  //   if (!token) {
  //     // this.props.history.push('/login');
  //     this.props.navigate("/login");
  //   } else {
  //     this.setState({ token: token }, () => {
  //       this.getProduct();
  //     });
  //   }
  // }
  useEffect(()=>{
    let user = localStorage.getItem('user');
    if(user=="null"||!user){ 
      navigate("/");
    }else{
      let parse_user = JSON.parse(user);
      dispatch(updateMyinfor(parse_user));
    }
  }, [])

  const  handleLogout = () =>{
    localStorage.setItem('user', null);
    console.log("ddd");
    navigate("/");
  }

  return(
    <div >
      {/* <div> */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className="dashboard-title">
            Dashboard
          </Typography>
          <div className="header-links">
            {myInfor.role != "normal" && <Button color="inherit" className="header-link" onClick={() => handleButtonClick('user')}>User</Button>}
            <Button color="inherit" className="header-link" onClick={() => handleButtonClick('data')}>Transaction</Button>
            <Button color="inherit" className="header-link" onClick={() => handleButtonClick('customer')}>Customer</Button>
            <Button color="inherit" className="header-link" onClick={handleLogout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
         
      <div className='dashboard'>
        {activeButton === 'data' && <DataTable />}
        {activeButton === 'customer' && <CustomerTable />}
        {activeButton === 'user' && myInfor.role != "normal" && <UserTable />}
      </div>
    </div>
  )

}

export default withRouter(Dashboard);
