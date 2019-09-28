import React, { useState } from "react";
// import axios from 'axios'
// import API_ROUTE from "../../apiRoute";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Auth.css";
import NavbarClass from '../NavbarClass'

import { useSelector, useDispatch } from "react-redux";
import { SignUp } from '../../actions/authAction';


const Login = () => {

  const [user, setUser] = useState({
    username:'',
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const addUser = (credentials) => dispatch(SignUp(credentials))
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
    setUser('');


    // let newUser = {
    //   username:  this.state.username,
    //   email:  this.state.email,
    //   password:  this.state.password
    // }

    // axios.post(`${API_ROUTE}/users`, newUser).then(res => {
    //   this.setState({ username: '', email: '', password: '' })
    //   this.props.history.push("/login")
    // }).catch(error => {
    //   if(error){
    //     console.log("this is the error: ", error)
    //     let errorMessages = error.response.data.error
    //     let { errors } = this.state
    
    //     if(errorMessages["Required_username"] !== ""){
    //       errors['required_username'] = errorMessages["Required_username"]
    //     }
    //     if(errorMessages["Required_email"] !== ""){
    //       errors['required_email'] = errorMessages["Required_email"]
    //     }
    //     if(errorMessages["Required_password"] !== ""){
    //       errors['required_password'] = errorMessages["Required_password"]
    //     }
    //     if(errorMessages["Invalid_email"] !== ""){
    //       errors['invalid_email'] = errorMessages["Invalid_email"]
    //     }
    //     if(errorMessages["Taken_email"] !== ""){
    //       errors['taken_email'] = errorMessages["Taken_email"]
    //     }
    //     if(errorMessages["Taken_username"] !== ""){
    //       errors['taken_username'] = errorMessages["Taken_username"]
    //     }
    //     if(errorMessages["Invalid_password"] !== ""){
    //       errors['invalid_password'] = errorMessages["Invalid_password"]
    //     }
    //     this.setState({errors: errors});
    //   }
    // }) 
  }

    return (
      <div className="App">
        <div>
          <NavbarClass />
        </div>
        <div className="Auth">
        <Card className="card-style">
          <CardHeader>Add a new user</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>User Name</Label>
            <Input type="text" name="username" placeholder="Enter username"  onChange={handleChange}/>
            {/* { this.state.errors.required_username ? (
              <small className="color-red">{this.state.errors.required_username}</small>
              ) : (
                ""
              )}
              { this.state.errors.taken_username ? (
              <small className="color-red">{this.state.errors.taken_username}</small>
              ) : (
                ""
              )} */}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            {/* { this.state.errors.required_email ? (
              <small className="color-red">{this.state.errors.required_email}</small>
              ) : (
                ""
            )}
            { this.state.errors.invalid_email ? (
              <small className="color-red">{this.state.errors.invalid_email}</small>
              ) : (
                ""
            )}
            { this.state.errors.taken_email ? (
              <small className="color-red">{this.state.errors.taken_email}</small>
              ) : (
                ""
            )} */}
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            {/* { this.state.errors.required_password ? (
              <small className="color-red">{this.state.errors.required_password}</small>
              ) : (
                ""
              )}
              { this.state.errors.invalid_password ? (
              <small className="color-red">{this.state.errors.invalid_password}</small>
              ) : (
                ""
              )} */}
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

export default Login
