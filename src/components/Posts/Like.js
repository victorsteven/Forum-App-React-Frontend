import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import './Posts.css';
import { createLike, deleteLike,  fetchLikes } from '../../store/modules/likes/actions/likesAction';


const Like = ({ postID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const postLikes  =  currentState.GetLikes

  const authID = currentState.Auth.currentUser.id

  // const authLiked  = currentState.authLiked

  let postLike = 0
  let authLiked  = false

  postLikes.likeItem.map(eachItem => {
    // console.log("this is a like item: ", eachItem)
    if(eachItem.postID === postID){
      postLike = eachItem.likesCount  

      eachItem.likes.map(eachLike => {
        if(eachLike.user_id === authID){
          console.log("the auth id also liked")
          authLiked = true
        }
      })  
    }
  })

  // console.log("this is the postLikes: ", postLikes)

  const [like, setLike] = useState(0)

  const getPostLikes = id => dispatch(fetchLikes(id));

  const addLike = likeDetails => dispatch(createLike(likeDetails))
  const removeLike = likeDetails => dispatch(deleteLike(likeDetails))


  // const authLike =  (auth_id, post_id) => dispatch(fetchAuthLike(auth_id, post_id))


  useEffect(() => {
    getPostLikes(postID);

    // if(authID){
    //   authLike(authID, postID)
    // }
  }, [])

  // const getAuthLike = (e) => {
  //   e.preventDefault()
  //   authLike({
  //     post_id: postID,
  //     auth_id
  //   });
  // }

  const unLike = (e) => {
    e.preventDefault()
    console.log("The auth like removed")
    removeLike({
      post_id: postID,
      user_id: authID,
    })
    // setLike(like - 1)
  }

  const saveLike = (e) => {
    e.preventDefault()
    console.log("the auth just liked this post")
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