import React, { Component } from "react";
import axios from 'axios'
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Auth.css";
import NavbarClass from './NavbarClass'


export default class Signup extends Component {
  // constructor(props) {
  //   super(props);

    state = {
      nickname: '',
      email: '',
      password: '',
      errors: {
        required_nickname: '',
        required_email: '',
        required_password: '',
        invalid_email: '',
        taken_email: '',
        taken_nickname: ''
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  addUser = (e) => {
    e.preventDefault()
    let newBook = {
      nickname:  this.state.nickname,
      email:  this.state.email,
      password:  this.state.password
    }
    axios.post('http://localhost:8080/users', newBook).then(res => {
    let { users } = this.state
    users.push(res.data.response)
    this.setState({ users, newUserModal: false, nickname: '', email: '', password: '' })
    }).catch(error => {
    let errorMessages = error.response.data.error
    let { errors } = this.state

    if(errorMessages["Required_nickname"] !== ""){
      errors['required_nickname'] = errorMessages["Required_nickname"]
    }
    if(errorMessages["Required_email"] !== ""){
      errors['required_email'] = errorMessages["Required_email"]
    }
    if(errorMessages["Required_password"] !== ""){
      errors['required_password'] = errorMessages["Required_password"]
    }
    if(errorMessages["Invalid_email"] !== ""){
      errors['invalid_email'] = errorMessages["Invalid_email"]
    }
    if(errorMessages["Taken_email"] !== ""){
      errors['taken_email'] = errorMessages["Taken_email"]
    }
    if(errorMessages["Taken_nickname"] !== ""){
      errors['taken_nickname'] = errorMessages["Taken_nickname"]
    }
    this.setState({errors: errors});
    }) 
  }

  render() {
    return (

      <div className="App container">
        <div>
          <NavbarClass />
        </div>
        <div className="Auth">
        <Card className="card-style">
          <CardHeader>Add a new user</CardHeader>
          <CardBody>
          <form onSubmit={this.addUser}>
          <FormGroup>
            <Label>Nickname</Label>
            <Input type="text" id="nickname" placeholder="Enter nickname"  onChange={this.handleChange}/>
            { this.state.errors.required_nickname ? (
              <small className="color-red">{this.state.errors.required_nickname}</small>
              ) : (
                ""
              )}
              { this.state.errors.taken_nickname ? (
              <small className="color-red">{this.state.errors.taken_nickname}</small>
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
            { this.state.errors.taken_email ? (
              <small className="color-red">{this.state.errors.taken_email}</small>
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
              disabled={!this.validateForm()}
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
}
