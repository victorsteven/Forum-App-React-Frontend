import React from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import './Posts.css';
import Default from '../../Assets/default.png'
import Likes from '../likes/Likes'
import Comments from '../comments/Comments'
import EditPost from './EditPost';
import DeletePost from './DeletePost'



const Post = ({ post }) => {

  const currentState = useSelector(state => state)
  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

  let $imagePreview = null;
  if(post.author.avatar_path){
    $imagePreview = (<img className="img_style_post" src={post.author.avatar_path} alt="no one"/>);
  } else {
    $imagePreview = (<img className="img_style_post" src={Default} alt="no one 2"/>);
  }
  
  return (
    <Card className="style-card-main">
      <CardBody className="style-card-body">
      <CardTitle>
        <span>
          <span className="mr-2">
            {$imagePreview}
          </span>
          <span href="" style={{fontWeight: 'bold'}}>{post.author.username}</span>
        </span>
        <span style={{float: 'right'}}>
          <Moment fromNow>{post.created_at}</Moment>
        </span>
        </CardTitle>
        <CardTitle>{post.title}</CardTitle>
        <CardText>{post.content}</CardText>
        <div className="style-fav">
            <>
              <Likes postID={post.id} />
              <Comments postID={post.id} />
            </>
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
  )
}

export default Post