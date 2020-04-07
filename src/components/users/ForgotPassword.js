import React, { useState } from "react";
import { Label, FormGroup, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

import Navigation from '../Navigation'
import { ForgotPassword } from '../../store/modules/auth/actions/authAction';
import Message from '../utils/Message';



const PasswordForgot = () => {

  const currentState = useSelector((state) => state.Auth);

  const [email, setEmail] = useState('');
  const dispatch = useDispatch()

  const forgotPass = (userEmail) => dispatch(ForgotPassword(userEmail, clearInput))

  const handleChange = e => {
    setEmail(e.target.value)
  }

  const clearInput = () => {
    setEmail('')
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
    <div className="App" id="page-container">
      <div>
        <Navigation />
      </div>
      <div className="container Auth">
        <Card className="card-style">
          <CardHeader>Forgot Password</CardHeader>
          <CardBody>
        
          <FormGroup>
            { currentState.successMessage != null && currentState.forgotError == null ? (
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
              <input type="email" name="email" className="form-control" data-test="inputEmail" placeholder="Enter email" value={email} onChange={handleChange} />
              { currentState.forgotError && currentState.forgotError.Required_email ? (
                <small className="color-red">{ currentState.forgotError.Required_email }</small>
                ) : (
                  ""
              )}
              { currentState.forgotError && currentState.forgotError.No_email ? (
                <small className="color-red">{currentState.forgotError.No_email}</small>
                ) : (
                  ""
              )}
              { currentState.forgotError && currentState.forgotError.Invalid_email ? (
                <small className="color-red">{ currentState.forgotError.Invalid_email }</small>
                ) : (
                  ""
              )}
              </FormGroup>
              
              { currentState.isLoading ? (
              <button
                className="btn btn-primary w-100"
                color="primary"
                type="submit"
                disabled
              >
                Sending Request...
              </button>
            ) : (
              <button
                data-test='resetButton'
                className="btn btn-primary w-100"
                color="primary"
                type="submit"
                disabled={ email === ""}
              >
                Reset Password
            </button>
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
