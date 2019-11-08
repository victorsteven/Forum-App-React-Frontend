import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { FaFilter } from 'react-icons/fa'

import { fetchAuthPosts } from '../../store/modules/posts/actions/postsAction';
import AuthPost from './AuthPost'
import Navigation from '../Navigation'
import './Posts.css';


const AuthPosts = () => {

  const currentState = useSelector((state) => state.Auth);
  const authID = currentState.currentUser.id

  const postsSelector = useSelector((state) => state.PostsState);
  const dispatch = useDispatch();

  const getAuthPosts = id => dispatch(fetchAuthPosts(id));

  useEffect(() => {
    getAuthPosts(authID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

   //incase someone visits the route manually
  if(!currentState.isAuthenticated){
    return <Redirect to='/login' />
  }

  let authPosts = postsSelector.authPosts.map(post => {
    return (
      <div  className="mt-2 style-card" key={post.id}>
       <Link to={'/posts/' + post.id} key={post.id}>
        <AuthPost post={post} key={post.id} />
      </Link>
    </div>
      );
  })
    

  return (
    <div className="App">
      <div>
        <Navigation />
      </div>
      <div className="container">
        { authPosts.length > 0 ? (
          <div className="container">{authPosts}</div>
        ) : ( 
          <div className="text-center mt-4">
            <div style={{fontSize: "100px"}}><FaFilter /></div>
            <p className="mt-2">It seems you have not created any posts yet.</p>
            <p>Click the button the button below to create one</p>
            <div className="mt-4">
              <Link to="/createpost" className="btn btn-primary">Create Post</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPosts
