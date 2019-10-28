import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux'
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { FaRegHeart, FaRegComment } from 'react-icons/fa'
import '../Posts/Posts.css';
import { createLike, fetchComments } from '../../store/modules/comments/actions/commentsAction';
import CreateComment from './CreateComment'



const Comments = ({ postID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const postComments = currentState.CommentsState

  const authID = currentState.Auth.currentUser.id

  const [comment, setComment] = useState('')

  const getPostComments = id => dispatch(fetchComments(id))

  let singlePostComments = []
  let authCommented  = false
  let commentID = null

  if(postComments){
    postComments.commentItems.map(eachItem => {
      if(eachItem.postID === postID){
        singlePostComments = eachItem.comments  

        singlePostComments.map(eachComment => {
          if(eachComment.user_id === authID){
            authCommented = true
            commentID = eachComment.id
          } 
        })  
      } 
    }) 
  }


  const commentPost = (e) => {
    e.preventDefault()
    console.log("the comment is clicked")
  }

  // const getPostLikes = id => dispatch(fetchLikes(id));

  useEffect(() => {
    getPostComments(postID);
  }, [])

  return (
    <div className="style-heart-outer">
      <span className="mr-4">
        <span onClick={commentPost}> 
          {/* <FaRegComment className="style-heart " /> */}
          <CreateComment postID={postID} />
          <span className="ml-2">
            {singlePostComments.length}
          </span>
          <div>
          </div>
        </span>
      </span>
    </div>
  )
}

export default Comments