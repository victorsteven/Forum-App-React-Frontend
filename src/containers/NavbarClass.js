import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from 'react-icons/fa';
import Aux  from '../hoc/Aux/Aux'
import { SignOut } from '../actions/authAction';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


const NavbarClass = () => {

  const [isOpen, setIsOpen] = useState(false)

  const currentState = useSelector((state) => state);
  
  const { isAuthenticated } = currentState.auth;

  const dispatch = useDispatch()

  const logoutUser  = () => dispatch(SignOut());


  const logout = (e) => {
    e.preventDefault()
    logoutUser()
  }


  const SignedInLinks = (
              <Aux>
                  <NavItem style={{marginRight: "15px" }}>
                    <NavLink to="/createpost">Create Post</NavLink>
                  </NavItem>
                  <NavItem style={{marginRight: "15px" }}>
                    <NavLink to="/">Your posts</NavLink>
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
                      <a href="#" onClick={logout}>Logout</a>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Aux>
            )

  const SignedOutLinks = (
               <Aux>
                  <NavItem style={{marginRight: "10px" }}>
                    <NavLink to={`login`}>Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to={`signup`}>Signup</NavLink>
                  </NavItem>
                </Aux>
              )


  return (
    <div>
      <Navbar color="light" light expand="md" className="style-navbar"> 
        <NavbarBrand href="/">Seamflow</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen) } /> 
        <Collapse isOpen={isOpen} navbar> 
          <Nav className="ml-auto" navbar>
            { isAuthenticated ? SignedInLinks: SignedOutLinks }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarClass
