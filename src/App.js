import React, { Component } from 'react';
import axios from 'axios'
import { Label, Input, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";

class App extends Component {

  state = {
    users: [],
    newUserModal: false
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
      newUserModal: true
    })
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
              <Input type="text" placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" placeholder="with a placeholder" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleNewUserModal.bind(this)}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Ratings</th>
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
