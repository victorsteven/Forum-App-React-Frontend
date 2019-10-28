import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './Posts.css';

import { fetchPosts } from '../../store/modules/posts/actions/postsAction';
import Post from './Post'


const Posts = () => {

  const postsSelector = useSelector((state) => state.FetchPosts);
  const dispatch = useDispatch();

  const getPosts = () => dispatch(fetchPosts());

  useEffect(() => {
    // console.log("we are getting the posts")
    getPosts();
  }, [])

  let posts = postsSelector.posts.map((post) => {
    // console.log("this is the initial post: ", post)
    return (
       <Link to={'/posts/' + post.id} key={post.id}>
        <Post post={post} key={post.id} />
      </Link>
    );
  })
  return (
    <div className="container">{posts}</div>
  )
}

export default Posts