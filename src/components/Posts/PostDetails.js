import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { fetchPost } from '../../store/modules/post/actions/singlePostAction'

import Like from './Like'
import Comment from './Comment'


const PostDetails = (props) => {

  const postID  = props.match.params.id

  const dispatch = useDispatch()

  const singlePost = id => dispatch(fetchPost(id))

  const currentState = useSelector(state => state)

  const postSelector = currentState.FetchPost

  useEffect(() => {
    singlePost(postID)

  }, [])


  console.log("this is the post state: ", postSelector.post.author ? postSelector.post.author.username : "nothing")

  return (
    <div  className="mt-5 style-card">
      <Card>
        <CardBody className="style-card-body">
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
              <Comment postID={postID} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default PostDetails