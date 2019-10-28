import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
// import { useSelector, useDispatch } from 'react-redux'
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
// import Like from './Like'
// import Comments from '../Comments/Comments'
import '../Posts/Posts.css';


const Comment = ({ comment }) => {
  
  return (
    <div className="mt-3">
      <Card>
        <CardBody>
          <CardTitle>
            {comment.user ?
            <span> 
              <span href="" style={{fontWeight: 'bold'}}>
                {comment.user.username}
              </span>
              <span style={{float: 'right'}}>
                <Moment fromNow>
                  {comment.user.created_at}
                </Moment>
              </span>
              </span>
            : "" }
            </CardTitle>
            <CardText>{comment.body}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Comment