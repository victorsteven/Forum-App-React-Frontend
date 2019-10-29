import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux'
import {
  Card, CardText, CardBody,
  CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import './Posts.css';
import Like from './Like'
import Comments from '../Comments/Comments'
import './Posts.css';
import Default from '../../Assets/default.png'
import { updatePost } from '../../store/modules/post/actions/singlePostAction'
import EditPost from './EditPost';
import DeletePost from './DeletePost'



const Post = ({ post }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = (e) => {
    e.preventDefault()
    setDropdownOpen(prevState => !prevState);
  }

  // const dispatch = useDispatch()
  // const theUpdate = (details) => dispatch(updatePost(details))

  const deletePost = (e) => {
    e.preventDefault()
    console.log("delete post")
  }

  let $imagePreview = null;
  if(post.author.avatar_path){
    $imagePreview = (<img className="img_style" src={post.author.avatar_path} alt="no one"/>);
  } else {
    $imagePreview = (<img className="img_style" src={Default} alt="no one 2"/>);
  }
  
  return (
        <Card className="style-card-main">
          <CardBody className="style-card-body">
          <CardTitle>
            <span>
              <span className="mr-2">
                {$imagePreview}
              </span>
              <span href="" style={{fontWeight: 'bold'}}>{post.author.username}</span>
            </span>
            <span style={{float: 'right'}}>
              <Moment fromNow>{post.author.created_at}</Moment>
            </span>
            </CardTitle>
            <CardTitle>{post.title}</CardTitle>
            <CardText>{post.content}</CardText>
            <div className="style-fav">
              <Like postID={post.id} />
              <Comments postID={post.id} />
                <div className="ml-auto">
                  <span style={{marginRight: "20px"}}>
                    <EditPost post={post} />
                  </span>
                  <span>
                    <DeletePost post={post} />
                  </span>
                  

                  {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle className="toggle-style">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </DropdownToggle>
                    <DropdownMenu style={{width: "10px"}}>
                      <DropdownItem><EditPost post={post}/></DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={deletePost}>Delete Post</DropdownItem>
                    </DropdownMenu>
                  </Dropdown> */}
                </div>
            </div>
          </CardBody>
        </Card>
  )
}

export default Post