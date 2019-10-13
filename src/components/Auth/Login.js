import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Auth.css";
import Navigation from '../Navigation'
import { useSelector, useDispatch } from "react-redux";
import { SignIn } from '../../actions/authAction';
import { Redirect, Link } from 'react-router-dom';



const Login = () => {

  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const userLogin = (credentials) => dispatch(SignIn(credentials))

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
  }

  if(currentState.isAuthenticated){
    return <Redirect to='/' />
  }

    return (
      <div className="App">
        <div>
          <Navigation />
        </div>
        <div className="container Auth">
        <Card className="card-style">
          <CardHeader>Login</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <div>
            { currentState.authError && currentState.authError.Incorrect_details ? (
              <small className="color-red">{currentState.authError.Incorrect_details}</small>
              ) : (
                ""
            )}
          </div>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            { currentState.authError && currentState.authError.Required_email ? (
              <small className="color-red">{currentState.authError.Required_email}</small>
              ) : (
                ""
            )}
            { currentState.authError && currentState.authError.Invalid_email ? (
              <small className="color-red">{ currentState.authError.Invalid_email }</small>
              ) : (
                ""
            )}
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            { currentState.authError && currentState.authError.Required_password ? (
              <small className="color-red">{ currentState.authError.Required_password }</small>
              ) : (
                ""
              )}
              { currentState.authError && currentState.authError.Invalid_password ? (
              <small className="color-red">{ currentState.authError.Invalid_password }</small>
              ) : (
                ""
              )}
              { currentState.authError && currentState.authError.Incorrect_password ? (
              <small className="color-red">{ currentState.authError.Incorrect_password }</small>
              ) : (
                ""
              )}
            </FormGroup>

            { currentState.isLoading ? (
              <Button
                color="primary"
                type="submit"
                block
                disabled
              >
                Login...
              </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
              >
                Login
            </Button>
            )}
            </form>
            <div className="mt-2" style={{display: "flex", justifyContent: "space-between"}}>
              <div>
                <small><Link to="/signup">Sign Up</Link></small>
              </div>
              <div>
                <small><Link to="/forgotpassword">Forgot Password?</Link></small>
              </div>
            </div>
           
            </CardBody>
          </Card>
        </div>
        </div>
    );
}

export default Login
