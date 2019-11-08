import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './Posts.css';

import { fetchPosts } from '../../store/modules/posts/actions/postsAction';
import Post from './Post'


const Posts = () => {

  const postsSelector = useSelector((state) => state.PostsState);
  const dispatch = useDispatch();

  // console.log("this is the post state: ", postsSelector)

  const getPosts = () => dispatch(fetchPosts());

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let posts = postsSelector.posts.map((post) => {
    return (
      <div  className="mt-2 style-card" key={post.id}>
         <Link to={'/posts/' + post.id} key={post.id}>
          <Post post={post} key={post.id} />
        </Link>
      </div>
    );
  })
  return (
    <div className="container">{posts}</div>
  )
}

export default Posts
