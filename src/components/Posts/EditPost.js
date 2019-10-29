import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { FaPencilAlt } from 'react-icons/fa'
import { updatePost } from '../../store/modules/posts/actions/postsAction'
import { history } from '../../history'

const EditPost = ({ post, className }) => {

  const [modal, setModal] = useState(false);
  const [postUpdate, setPostUpdate] = useState({
    title: post.title,
    content: post.content,
  })
  // console.log("this is the pist", post)

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const authID = currentState.Auth.currentUser.id

  // const commentsState = currentState.CommentsState

  const theUpdate = details => dispatch(updatePost(details, toggle))

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
  } 

  const handleChange = e => {
    setPostUpdate({
      ...postUpdate,
      [e.target.name]: e.target.value
    })
  }

  const submitComment = (e) => {
    e.preventDefault()
    theUpdate({
      id: post.id,
      title: postUpdate.title,
      content: postUpdate.content,
      author_id: authID
    })
  }

  return (
    <span>
      <FaPencilAlt className="style-edit " onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Post</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Title</label>
            <input className="form-control" type="text" name="title"  defaultValue={postUpdate.title}  onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <label>Content</label>
            <textarea className="form-control" name="content" style={{ width: "100%", height: "150px" }} defaultValue={postUpdate.content} onChange={handleChange}></textarea>
          </FormGroup>

          {/* { currentState.CommentsState.commentsError && currentState.CommentsState.commentsError.Required_body ? (
              <small className="color-red">{currentState.CommentsState.commentsError.Required_body}</small>
              ) : (
                ""
              )} */}
        </ModalBody>
        <ModalFooter>
        { currentState.CommentsState.isLoading ? (
              <button className="btn btn-primary"
                disabled
              >
                Updating...
            </button>
            ) : (
              <button className="btn btn-primary"
                onClick={submitComment}
                type="submit"
              >
              Update
            </button>
            )}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default EditPost;