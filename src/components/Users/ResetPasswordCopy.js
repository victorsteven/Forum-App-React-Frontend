import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
// import "./Auth.css";
import Navigation from '../Navigation'
import { useSelector, useDispatch } from "react-redux";
import { ResetPassword } from '../../actions/authAction';
import { Redirect, Link } from 'react-router-dom';

import Message from '../utils/Message';



const PasswordReset = () => {


  const currentState = useSelector((state) => state.Auth);

  const [resetDetails, setResetDetails] = useState({
    new_password: '',
    retype_password: ''
  });

  const dispatch = useDispatch()

  const resetPass = (details) => dispatch(ResetPassword(details))

  const handleChange = e => {
    setResetDetails({
      ...resetDetails,
      [e.target.name]: e.target.value
    })
  }

  const submitRequest = (e) => {
    e.preventDefault()
    resetPass({
      token: resetDetails.token,
      new_password: resetDetails.new_password,
      retype_password: resetDetails.retype_password
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
          <CardHeader>Reset Password</CardHeader>
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
            <FormGroup>
            { currentState.authError && currentState.authError.Invalid_token ? (
              <span>
                <small className="color-red">{currentState.authError.Invalid_token}</small>
                <small className="ml-2"><Link to="/forgotpassword">here </Link></small>
              </span>
              ) : (
                ""
            )}
            { currentState.authError && currentState.authError.Empty_passwords ? (
              <small className="color-red">{currentState.authError.Empty_passwords}</small>
              ) : (
                ""
            )}
            { currentState.authError && currentState.authError.Invalid_Passwords ? (
              <small className="color-red">{ currentState.authError.Invalid_Passwords }</small>
              ) : (
                ""
            )}
            { currentState.authError && currentState.authError.Password_unequal ? (
              <small className="color-red">{ currentState.authError.Password_unequal }</small>
              ) : (
                ""
            )}
            </FormGroup>

            <form onSubmit={submitRequest}>
            <FormGroup>
              <Label>New Password</Label>
              <Input type="password" name="new_password" onChange={handleChange} />
              </FormGroup>
              <FormGroup>
              <Label>Retype Password</Label>
              <Input type="password" name="retype_password" onChange={handleChange} />
              </FormGroup>
              { currentState.isLoading ? (
                <Button
                  color="primary"
                  type="submit"
                  block
                  disabled
                >
                  Reseting...
                </Button>
              ) : (
                <Button
                  color="primary"
                  type="submit"
                  block
                  disabled={ resetDetails.new_password === "" || resetDetails.retype_password === ""  }
                >
                  Save Password
              </Button>
              )}
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
  );
}

export default PasswordReset
