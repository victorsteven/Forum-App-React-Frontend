import React from 'react'
import Moment from 'react-moment';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { FaRegHeart, FaRegComment } from 'react-icons/fa'
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
              <div className="style-heart-outer">
                <FaRegHeart className="style-heart " />
              </div>
              <div className="style-heart-outer">
                <FaRegComment className="style-heart " />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Post