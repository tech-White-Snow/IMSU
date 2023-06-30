import React, { useState } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import { withRouter } from "./utils";
import { useSelector } from "react-redux";

const axios = require("axios");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);


function Login(props) {
  const {users} = useSelector(state=>state.user); 
  const [user, setUser] = useState({
      email: '',
      password: ''
  });
 
  const onChange = (e) => setUser({ 
    ...user,
    [e.target.name]: e.target.value
  });

  const login = () => {
    // const pwd = bcrypt.hashSync(user.password, salt);

    // axios.post('http://localhost:2000/login', {
    //   email: user.email,
    //   password: pwd,
    // }).then((res) => {
    //   localStorage.setItem('token', res.data.token);
    //   localStorage.setItem('user_id', res.data.id);
    //   // this.props.history.push('/dashboard');
    //  // history.push("/dashboard");
    // }).catch((err) => {
    //   if (err.response && err.response.data && err.response.data.errorMessage) {
    //     swal({
    //       text: err.response.data.errorMessage,
    //       icon: "error",
    //       type: "error"
    //     });
    //   }
    // });
    users.forEach((user1, index)=>{
      if(user1.email===user.email){
        
        props.navigate("/dashboard");
      };
    })
  }

    return (
      <div className="login">
        <div>
          <h1 className="login-text">Login</h1>
        </div>

        <div>
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