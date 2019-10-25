import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux'
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { FaRegHeart, FaRegComment } from 'react-icons/fa'
import './Posts.css';
import { createLike, fetchLikes } from '../../store/modules/post/actions/singlePostAction';
import './Posts.css';



const Comment = ({ postID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  // const postLikes  =  currentState.GetLikes
  // const initialLikes = postLikes.likes

  const [comment, setComment] = useState('')

  const commentPost = (e) => {
    e.preventDefault()
    console.log("the comment is clicked")
  }

  // const getPostLikes = id => dispatch(fetchLikes(id));

  useEffect(() => {
    // getPostLikes(post.id);
  }, [])


  const likeToggle = (e) => {
    e.preventDefault()
    // setLike(like + 1)

    // togglePost({
    //   post_id: post.id,
    //   user_id: currentUserState.currentUser.id,
    //   like: like 
    // })
  }

  return (
    <div className="style-heart-outer">
      <span className="mr-4">
        <span onClick={commentPost}> 
          <FaRegComment className="style-heart " />
          <span className="ml-2">
            455
          </span>
        </span>
      </span>
    </div>
  )
}

export default Comment