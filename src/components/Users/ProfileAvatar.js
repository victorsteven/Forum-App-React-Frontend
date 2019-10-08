import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";

import { updateUserAvatar } from '../../actions/usersAction';
import Default from '../../Assets/default.png'
import styles from './Profile.module.css'




import Navigation from "../Navigation"

const ProfileAvatar = () => {

  const currentState = useSelector((state) => state);

  const dispatch = useDispatch()

  const userUpdate = (userDetails) => dispatch(updateUserAvatar(userDetails))
  
  // const [user, setUser] = useState({
  //   email: '',
  // });

  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();

  // const handleChange = e => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let thefile = e.target.files[0];

    reader.onloadend = () => {
      setFile(thefile)
      setUploadedFile(reader.result)
    }
    reader.readAsDataURL(thefile)
  }

  let $imagePreview = null;
  if (uploadedFile) {
    $imagePreview = (<img className={styles.img_style} src={uploadedFile} alt="no one"/>);
  } else {
    $imagePreview = (<img className={styles.img_style} src={Default} alt="no one 2"/>);
  }

  //incase someone visits the route manually
  if(!currentState.auth.isAuthenticated){
    return <Redirect to='/login' />
  }

  const submitUser = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', file);

    // formData.append('email', user.email);
    // console.log("this is the email: ", user.email)

    // userUpdate({
    //   id: currentState.auth.currentUser.id,
    //   file: user.file
    // })
    userUpdate(formData)
  }

  // const onChangeFile = e => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.files[0]
  //   })
  // }

  // const handleImageChange = (e) => {
  //   e.preventDefault();

  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {
  //     this.setState({
  //       file: file,
  //       imagePreviewUrl: reader.result
  //     });
  //   }

  //   reader.readAsDataURL(file)
  // }

  return (
    <Fragment>
      <Navigation />
      <div className="post-style">
        <Card className="card-style">
          <CardHeader>Update ProfileAvatar</CardHeader>
          <CardBody>
          <form onSubmit={submitUser} encType="multipart/form-data">
          <FormGroup>
            <Label>Photo Title</Label>
            <div className="previewComponent">
                <Input 
                  type="file" 
                  onChange={(e)=> handleImageChange(e)} />
              <div className="imgPreview">
                {$imagePreview}
              </div>
            </div>
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
            <Label>Email</Label>
              <Input name="email" type="email" id="email" onChange={handleChange} />
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
  </Fragment>
  )
}

export default ProfileAvatar