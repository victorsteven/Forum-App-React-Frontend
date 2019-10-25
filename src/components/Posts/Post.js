import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
// import { useSelector, useDispatch } from 'react-redux'
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import './Posts.css';
import Like from './Like'
import Comment from './Comment'
import './Posts.css';


const Post = ({ post }) => {
  
  return (
    <div className="style-anchor">
      <div  className="mt-5 style-card">
        <Card>
          <CardBody className="style-card-body">
          <CardTitle>
            <span href="" style={{fontWeight: 'bold'}}>{post.author.username}</span>
            <span style={{float: 'right'}}>
              <Moment fromNow>{post.author.created_at}</Moment>
            </span>
            </CardTitle>
            <CardTitle>{post.title}</CardTitle>
            <CardText>{post.content}</CardText>
            <div className="style-fav">
              <Like postID={post.id} />
              <Comment postID={post.id} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Post