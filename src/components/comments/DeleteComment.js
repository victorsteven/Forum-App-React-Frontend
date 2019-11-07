import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { FaRegTrashAlt } from 'react-icons/fa'

import { deleteComment } from '../../store/modules/comments/actions/commentsAction'


const DeleteComment = ({ comment, className }) => {

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const removeCommment = details => dispatch(deleteComment(details, deleteSuccess))

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  } 

  //this callback should not listen for an event
  const deleteSuccess = () => {
    setModal(!modal);
  }

  const submitDelete = (e) => {
    e.preventDefault()
    removeCommment({
      id: comment.id,
      postID: comment.post_id
    })
  }

  return (
    <span>
      <FaRegTrashAlt className="style-delete" onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Delete Comment?</ModalHeader>
        <ModalFooter>
        { currentState.CommentsState.isLoading ? (
              <button className="btn btn-primary"
                disabled
              >
                Deleting...
            </button>
            ) : (
              <button className="btn btn-primary"
                onClick={submitDelete}
                type="submit"
              >
              Delete
            </button>
            )}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default DeleteComment;