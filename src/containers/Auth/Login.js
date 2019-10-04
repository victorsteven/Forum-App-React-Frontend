import React, { useState } from "react";
// import axios from 'axios'
// import API_ROUTE from "../../apiRoute";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Auth.css";
import NavbarClass from '../NavbarClass'

import { useSelector, useDispatch } from "react-redux";
import { SignIn } from '../../actions/authAction';


const Login = () => {

  const errorMsg = useSelector((state) => state);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const userLogin = (credentials) => dispatch(SignIn(credentials))
  // constructor(props) {
  //   super(props);

  //   state = {
  //     username: '',
  //     email: '',
  //     password: '',
  //     errors: {
  //       required_username: '',
  //       required_email: '',
  //       required_password: '',
  //       invalid_email: '',
  //       taken_email: '',
  //       taken_username: '',
  //       invalid_password:''
  //   }
  // }

  // validateForm() {
  //   return this.state.email.length > 0 && this.state.password.length > 0;
  // }

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    userLogin({
      email: user.email,
      password: user.password
    });
    // setUser('');

  }

    return (
      <div className="App">
        <div>
          <NavbarClass />
        </div>
        <div className="Auth">
        <Card className="card-style">
          <CardHeader>Login</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <div>
            { errorMsg.auth.authError && errorMsg.auth.authError.Incorrect_details ? (
              <small className="color-red">{errorMsg.auth.authError.Incorrect_details}</small>
              ) : (
                ""
            )}
          </div>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            { errorMsg.auth.authError && errorMsg.auth.authError.Required_email ? (
              <small className="color-red">{errorMsg.auth.authError.Required_email}</small>
              ) : (
                ""
            )}
            { errorMsg.auth.authError && errorMsg.auth.authError.Invalid_email ? (
              <small className="color-red">{ errorMsg.auth.authError.Invalid_email }</small>
              ) : (
                ""
            )}
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            { errorMsg.auth.authError && errorMsg.auth.authError.Required_password ? (
              <small className="color-red">{ errorMsg.auth.authError.Required_password }</small>
              ) : (
                ""
              )}
              { errorMsg.auth.authError && errorMsg.auth.authError.Invalid_password ? (
              <small className="color-red">{ errorMsg.auth.authError.Invalid_password }</small>
              ) : (
                ""
              )}
            </FormGroup>
            <Button
              color="primary"
              type="submit"
              block
            >
              Login
            </Button>
            </form>
            </CardBody>
          </Card>
        </div>
        </div>
    );
}

export default Login
