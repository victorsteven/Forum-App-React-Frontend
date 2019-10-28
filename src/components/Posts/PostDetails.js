import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { fetchPost } from '../../store/modules/post/actions/singlePostAction'

import Navigation from '../Navigation'
import Like from './Like'
import Comments from '../Comments/Comments'
import Comment from '../Comments/Comment'



const PostDetails = (props) => {

  const postID  = props.match.params.id

  const dispatch = useDispatch()

  const singlePost = id => dispatch(fetchPost(id))

  const currentState = useSelector(state => state)

  const postSelector = currentState.FetchPost

  const postComments = currentState.CommentsState

  const authID = currentState.Auth.currentUser.id


  useEffect(() => {
    singlePost(postID)
  }, [])

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

  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="mt-5 style-card">
          <Card>
            <CardBody>
            <CardTitle>
              <span href="" style={{fontWeight: 'bold'}}>
                {postSelector.post.author ? postSelector.post.author.username : ""}
              </span>
              <span style={{float: 'right'}}>
                <Moment fromNow>
                  {postSelector.post.author ? postSelector.post.author.created_at : ""}
                </Moment>
              </span>
              </CardTitle>
              <CardTitle>{postSelector.post.title}</CardTitle>
              <CardText>{postSelector.post.content}</CardText>
              <div className="style-fav">
                <div className="style-fav">
                  <Like postID={postID} />
                  <Comments postID={postID} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="mt-3 style-card-comment">
          {singlePostComments ? singlePostComments.map(comment => {
            return (
              <Comment comment={comment} key={comment.id} />
            )
          }) 
          
          : ""
          }
        </div>
      </div>
    </div>
  )
}

export default PostDetails