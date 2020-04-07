import React, { useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import Default from '../../Assets/default.png'
import { fetchPost } from '../../store/modules/posts/actions/postsAction'
import Navigation from '../Navigation'
import Likes from '../likes/Likes'
import Comments from '../comments/Comments'
import Comment from '../comments/Comment'
import EditPost from './EditPost';
import DeletePost from './DeletePost'



const PostDetails = (props) => {

  const postID  = props.match.params.id

  const dispatch = useDispatch()

  const singlePost = id => dispatch(fetchPost(id))

  const currentState = useSelector(state => state)

  const post = currentState.PostsState.post

  const postComments = currentState.CommentsState

  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

//Get the avatar of the author of the post
  let imagePreview = null;
  let avatarPathPost = post.author ? post.author.avatar_path : null
  if(avatarPathPost){
    imagePreview = (<img className="img_style_post" src={avatarPathPost} alt="profile"/>);
  } else {
    imagePreview = (<img className="img_style_post" src={Default} alt="profile"/>);
  }


  useEffect(() => {
    singlePost(postID)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let singlePostComments = []

  if(postComments){
    // eslint-disable-next-line array-callback-return
    postComments.commentItems.map(eachItem => {
      if(eachItem.postID === postID){
        singlePostComments = eachItem.comments  
      } 
    }) 
  }

  return (
    <div id="page-container">
      <Navigation />
      <div className="container">
        <div className="mt-5 style-card">
          <Card>
            <CardBody style={{paddingBottom: "0px"}}>
            <CardTitle>
              <span>
                <span className="mr-2">
                  {imagePreview}
                </span>
                <span href="" style={{fontWeight: 'bold'}}>{post.author ? post.author.username : ""}</span>
              </span>
              <span style={{float: 'right'}}>
                <Moment fromNow>
                  {post ? post.created_at : ""}
                </Moment>
              </span>
              </CardTitle>
              <CardTitle>{post.title}</CardTitle>
              <CardText>{post.content}</CardText>
              <div className="style-fav">
                <Likes postID={Number(postID)} />
                <Comments postID={postID} />
                { authID === post.author_id ? (
                <div className="ml-auto">
                  <span style={{marginRight: "20px"}}>
                    <EditPost post={post} />
                  </span>
                  <span>
                    <DeletePost postID={post.id} />
                  </span>
                </div>
              ) : ""}
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