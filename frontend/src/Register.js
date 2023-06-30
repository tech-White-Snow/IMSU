import React, { Component, useState } from "react";
import swal from "sweetalert";
import { Button, TextField, Link, MenuItem } from "@material-ui/core";
import { withRouter } from "./utils";
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

const companies = [
  {
    company: 'Amazon',
    value: 0,
  },
  {
    company: 'Microsoft',
    value: 1,
  },
]

const roles = [
  {role:"admin", value:0}, 
  {role:"manager", value:1},
  {role:"normal", value:2}
];

function Register(props) {

  const [stateInfor, setStateInfor] = useState({
    username: '',
    email: '',
    gender: '',
    company: 0,
    role: '',
    password: '',
    confirm_password: ''
  });

  const onChange = (e) => setStateInfor({ 
    ...stateInfor,
    [e.target.name]: e.target.value }
  );

  const register = () => {

    axios.post('http://localhost:2000/register', {
      // username: stateInfor.username,
      // password: stateInfor.password,
      stateInfor
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      // this.props.history.push('/');
      this.props.navigate("/");
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  return (
    <div className="register">
      <div>
        <h1 className="register-text">Register</h1>
      </div>

      <div>
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
          {companies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
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
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
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
