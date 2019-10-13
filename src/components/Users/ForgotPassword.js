import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
// import "./Auth.css";
import Navigation from '../Navigation'
import { useSelector, useDispatch } from "react-redux";
import { ForgotPassword } from '../../actions/authAction';
import { Redirect, Link } from 'react-router-dom';
import Message from '../utils/Message';


const PasswordForgot = () => {

  const currentState = useSelector((state) => state.Auth);

  const [email, setEmail] = useState('');
  const dispatch = useDispatch()

  const forgotPass = (userEmail) => dispatch(ForgotPassword(userEmail))

  const handleChange = e => {
    setEmail(e.target.value)
  }

  const submitRequest = (e) => {
    e.preventDefault()
    forgotPass({
      email
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
          <CardHeader>Forgot Password</CardHeader>
          <CardBody>
        
          <FormGroup>
            { currentState.successMessage != null && currentState.authError == null ? (
              <span>
              <Message msg={currentState.successMessage} />
              </span>
              ) : (
                ""
            )}
          </FormGroup>

          <form onSubmit={submitRequest}>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            { currentState.authError && currentState.authError.Required_email ? (
              <small className="color-red">{ currentState.authError.Required_email }</small>
              ) : (
                ""
            )}
            { currentState.authError && currentState.authError.No_email ? (
              <small className="color-red">{currentState.authError.No_email}</small>
              ) : (
                ""
            )}
            { currentState.authError && currentState.authError.Invalid_email ? (
              <small className="color-red">{ currentState.authError.Invalid_email }</small>
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
                Sending Request...
              </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
                disabled={ email === ""}

              >
                Reset Password
            </Button>
            )}
            </form>
            <div className="mt-2" style={{display: "flex", justifyContent: "space-between"}}>
              <div>
                <small><Link to="/signup">Sign Up</Link></small>
              </div>
              <div>
                <small><Link to="/login">Login</Link></small>
              </div>
            </div>
            </CardBody>
          </Card>
        </div>
      </div>
  );
}

export default PasswordForgot
