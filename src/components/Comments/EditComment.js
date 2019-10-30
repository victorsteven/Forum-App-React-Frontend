import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { FaPencilAlt } from 'react-icons/fa'
import { updateComment } from '../../store/modules/comments/actions/commentsAction'
import { history } from '../../history'

const EditComment = ({ comment, className }) => {

  const [modal, setModal] = useState(false);

  // const [postUpdate, setPostUpdate] = useState({
  //   title: post.title,
  //   content: post.content,
  // })

// We would have done the above, but we want to favor the postDetails 
//that gets its post asynchronously component

  const [commentUpdate, setCommentUpdate] = useState("")

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const authID = currentState.Auth.currentUser.id

  const theUpdate = details => dispatch(updateComment(details, updateSuccess))

  const updateSuccess = () => {
    setModal(!modal);
  }

  useEffect(() => {
    setCommentUpdate(comment)
  }, [comment]);

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
  } 

  const handleChange = e => {
    setCommentUpdate(e.target.value) //since is just one value
  }

  const submitComment = (e) => {
    e.preventDefault()
    theUpdate({
      id: comment.id,
      body: commentUpdate,
    })
  }

  return (
    <span>
      <FaPencilAlt className="style-edit " onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Comment</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Content</label>
            <textarea className="form-control" name="body" style={{ width: "100%", height: "100px" }} defaultValue={commentUpdate.body} onChange={handleChange}></textarea>
            {/* { currentState.PostsState.postsError && currentState.PostsState.postsError.Required_content ? (
              <small className="color-red">{currentState.PostsState.postsError.Required_content}</small>
              ) : (
                ""
              )} */}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
        { currentState.PostsState.isLoading ? (
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

export default EditComment;