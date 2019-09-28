import React, { useState, useEffect } from "react";
// import axios from 'axios'
// import API_ROUTE from "../../apiRoute";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Auth.css";
import NavbarClass from '../NavbarClass'
// import { fetchPosts } from '../../actions/authAction';


import { useSelector, useDispatch } from "react-redux";
import { SignUp } from '../../actions/authAction';


const Register = () => {

  const errorMsg = useSelector((state) => state);

  const [user, setUser] = useState({
    username:'',
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const addUser = (credentials) => dispatch(SignUp(credentials))

  // useEffect(() => {
  //   addUser();
  // })
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
    addUser({
      username: user.username,
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
        <div>
          {console.log("this is the error frontend: ", errorMsg.auth.authError)}
        </div>
        <div className="Auth">
        <Card className="card-style">
          <CardHeader>Add a new user</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>User Name</Label>
            <Input type="text" name="username" placeholder="Enter username"  onChange={handleChange}/>
            { errorMsg.auth.authError && errorMsg.auth.authError.Required_username ? (
              <small className="color-red">{errorMsg.auth.authError.Required_username}</small>
              ) : (
                ""
              )}
              { errorMsg.auth.authError && errorMsg.auth.authError.Taken_username ? (
              <small className="color-red">{ errorMsg.auth.authError.Taken_username }</small>
              ) : (
                ""
              )}
          </FormGroup>
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
            { errorMsg.auth.authError && errorMsg.auth.authError.Taken_email ? (
              <small className="color-red">{ errorMsg.auth.authError.Taken_email }</small>
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
              Add User
            </Button>
            </form>
            </CardBody>
          </Card>
        </div>
        </div>
    );
}

export default Register
