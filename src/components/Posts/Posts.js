import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from '../../store/modules/posts/actions/postsAction';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { FaRegHeart, FaRegComment } from 'react-icons/fa'
import './Posts.css';
import Post from './Post'


const Posts = () => {

  const postsSelector = useSelector((state) => state.FetchPosts);
  const dispatch = useDispatch();

  const getPosts = () => dispatch(fetchPosts());


  useEffect(() => {
    console.log("we are getting the posts")
    getPosts();
  }, [])

  let posts = postsSelector.posts.map((post) => {
    return (
       <Link to={'/post/' + post.id} key={post.id}>
        <Post post={post} key={post.id} />
      </Link>
    );
  })
  return (
    <div className="container">{posts}</div>
  )
}

export default Posts