import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegHeart } from 'react-icons/fa'
import './Posts.css';
import { createLike, fetchLikes } from '../../store/modules/likes/actions/likesAction';


const Like = ({ postID }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const postLikes  =  currentState.GetLikes

  const authLiked  = currentState.authLiked

  let postLike = 0

  postLikes.likeItem.map(eachItem => {
    if(eachItem.postID === postID){
      postLike = eachItem.likes  
    }
  })

  console.log("this is the postLikes: ", postLikes)

  const [like, setLike] = useState(postLike)

  const getPostLikes = id => dispatch(fetchLikes(id));

  useEffect(() => {
    getPostLikes(postID);
  }, [])

  const deleteLike = (e) => {
    e.preventDefault()
    console.log("The auth like removed")

    // togglePost({
    //   post_id: post.id,
    //   user_id: currentUserState.currentUser.id,
    //   like: like 
    // })

    // setLike(like - 1)

  }
  
  const createLike = (e) => {
    e.preventDefault()
    console.log("the auth just liked this post")

    // togglePost({
    //   post_id: post.id,
    //   user_id: currentUserState.currentUser.id,
    //   like: like 
    // })


    // setLike(like + 1)
  }


  const likeToggle = (e) => {
    e.preventDefault()

    authLiked ? deleteLike() : createLike()

  }

  return (
    <div className="style-fav">
      <div className="style-heart-outer">
        <span className="mr-4">
          <span onClick={likeToggle}>
            <FaRegHeart className="style-heart"/>
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