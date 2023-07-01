import React, { Component, useState } from "react";
import { Button, TextField, Link, MenuItem } from "@material-ui/core";
import { withRouter } from "./utils";
import { useEffect } from "react";
import { BACKEND_URL } from "./constant";

const axios = require("axios");

const currencies = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];

const roles = [
  {role:"admin", value:"admin"}, 
  {role:"manager", value:"manager"},
  {role:"normal", value:"normal"}
];

function Register(props) {
  const [companies, setCompanies] = useState([
    {
      company: 'Amazon',
      account: "2222 22"
    },
    {
      company: 'Microsoft',
      account: "2222 22"
    },
  ]);
  const [stateInfor, setStateInfor] = useState({
    username: '',
    email: '',
    gender: '',
    company: 0,
    role: '',
    password: '',
    confirm_password: '',
    errors: 'd'
  });

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/company`, {
      
    }).then((res) => {
      setCompanies(res.data);
    }).catch((err) => {
      setStateInfor({
        ...stateInfor,
        errors:'No registered company. Please register company...'
      })
    });
  },[])

  const onChange = (e) => setStateInfor({ 
    ...stateInfor,
    [e.target.name]: e.target.value }
  );
  const register = () => {
    axios.post(`${BACKEND_URL}/api/user`, {
      // username: stateInfor.username,
      // password: stateInfor.password,
      stateInfor
    }).then((res) => {
      this.props.navigate("/");
    }).catch((err) => {
      setStateInfor({
        ...stateInfor,
        errors:'Failed registration. Please again...'
      })
    });
  }

  return (
    <div className="register">
      <div>
        <h1 className="register-text login-text">Register</h1>
      </div>

      <div>
        <p style={{color:'red'}}>{stateInfor.errors}</p>
        <TextField
          id="standard-basic"
          className="login-input"
          type="text"
          autoComplete="off"
          name="username"
          value={stateInfor.username}
          onChange={onChange}
          placeholder="User Name"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          className="login-input"
          type="text"
          autoComplete="off"
          name="email"
          value={stateInfor.email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <br /><br />
        <TextField
          id="outlined-select-currency"
          select
          className="login-input"
          defaultValue="Male"
          helperText="Please select your gender"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br /><br />
        <TextField
          id="outlined-select-currency"
          select
          className="login-input"
          defaultValue=""
          helperText="Please select your company"
        >
          {companies.map((option, index) => (
            <MenuItem key={index} value={index}>
              {option.company}
            </MenuItem>
          ))}
        </TextField>
        <br /><br />
        <TextField
          id="outlined-select-currency"
          select
          className="login-input"
          defaultValue=""
          helperText="Please select your role"
        >
          {roles.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.role}
            </MenuItem>
          ))}
        </TextField>
        <br /><br />
        <TextField
          id="standard-basic"
          className="login-input"
          type="password"
          autoComplete="off"
          name="password"
          value={stateInfor.password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          className="login-input"
          type="password"
          autoComplete="off"
          name="confirm_password"
          value={stateInfor.confirm_password}
          onChange={onChange}
          placeholder="Confirm Password"
          required
        />
        <br /><br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={stateInfor.username == '' || stateInfor.password != stateInfor.confirm_password}
          onClick={register}
        >
          Register
        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link
          // href="/"
          component="button"
          style={{ fontFamily: "inherit", fontSize: "inherit" }}
          onClick={() => {
            props.navigate("/");
          }}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Register);
