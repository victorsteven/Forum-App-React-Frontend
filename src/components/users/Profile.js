import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Label, Input, FormGroup, Button, CardBody, Col, Row, Form, CustomInput, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { updateUserAvatar, updateUser, deleteUser } from '../../store/modules/auth/actions/authAction';
import Default from '../../Assets/default.png'
import  './Profile.css'
import Message from '../utils/Message';




import Navigation from "../Navigation"

const Profile = () => {

  const [modal, setModal] = useState(false);

  const toggle = (e) => {
    setModal(!modal);
  } 

  const currentUserState = useSelector((state) => state.Auth);
  
  const AuthID = currentUserState.currentUser ? currentUserState.currentUser.id : ""

  const dispatch = useDispatch()

  const userAvatarUpdate = (userDetails) => dispatch(updateUserAvatar(userDetails))
  const userUpdate = (userDetails) => dispatch(updateUser(userDetails, clearInput))
  const deleteAccount = id => dispatch(deleteUser(id))


  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [user, setUser] = useState({
    email: currentUserState.currentUser.email,
    current_password: '',
    new_password: '',
  })

  const clearInput = () => {
    setUser({
      ...user,
      current_password: "",
      new_password: ""
    })
  }

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

  let imagePreview = null;
  if(currentUserState.currentUser.avatar_path && !uploadedFile){
    imagePreview = (<img className="img_style" src={currentUserState.currentUser.avatar_path} alt="profile"/>);
  }
  else if(uploadedFile) {
    imagePreview = (<img className="img_style" src={uploadedFile} alt="profile"/>);
  } else {
    imagePreview = (<img className="img_style" src={Default} alt="profile"/>);
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

  const shutDown = (e) => {
    e.preventDefault()
    deleteAccount(AuthID)
  }

  return (
    <Fragment>
      <Navigation />
      <div className="post-style container">
        <div className="card-style">
          <div className="text-center">
            <h4>Update Profile</h4>
          </div>
          <Row className="mt-1">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                { currentUserState.authSuccessImage != null && currentUserState.avatarError == null ? (
                  <Message msg={currentUserState.authSuccessImage} />
                  ) : (
                    ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <CardBody>
            <div className="text-center mb-3">
                {imagePreview}
            </div>
          <Form onSubmit={submitUserAvatar} encType="multipart/form-data">
            <div>
              <FormGroup className="style_file_input">
                <CustomInput type="file" accept="image/*" id="exampleCustomFileBrowser" onChange={(e)=> handleImageChange(e)} />
                { currentUserState.avatarError && currentUserState.avatarError.Too_large ? (
                  <small className="color-red">{currentUserState.avatarError.Too_large}</small>
                  ) : (
                    ""
                )}
                { currentUserState.avatarError && currentUserState.avatarError.Not_Image ? (
                  <small className="color-red">{ currentUserState.avatarError.Not_Image }</small>
                  ) : (
                    ""
                )}
              </FormGroup>
            </div>
            { currentUserState.isLoadingAvatar ? (
              <Button className="style_photo_button"
                color="primary"
                type="submit"
                disabled
              >
                Updating...
              </Button>
            ) : (
              <Button className="style_photo_button"
                color="primary"
                type="submit"
                disabled={ uploadedFile == null || file == null }
              >
                Update Photo
              </Button>
            )}
        </Form>
        <Row>
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
                { currentUserState.userError && currentUserState.userError.Required_email ? (
                  <small className="color-red">{currentUserState.userError.Required_email}</small>
                  ) : (
                    ""
                )}
                { currentUserState.userError && currentUserState.userError.Invalid_email ? (
                  <small className="color-red">{ currentUserState.userError.Invalid_email }</small>
                  ) : (
                    ""
                )}
                { currentUserState.userError && currentUserState.userError.Taken_email ? (
                  <small className="color-red">{ currentUserState.userError.Taken_email }</small>
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
                <Input type="password" name="current_password" value={user.current_password}   onChange={handleChange}/>
                { currentUserState.userError && currentUserState.userError.Password_mismatch ? (
                  <small className="color-red">{currentUserState.userError.Password_mismatch}</small>
                  ) : (
                    ""
                )}
                { currentUserState.userError && currentUserState.userError.Empty_current ? (
                  <small className="color-red">{ currentUserState.userError.Empty_current }</small>
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
                <Input type="password" name="new_password" value={user.new_password}  onChange={handleChange}/>
                { currentUserState.userError && currentUserState.userError.Invalid_password ? (
                  <small className="color-red">{ currentUserState.userError.Invalid_password }</small>
                  ) : (
                    ""
                )}
                { currentUserState.userError && currentUserState.userError.Empty_new ? (
                  <small className="color-red">{ currentUserState.userError.Empty_new }</small>
                  ) : (
                    ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                { currentUserState.authSuccessUser != null && currentUserState.userError == null ? (
                  <Message msg={currentUserState.authSuccessUser} />
                  ) : (
                    ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                { currentUserState.isUpdatingUser ? (
                  <Button
                    color="primary"
                    type="submit"
                    block
                    disabled
                  >
                    Updating...
                </Button>
                ) : (
                  <Button
                    color="primary"
                    type="submit"
                    block
                  >
                  Update
                </Button>
                )}
              </FormGroup>
            </Col>
          </Row>
        </Form>

        <Row className="mt-3">
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <FormGroup>
              <Button onClick={toggle}
                color="danger"
                type="submit"
                block
              >
              Deactivate Account
              </Button>
            </FormGroup>
          </Col>
        </Row>
        </CardBody>

        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-center">Are you sure you want to delete your account?</ModalHeader>
        <ModalBody toggle={toggle} className="text-center">This will also delete your posts, likes and comments if you created any.</ModalBody>
        <ModalFooter>
        { currentUserState.isLoading ? (
              <button className="btn btn-danger"
                disabled
              >
                Deleting...
            </button>
            ) : (
              <button className="btn btn-danger"
                onClick={shutDown}
                type="submit"
              >
              Delete
            </button>
            )}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    </div>
    
  </Fragment>
  )
}

export default Profile