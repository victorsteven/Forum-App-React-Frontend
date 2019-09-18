import React, { Component } from 'react';
import axios from 'axios'
import { Label, Input, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";

class App extends Component {

  state = {
    users: [],
    newUserModal: false,
    nickname: '',
    email: '',
    Password: '',
    errors: {
      required_nickname: '',
      required_email: '',
      required_password: '',
      invalid_email: '',
      taken_email: '',
      taken_nickname: ''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8080/users').then(res => {
      console.log("these are the users: ", res)
      this.setState({
        users: res.data.response
      })
    })
  }
  toggleNewUserModal(){
    this.setState({
      newUserModal: !this.state.newUserModal
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  async addBook(){
    console.log("this is the add book")
    let newBook = {
      nickname:  this.state.nickname,
      email:  this.state.email,
      password:  this.state.password
    }
    try {
    let res = await axios.post('http://localhost:8080/users', newBook)
    return res
    } catch(error) {
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
    }
  }

  render() {
    let users = this.state.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.nickname}</td>
          <td>{user.email}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    })
    return (
      <div className="App container">
      <Button color="primary" onClick={this.toggleNewUserModal.bind(this)}>Add User</Button>
        <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>Add a new user</ModalHeader>
          <ModalBody>
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
          </ModalBody> 
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>Add User</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nickname</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
