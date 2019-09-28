import React, { Component } from "react";
import axios from 'axios'
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Auth.css";
import NavbarClass from '../NavbarClass'
import API_ROUTE from "../../apiRoute";


export default class Login extends Component {

    state = {
      email: '',
      password: '',
      errors: {
        required_email: '',
        required_password: '',
        invalid_email: '',
        incorrect_details: ''
    }
  }

  // validateForm() {
  //   return this.state.email.length > 0 && this.state.password.length > 0;
  // }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  loginUser = (e) => {
    e.preventDefault()
    let loginDetails = {
      email:  this.state.email,
      password:  this.state.password
    }
    axios.post(`${API_ROUTE}/login`, loginDetails).then(res => {
    this.setState({ email: '', password: '' })
    this.props.history.push("/")
    }).catch(error => {
    console.log("this is the error: ", error.response.data.error)
    let errorMessages = error.response.data.error
    let { errors } = this.state
    if(errorMessages["Required_email"] !== ""){
      errors['required_email'] = errorMessages["Required_email"]
    }
    if(errorMessages["Required_password"] !== ""){
      errors['required_password'] = errorMessages["Required_password"]
    }
    if(errorMessages["Invalid_email"] !== ""){
      errors['invalid_email'] = errorMessages["Invalid_email"]
    }
    if(errorMessages["Incorrect_details"] !== ""){
      errors['incorrect_details'] = errorMessages["Incorrect_details"]
    }
    this.setState({errors: errors});
    }) 
  }

  render() {
    return (
      <div className="App">
        <div>
          <NavbarClass />
        </div>
        <div className="Auth">
        <Card className="card-style">
          <CardHeader>Add a new user</CardHeader>
          <CardBody>
          <form onSubmit={this.loginUser}>
          <FormGroup>
          { this.state.errors.incorrect_details ? (
              <small className="color-red">{this.state.errors.incorrect_details}</small>
              ) : (
                ""
            )}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" id="email" placeholder="Enter email" onChange={this.handleChange} />
            { this.state.errors.required_email ? (
              <small className="color-red">{this.state.errors.required_email}</small>
              ) : (
                ""
            )}
            { this.state.errors.invalid_email ? (
              <small className="color-red">{this.state.errors.invalid_email}</small>
              ) : (
                ""
            )}
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input type="password" id="password" placeholder="Enter password" onChange={this.handleChange}/>
            { this.state.errors.required_password ? (
              <small className="color-red">{this.state.errors.required_password}</small>
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
}
