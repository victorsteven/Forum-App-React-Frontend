import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

import '../posts/Posts.css';
import { createLike, deleteLike, fetchLikes } from '../../store/modules/likes/actions/likesAction';
import { history } from '../../history'


const Likes = ({ postID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const postLikes  =  currentState.LikesState

  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

  let postLike = 0
  let likeID = null
  let authLiked  = false

  if(postLikes){
    // eslint-disable-next-line array-callback-return
    postLikes.likeItems.map(eachItem => {
      if(eachItem.postID === postID){
        postLike = eachItem.likes.length  

        // eslint-disable-next-line array-callback-return
        eachItem.likes.map(eachLike => {
          if(eachLike.user_id === authID){
            authLiked = true
            likeID = eachLike.id
          } 
        })  
      }
    }) 
  }

  const getPostLikes = id => dispatch(fetchLikes(id));
  const addLike = id => dispatch(createLike(id))
  const removeLike = details => dispatch(deleteLike(details))

  useEffect(() => {
    getPostLikes(postID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const unLike = (e) => {
    e.preventDefault()
    let id = likeID
    removeLike({id, postID})
  }

  const saveLike = (e) => {
    e.preventDefault()
    addLike(postID)
  }

  const likeToggle = (e) => {
    e.preventDefault()
    authLiked ? unLike(e) : saveLike(e)
  }
  const noAuth = (e) => {
    e.preventDefault()
    history.push('/login');
  }

  return (
    <div className="style-fav">
      <div className="style-heart-outer">
        <span className="mr-4">
          { authID ? (
            <span onClick={likeToggle}>
            { authLiked ? 
              <FaHeart className="style-auth"/>
              :
              <FaRegHeart className="style-heart"/>
            }
            <span className="ml-2">
              {postLike}
            </span>
          </span>
          ) : (
            <span onClick={noAuth}>
              <FaRegHeart className="style-heart"/>
            <span className="ml-2">
              {postLike}
            </span>
          </span>
          )}
        </span>
      </div>
    </div>
  )
}

export default Likes

