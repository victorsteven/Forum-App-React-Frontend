import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { FaRegTrashAlt } from 'react-icons/fa'

import { deletePost } from '../../store/modules/posts/actions/postsAction'


const DeletePost = ({ postID, className }) => {

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const removePost = id => dispatch(deletePost(id))

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  } 

  const submitDelete = (e) => {
    e.preventDefault()
    let id = postID
    removePost(id)
  }

  return (
    <span>
      <FaRegTrashAlt className="style-delete" onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Delete Post?</ModalHeader>
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

export default DeletePost;