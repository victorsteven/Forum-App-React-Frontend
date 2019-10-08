import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody, Col, Row, Form, FormText } from "reactstrap";


import { updateUserAvatar } from '../../actions/usersAction';
import Default from '../../Assets/default.png'
import styles from './Profile.module.css'




import Navigation from "../Navigation"

const Profile = () => {

  const currentState = useSelector((state) => state);

  const dispatch = useDispatch()

  const userAvatarUpdate = (userDetails) => dispatch(updateUserAvatar(userDetails))
  
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

  const submitUserAvatar = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', file);

    // formData.append('email', user.email);
    // console.log("this is the email: ", user.email)

    // userUpdate({
    //   id: currentState.auth.currentUser.id,
    //   file: user.file
    // })
    userAvatarUpdate(formData)
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
          <CardHeader>Update Profile</CardHeader>
          <CardBody>
          <Form onSubmit={submitUserAvatar} encType="multipart/form-data">
          <FormGroup>
            <div>
              <div className="imgPreview">
                {$imagePreview}
              </div>
              <Input 
                type="file" 
                onChange={(e)=> handleImageChange(e)} 
              />
            </div>
          </FormGroup>
          <Button
            color="primary"
            type="submit"
          >
            Update Photo
          </Button>
        </Form>

        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress2">Address 2</Label>
            <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" name="check" id="exampleCheck"/>
            <Label for="exampleCheck" check>Check me out</Label>
          </FormGroup>
          <Button>Sign in</Button>
        </Form>
          </CardBody>
        </Card>
      </div>
  </Fragment>
  )
}

export default Profile