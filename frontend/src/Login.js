import React, { useState, useEffect } from "react";
import { Button, TextField, Link } from "@material-ui/core";
import { withRouter } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { updateMyinfor } from "./redux/action/myInfor";
import { updateOpen } from "./redux/action/modalAction";
import {BACKEND_URL} from './constant';
import { addUsers } from "./redux/action/userAction";
import { addCustomers } from "./redux/action/customerAction";
import { addTransactions } from "./redux/action/transaction";
import './style/Login.css';

const axios = require("axios");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

function Login(props) {
  const dispatch = useDispatch();
  const {users} = useSelector(state=>state.user); 
  const {myInfor} = useSelector(state=>state); 
  const [user, setUser] = useState({
      inVilid: false,
      email: '',
      password: ''
  });
 
  const onChange = (e) => setUser({
    ...user,
    [e.target.name]: e.target.value
  });

  const getEmployments=(user)=>{
    axios.get(`${BACKEND_URL}/api/users/:${user.company_id}`, {
      // username: stateInfor.username,
      // password: stateInfor.password,
    }).then((res) => {
      dispatch(addUsers(res.data))
    }).catch((err) => {

    });
  } 

  const getCustomers=(user)=>{
    axios.get(`${BACKEND_URL}/api/customers/:${user.company_id}`, {
      // username: stateInfor.username,
      // password: stateInfor.password,
    }).then((res) => {
      dispatch(addCustomers(res.data))
    }).catch((err) => {
      
    });
  } 

  const getTransactionHistory=(user)=>{
    axios.get(`${BACKEND_URL}/api/transactions/:${user.company_id}`, {
      // username: stateInfor.username,
      // password: stateInfor.password,
    }).then((res) => {
      dispatch(addTransactions(res.data))
    }).catch((err) => {
      
    });
  } 

  const login = () => {
    axios.post(`${BACKEND_URL}/api/user/login`, {
      // username: stateInfor.username,
      // password: stateInfor.password,
      user
    }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      getCustomers(res.data);
      getEmployments(res.data);
      getTransactionHistory(res.data);
      this.props.navigate("/dashboard");
    }).catch((err) => {
      setUser({
        ...user,
        inVilid:true
      })
    });
    // const pwd = bcrypt.hashSync(user.password, salt);

    // axios.post('http://localhost:2000/login', {
    //   email: user.email,
    //   password: pwd,
    // }).then((res) => {
    users.forEach((user1, index) => {
      if (user1.email === user.email && user1.password === user.password) {
        //console.log(user1);
        dispatch(updateMyinfor(user1));
        localStorage.setItem('user', JSON.stringify(user1));
        props.navigate("/dashboard");
      }
    });
    setUser({ 
      ...user,
      inVilid: true
    });
  };

    return (
      <div className="login">
        <div>
          <h1 className="login-text">Login</h1>
        </div>

        <div>
          {user.inVilid ? <p className="invalid-text">Wrong email or password</p>:""}
          <TextField
            id="standard-basic"
            type="text"
            className="login-input input-email"
            autoComplete="off"
            name="email"
            value={user.email}
            onChange={onChange}
            placeholder="Email"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            className="login-input"
            name="password"
            value={user.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={user.email == '' && user.password == ''}
            onClick={login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/createcompany"
            className="button_style"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              props.navigate("/createcompany");
            }}
          >
            Company
          </Link>
          <Link
            // href="/register"
            className="button_style"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              props.navigate("/register");
            }}
          >
            Register
          </Link>
        </div>
      </div>
    );
}

export default withRouter(Login);