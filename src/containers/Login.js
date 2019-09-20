import React, { Component } from "react";
import { Label, Input,  Button, FormGroup } from "reactstrap";
import "./Auth.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("We are here")
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>

        <FormGroup>
          <Label>Email</Label>
          <Input type="text" id="email" placeholder="Enter email"  onChange={this.handleChange}
            autoFocus
            value={this.state.email}
          />
          
          {/* { this.state.errors.required_nickname ? (
            <small className="color-red">{this.state.errors.required_nickname}</small>
            ) : (
              ""
            )}
            { this.state.errors.taken_nickname ? (
            <small className="color-red">{this.state.errors.taken_nickname}</small>
            ) : (
              ""
            )} */}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input type="text" id="password" placeholder="Enter password"  onChange={this.handleChange}
            value={this.state.password}
          />
          {/* { this.state.errors.required_nickname ? (
            <small className="color-red">{this.state.errors.required_nickname}</small>
            ) : (
              ""
            )}
            { this.state.errors.taken_nickname ? (
            <small className="color-red">{this.state.errors.taken_nickname}</small>
            ) : (
              ""
            )} */}
        </FormGroup>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
