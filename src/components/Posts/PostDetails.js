import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { fetchPost } from '../../store/modules/posts/actions/postsAction'

import Navigation from '../Navigation'
import Like from './Like'
import Comments from '../Comments/Comments'
import Comment from '../Comments/Comment'
import Default from '../../Assets/default.png'
import EditPost from './EditPost';
import DeletePost from './DeletePost'


const PostDetails = (props) => {

  const postID  = props.match.params.id

  const dispatch = useDispatch()

  const singlePost = id => dispatch(fetchPost(id))

  const currentState = useSelector(state => state)

  const postSelector = currentState.PostsState

  const postComments = currentState.CommentsState

  const authID = currentState.Auth.currentUser.id

  console.log("this is the post selector: ", postSelector)

//Get the avatar of the author of the post
  let imagePreview = null;
  let avatarPathPost = postSelector.post.author ? postSelector.post.author.avatar_path : null
  if(avatarPathPost){
    imagePreview = (<img className="img_style" src={avatarPathPost} alt="no one"/>);
  } else {
    imagePreview = (<img className="img_style" src={Default} alt="no one 2"/>);
  }


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
              <span>
                <span className="mr-2">
                  {imagePreview}
                </span>
                <span href="" style={{fontWeight: 'bold'}}>{postSelector.post.author ? postSelector.post.author.username : ""}</span>
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
                <Like postID={postID} />
                <Comments postID={postID} />
                <div className="ml-auto">
                  <span style={{marginRight: "20px"}}>
                    <EditPost post={postSelector.post} />
                  </span>
                  <span>
                    <DeletePost postID={postID} />
                  </span>
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