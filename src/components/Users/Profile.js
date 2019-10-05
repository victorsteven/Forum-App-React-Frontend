import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';


import Navigation from "../Navigation"

const Profile = () => {

  const currentState = useSelector((state) => state);

  //incase someone visits the route manually
  if(!currentState.auth.isAuthenticated){
    return <Redirect to='/login' />
  }

  return (
    <div>
      <Navigation />
      {console.log("this is the profile")}
    </div>
  )
}

export default Profile