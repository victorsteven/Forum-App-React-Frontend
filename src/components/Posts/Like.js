import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import './Posts.css';
import { createLike, deleteLike,  fetchLikes } from '../../store/modules/likes/actions/likesAction';


const Like = ({ postID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const postLikes  =  currentState.LikesState

  const authID = currentState.Auth.currentUser.id

  let postLike = 0
  let likeID = null
  let authLiked  = false


  if(postLikes){
    postLikes.likeItems.map(eachItem => {
      if(eachItem.postID === postID){
        postLike = eachItem.likes.length  

        eachItem.likes.map(eachLike => {
          if(eachLike.user_id === authID){
            authLiked = true
            likeID = eachLike.id
          } 
        })  
      }
    }) 
  }

  // console.log("this is the postLikes: ", postLikes)

  const [like, setLike] = useState(0)

  const getPostLikes = id => dispatch(fetchLikes(id));

  const addLike = likeDetails => dispatch(createLike(likeDetails))
  const removeLike = likeDetails => dispatch(deleteLike(likeDetails))


  // const authLike =  (auth_id, post_id) => dispatch(fetchAuthLike(auth_id, post_id))


  useEffect(() => {
    getPostLikes(postID);

  }, [])


  const unLike = (e) => {
    e.preventDefault()
    // console.log("The auth like removed")
    removeLike({
      id: likeID,
      post_id: postID,
      user_id: authID,
    })
    // setLike(like - 1)
  }

  const saveLike = (e) => {
    e.preventDefault()
    // console.log("the auth just liked this post")
    addLike({
      post_id: postID,
      user_id: authID,
    })
    // setLike(like + 1)
  }


  const likeToggle = (e) => {
    e.preventDefault()

    authLiked ? unLike(e) : saveLike(e)

  }

  return (
    <div className="style-fav">
      <div className="style-heart-outer">
        <span className="mr-4">
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
        </span>
      </div>
    </div>
  )
}

export default Like