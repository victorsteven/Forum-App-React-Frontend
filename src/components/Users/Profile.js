import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody, Col, Row, Form, FormText, CustomInput } from "reactstrap";


import { updateUserAvatar, updateUser } from '../../actions/authAction';
import Default from '../../Assets/default.png'
import styles from './Profile.module.css'


import Navigation from "../Navigation"

const Profile = () => {

  const currentUserState = useSelector((state) => state.Auth);

  const dispatch = useDispatch()

  const userAvatarUpdate = (userDetails) => dispatch(updateUserAvatar(userDetails))
  const userUpdate = (userDetails) => dispatch(updateUser(userDetails))

  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: currentUserState.currentUser.email,
    current_password: '',
    new_password: '',
  })

  // useEffect(() => {
  //   setUser({
  //     email: currentUserState.currentUser.email,
  //     current_password: '',
  //     new_password: '',
  //   })
  // }, []);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

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
  if(currentUserState.currentUser.avatar_path && !uploadedFile){
    $imagePreview = (<img className={styles.img_style} src={currentUserState.currentUser.avatar_path} alt="no one"/>);
  }
  else if(uploadedFile) {
    $imagePreview = (<img className={styles.img_style} src={uploadedFile} alt="no one"/>);
  } else {
    $imagePreview = (<img className={styles.img_style} src={Default} alt="no one 2"/>);
  }

  //incase someone visits the route manually
  if(!currentUserState.isAuthenticated){
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

        <Row className="mt-3">
          <Col sm="12" md={{ size: 10, offset: 1 }}>
          <div style={{margin: "10px 0px 10px"}}>Username: <strong>{currentUserState.currentUser.username}</strong></div>
          </Col>
        </Row>

        <Form onSubmit={submitUser}>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Label for="exampleAddress">Email</Label>
                <Input type="text" name="email" value={user.email} onChange={handleChange} />
                { currentUserState.updateError && currentUserState.updateError.Required_email ? (
                  <small className="color-red">{currentUserState.updateError.Required_email}</small>
                  ) : (
                    ""
                )}
                { currentUserState.updateError && currentUserState.updateError.Invalid_email ? (
                  <small className="color-red">{ currentUserState.updateError.Invalid_email }</small>
                  ) : (
                    ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Label for="exampleAddress">Current Password</Label>
                <Input type="password" name="current_password"   onChange={handleChange}/>
                { currentUserState.updateError && currentUserState.updateError.Password_mismatch ? (
                  <small className="color-red">{currentUserState.updateError.Password_mismatch}</small>
                  ) : (
                    ""
                )}
                { currentUserState.updateError && currentUserState.updateError.Empty_Current ? (
                  <small className="color-red">{ currentUserState.updateError.Empty_Current }</small>
                  ) : (
                    ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Label for="exampleAddress">New Password</Label>
                <Input type="password" name="new_password"   onChange={handleChange}/>
                { currentUserState.updateError && currentUserState.updateError.Invalid_password ? (
                  <small className="color-red">{ currentUserState.updateError.Invalid_password }</small>
                  ) : (
                    ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                {/* { loading ? (
                  <Button
                    color="primary"
                    type="submit"
                    block
                  >
                    Updating...
                </Button>
                ) : (
                  <Button
                    color="primary"
                    type="submit"
                    block
                  >
                  Update User
                </Button>
                )} */}

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
      </div>
    </div>
  </Fragment>
  )
}

export default Profile