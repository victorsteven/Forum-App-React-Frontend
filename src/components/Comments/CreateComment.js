import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaRegComment } from 'react-icons/fa'

import { createComment } from '../../store/modules/comments/actions/commentsAction'

const CreateComment = ({ postID, className }) => {

  const [modal, setModal] = useState(false);
  const [body, setBody] = useState("")

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const addComment = details => dispatch(createComment(details, commentSuccess))

  const commentSuccess = () => {
    setModal(!modal);
  }

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
  } 

  const handleChange = e => {
    setBody(e.target.value)
  }

  const submitComment = (e) => {
    e.preventDefault()
    addComment({
      post_id: Number(postID),
      body
    })
  }

  return (
    <span>
      <FaRegComment className="style-heart " onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Comment</ModalHeader>
        <ModalBody>
          <textarea name="body" style={{ width: "100%", height: "150px" }} onChange={handleChange}></textarea>
          { currentState.CommentsState.commentsError && currentState.CommentsState.commentsError.Required_body ? (
              <small className="color-red">{currentState.CommentsState.commentsError.Required_body}</small>
              ) : (
                ""
              )}
        </ModalBody>
        <ModalFooter>
        { currentState.CommentsState.isLoading ? (
            <button className="btn btn-primary"
                disabled
            >
              Saving...
            </button>
            ) : (
            <button className="btn btn-primary"
              onClick={submitComment}
              type="submit"
            >
              Comment
            </button>
            )}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default CreateComment;