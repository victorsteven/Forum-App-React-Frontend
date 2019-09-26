import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import { FaUser } from 'react-icons/fa';
  import Aux  from '../hoc/Aux/Aux'


export default class NavbarClass extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loggedIn: true
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" className="style-navbar"> 
          <NavbarBrand href="/">Seamflow</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.loggedIn ? (
                <Aux>
                  <NavItem>
                    <NavLink href="/">Create Post</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/">Your posts</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <FaUser />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Create Post
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                </Aux>
              ) : (
                  <Aux>
                  <NavItem>
                    <NavLink href="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/signup">Signup</NavLink>
                  </NavItem>
                </Aux>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}