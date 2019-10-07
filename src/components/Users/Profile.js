import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { updateUser } from '../../actions/usersAction';
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";


import Navigation from "../Navigation"

const Profile = () => {

  const currentState = useSelector((state) => state);

  const [user, setUser] = useState({
    id: '',
    file: ''
  });

  const dispatch = useDispatch()

  const userUpdate = (userDetails) => dispatch(updateUser(userDetails))

  //incase someone visits the route manually
  if(!currentState.auth.isAuthenticated){
    return <Redirect to='/login' />
  }

  const submitUser = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('id', currentState.auth.currentUser.id);
    formData.append('file', user.file);
    // console.log("this is our form: ", formData)

    // userUpdate({
    //   id: currentState.auth.currentUser.id,
    //   file: user.file
    // })

    userUpdate(formData)

  }

  const onChangeHandler = e => {
    // setFile(e.target.files[0]);
    setUser({
      ...user,
      [e.target.name]: e.target.files[0]
    })
    // console.log("this is the file frontend", e.target.files[0])
  }

  return (
    <div>
      <Navigation />
      <div className="post-style">
        <Card className="card-style">
          <CardHeader>Update Profile</CardHeader>
          <CardBody>
          <form onSubmit={submitUser} encType="multipart/form-data">
          <FormGroup>
            <Label>Photo Title</Label>
            {/* <Input type="file" name="file"  onChange={handleChange}/> */}
            <Input type="file" name="file" onChange={onChangeHandler}/>

            {/* { currentState.CreatePost.postError && currentState.CreatePost.postError.Required_title ? (
              <small className="color-red">{currentState.CreatePost.postError.Required_title}</small>
              ) : (
                ""
              )}
              { currentState.CreatePost.postError && currentState.CreatePost.postError.Taken_title ? (
              <small className="color-red">{ currentState.CreatePost.postError.Taken_title }</small>
              ) : (
                ""
              )} */}
          </FormGroup>
          {/* <FormGroup>
            <Label>Content</Label>
            <Input type="textarea" cols="30" rows="6" name="content" id="" placeholder="Enter a short description" onChange={handleChange} />
            { currentState.CreatePost.postError && currentState.CreatePost.postError.Required_content ? (
              <small className="color-red">{currentState.CreatePost.postError.Required_content}</small>
              ) : (
                ""
              )}
            </FormGroup> */}
            <Button
              color="primary"
              type="submit"
              block
            >
              Update 
            </Button>
            </form>
            </CardBody>
          </Card>
        </div>

    </div>
  )
}

export default Profile