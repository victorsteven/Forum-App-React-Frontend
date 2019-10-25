import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from 'react-icons/fa';
import Aux  from '../hoc/Aux/Aux'
import { SignOut } from '../store/modules/auth/actions/authAction';

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


const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false)

  const currentState = useSelector((state) => state);
  
  const { isAuthenticated } = currentState.Auth;

  // console.log("this is the auth user: ", isAuthenticated)

  const dispatch = useDispatch()

  const logoutUser  = () => dispatch(SignOut());


  const logout = (e) => {
    e.preventDefault()
    logoutUser()
  }

  // const userProfile = {
  //   pathname: "/profile",
  //   id:  currentState.Auth.currentUser.id
  // }

  const userProfile = isAuthenticated ?  `/profile/${currentState.Auth.currentUser.id}` : ""


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
                      <NavItem>
                        <NavLink to={userProfile}>Edit Profile</NavLink>
                      </NavItem>
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
                    <Link to='/login'>Login</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/signup'>Signup</Link>
                  </NavItem>
                </Aux>
              )


  return (
    <div className="mb-3">
      <Navbar color="light" light expand="md"> 
          <NavbarBrand className="mx-auto" href="/">Seamflow</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen) } /> 
        <Collapse isOpen={isOpen} navbar> 
          <Nav className="ml-auto" navbar>
            { isAuthenticated ? SignedInLinks: SignedOutLinks }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation
