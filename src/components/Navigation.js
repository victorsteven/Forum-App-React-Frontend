import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Aux  from '../hoc/Aux/Aux'
import { SignOut } from '../store/modules/auth/actions/authAction';
import Default from '../Assets/default.png'
import './Navigation.css'

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
  
  const { isAuthenticated, currentUser } = currentState.Auth;

  const dispatch = useDispatch()

  const logoutUser  = () => dispatch(SignOut());



  let imagePreview = null;
  if(currentUser){
    imagePreview = (<img className="img_style_nav" src={currentUser.avatar_path} alt="profile"/>);
  } else {
    imagePreview = (<img className="img_style_nav" src={Default} alt="profile"/>);
  }

  const logout = (e) => {
    e.preventDefault()
    logoutUser()
  }

  const userProfile = isAuthenticated ?  `/profile/${currentState.Auth.currentUser.id}` : ""

  const SignedInLinks = (
              <Aux>
                  <NavItem className="mt-2" style={{marginRight: "15px" }}>
                    <NavLink to="/createpost">Create Post</NavLink>
                  </NavItem>
                  <NavItem className="mt-2" style={{marginRight: "15px" }}>
                    <NavLink to="/authposts">Your posts</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {imagePreview}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavItem>
                        <NavLink to={userProfile}>Profile</NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <a onClick={logout}>Logout</a>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Aux>
            )

  const SignedOutLinks = (
               <Aux>
                  <NavItem style={{marginRight: "20px" }}>
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
