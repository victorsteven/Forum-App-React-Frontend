import React from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';

import '../posts/Posts.css';
import Default from '../../Assets/default.png'
import EditComment from './EditComment'
import DeleteComment from './DeleteComment'




const Comment = ({ comment }) => {

  const currentState = useSelector(state => state)
  const authID = currentState.Auth.currentUser.id

  let commentAvatar = comment.user.avatar_path

  let imagePreview = null
  if(commentAvatar){
    imagePreview = (<img className="img_style_post" src={commentAvatar} alt="profile"/>);
  } else {
    imagePreview = (<img className="img_style_post" src={Default} alt="profile"/>);
  }
  
  return (
    <div className="mt-3">
      <Card>
        <CardBody>
          <CardTitle>
            {comment.user ?
            <span> 
              <span>
                <span className="mr-2">
                  {imagePreview}
                </span>
                <span href="" style={{fontWeight: 'bold'}}>{comment.user.username}</span>
              </span>
              <span style={{float: 'right'}}>
                <Moment fromNow>
                  {comment.created_at}
                </Moment>
              </span>
              </span>
            : "" }
            </CardTitle>
            <CardText>{comment.body}</CardText>
            { authID === comment.user.id ? (
              <div style={{float: "right"}}>
                <span style={{marginRight: "20px"}}>
                  <EditComment comment={comment} />
                </span>
                <span>
                  <DeleteComment comment={comment} />
                </span>
              </div>
            ) : ""}
        </CardBody>
      </Card>
    </div>
  )
}

export default Comment