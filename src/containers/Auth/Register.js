import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Auth.css";
import NavbarClass from '../NavbarClass'
import { useSelector, useDispatch } from "react-redux";
import { SignUp } from '../../actions/authAction';


const Register = () => {

  const currentState = useSelector((state) => state);

  const [user, setUser] = useState({
    username:'',
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const addUser = (credentials) => dispatch(SignUp(credentials))

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
  }

    return (
      
      <div className="App">
        <div>
          <NavbarClass />
        </div>
        <div>
          {console.log("this is the error frontend: ", currentState.auth.authError)}
        </div>
        <div className="Auth">
        <Card className="card-style">
          <CardHeader>Add a new user</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>User Name</Label>
            <Input type="text" name="username" placeholder="Enter username"  onChange={handleChange}/>
            { currentState.auth.authError && currentState.auth.authError.Required_username ? (
              <small className="color-red">{currentState.auth.authError.Required_username}</small>
              ) : (
                ""
              )}
              { currentState.auth.authError && currentState.auth.authError.Taken_username ? (
              <small className="color-red">{ currentState.auth.authError.Taken_username }</small>
              ) : (
                ""
              )}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            { currentState.auth.authError && currentState.auth.authError.Required_email ? (
              <small className="color-red">{currentState.auth.authError.Required_email}</small>
              ) : (
                ""
            )}
            { currentState.auth.authError && currentState.auth.authError.Invalid_email ? (
              <small className="color-red">{ currentState.auth.authError.Invalid_email }</small>
              ) : (
                ""
            )}
            { currentState.auth.authError && currentState.auth.authError.Taken_email ? (
              <small className="color-red">{ currentState.auth.authError.Taken_email }</small>
              ) : (
                ""
            )}
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            { currentState.auth.authError && currentState.auth.authError.Required_password ? (
              <small className="color-red">{ currentState.auth.authError.Required_password }</small>
              ) : (
                ""
              )}
              { currentState.auth.authError && currentState.auth.authError.Invalid_password ? (
              <small className="color-red">{ currentState.auth.authError.Invalid_password }</small>
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
