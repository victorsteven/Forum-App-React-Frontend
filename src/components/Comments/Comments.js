import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../Posts/Posts.css';
import { fetchComments } from '../../store/modules/comments/actions/commentsAction';
import CreateComment from './CreateComment'



const Comments = ({ postID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const postComments = currentState.CommentsState

  const getPostComments = id => dispatch(fetchComments(id))

  let singlePostComments = []

  if(postComments){
    // eslint-disable-next-line array-callback-return
    postComments.commentItems.map(eachItem => {
      if(eachItem.postID === postID){
        singlePostComments = eachItem.comments  
      } 
    }) 
  }

  useEffect(() => {
    getPostComments(postID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="style-heart-outer">
      <span className="mr-4">
        <CreateComment postID={postID} />
        <span className="ml-2">
          {singlePostComments.length}
        </span>
        <div></div>
      </span>
    </div>
  )
}

export default Comments