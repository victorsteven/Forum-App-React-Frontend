import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
// import { useSelector, useDispatch } from 'react-redux'
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import './Posts.css';
import Like from './Like'
import Comments from '../Comments/Comments'
import './Posts.css';
import Default from '../../Assets/default.png'



const Post = ({ post }) => {

  // console.log("this is the post: ", post)

  let $imagePreview = null;
  if(post.author.avatar_path){
    $imagePreview = (<img className="img_style" src={post.author.avatar_path} alt="no one"/>);
  } else {
    $imagePreview = (<img className="img_style" src={Default} alt="no one 2"/>);
  }
  
  return (
    <div>
      <div  className="mt-2 style-card">
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
              <Moment fromNow>{post.author.created_at}</Moment>
            </span>
            </CardTitle>
            <CardTitle>{post.title}</CardTitle>
            <CardText>{post.content}</CardText>
            <div className="style-fav">
              <Like postID={post.id} />
              <Comments postID={post.id} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Post