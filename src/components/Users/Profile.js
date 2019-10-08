import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody, Col, Row, Form, FormText, CustomInput } from "reactstrap";


import { updateUserAvatar, updateUser } from '../../actions/usersAction';
import Default from '../../Assets/default.png'
import styles from './Profile.module.css'




import Navigation from "../Navigation"

const Profile = () => {

  const currentState = useSelector((state) => state);

  const dispatch = useDispatch()

  const userAvatarUpdate = (userDetails) => dispatch(updateUserAvatar(userDetails))
  const userUpdate = (userDetails) => dispatch(updateUser(userDetails))

  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();

  const [user, setUser] = useState({
    email: '',
    current_password: '',
    new_password: '',
  });


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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
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

  const submitUserAvatar = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', file);
    userAvatarUpdate(formData)
  }

  const submitUser = (e) => {
    e.preventDefault()
    userUpdate({
      email: user.email,
      current_password: user.current_password,
      new_password: user.new_password
    })
  }

  return (
    <Fragment>
      <Navigation />
      <div className="post-style container">
        {/* <Card className="card-style">   */}
        <div className="card-style">
          <div className="text-center">
            <h2>Update Profile</h2>
          </div>
          <CardBody>
            <div className="text-center mb-3">
                {$imagePreview}
            </div>
          <Form onSubmit={submitUserAvatar} encType="multipart/form-data">
          <div>
            <FormGroup className={styles.style_file_input}>
              <CustomInput type="file" id="exampleCustomFileBrowser" onChange={(e)=> handleImageChange(e)} />
            </FormGroup>
          </div>
          <Button className={styles.style_photo_button}
            color="primary"
            type="submit"
          >
            Update Photo
          </Button>
        </Form>

        <Form onSubmit={submitUser}>
          <Row className="mt-3">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Label for="exampleAddress">Username</Label>
                <Input type="text" name="username" value={currentState.auth.currentUser.username} disabled/>
              </FormGroup>
            </Col>
          </Row>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <FormGroup>
                  <Label for="exampleAddress">Email</Label>
                  <Input type="text" name="email" value={currentState.auth.currentUser.email} onChange={handleChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <FormGroup>
                  <Label for="exampleAddress">Current Password</Label>
                  <Input type="text" name="current_password" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <FormGroup>
                  <Label for="exampleAddress">New Password</Label>
                  <Input type="text" name="new_password" />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <FormGroup>
                  <Button
                    color="primary"
                    type="submit"
                    block
                  >
                    Update User
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          </CardBody>
        {/* </Card> */}
        </div>
      </div>
  </Fragment>
  )
}

export default Profile