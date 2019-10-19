import React, { useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { FaRegHeart, FaRegComment } from 'react-icons/fa'
import { fetchPost } from '../../store/modules/post/actions/singlePostAction'


const PostDetails = (props) => {

  const postID  = props.match.params.id

  const dispatch = useDispatch()

  const singlePost = id => dispatch(fetchPost(id))

  // const getPost = dispatch(fetchPost())

  useEffect(() => {
    singlePost(postID)
  }, [])

  const postSelector = useSelector(state => state.FetchPost)
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
              <div className="style-heart-outer">
                <FaRegHeart className="style-heart " />
              </div>
              <div className="style-heart-outer">
                <FaRegComment className="style-heart " />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
  )
}

export default PostDetails