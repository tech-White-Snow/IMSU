import React, { Component, useState } from "react";
import { Button, TextField, Link, MenuItem } from "@material-ui/core";
import { withRouter } from "./utils";
import {BACKEND_URL} from "./constant"
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

function Register(props) {

  const [stateInfor, setStateInfor] = useState({
    companyname: '',
    account: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    confirm_password: '',
    errors: ''
  });

  const onChange = (e) => setStateInfor({ 
    ...stateInfor,
    [e.target.name]: e.target.value }
  );

  const register = () => {
    axios.post(`${BACKEND_URL}/api/company`, {
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
        <h1 className="register-text login-text">Register Company</h1>
      </div>

      <div>
        <div>
          <h2 className="register-sep-text">Company Information</h2>
        </div>
        
        <TextField
          id="standard-basic"
          className="login-input"
          type="text"
          autoComplete="off"
          name="companyname"
          value={stateInfor.companyname}
          onChange={onChange}
          placeholder="Company Name"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          className="login-input"
          type="text"
          autoComplete="off"
          name="account"
          value={stateInfor.account}
          onChange={onChange}
          placeholder="Company account number"
          helperText="ex: 2023 0012 2341 1234 5"
          required
        />
        <br /><br />
        <div>
          <h2 className="register-sep-text">Admin Information</h2>
        </div>
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
        <p style={{color:'red'}}>{stateInfor.errors}</p>
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={stateInfor.username == '' && stateInfor.password == ''}
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
