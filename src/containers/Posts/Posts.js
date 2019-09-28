import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from '../../actions/fetch_posts';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { FaRegHeart, FaRegComment } from 'react-icons/fa'
import './Posts.css';


const Posts = () => {

  const postsSelector = useSelector((state) => state.FetchPosts);
  const dispatch = useDispatch();

  const getPosts = () => dispatch(fetchPosts());

  useEffect(() => {
    getPosts();
  })

  // return (
  //   <div className="className">
  //     {postsSelector.posts.map((post) => {
  //       return (

  //       <a href="/" key={post.id} className="style-anchor">
  //       <div  className="mt-5 style-card">
  //         <Card>
  //           <CardBody className="style-card-body">
  //             <CardTitle>{post.title}</CardTitle>
  //             <CardText>{post.content}</CardText>
  //             <div className="style-fav">
  //               <div className="style-heart-outer">
  //                 <FaRegHeart className="style-heart " />
  //               </div>
  //               <div className="style-heart-outer">
  //                 <FaRegComment className="style-heart " />
  //               </div>
  //             </div>
  //           </CardBody>
  //         </Card>
  //       </div>
  //       </a>
  //       )
  //     })}
  //   </div>
  // );

  // A cleaner approach
  let posts = postsSelector.posts.map((post) => {
    return (
      <a href="/" key={post.id} className="style-anchor">
      <div  className="mt-5 style-card">
        <Card>
          <CardBody className="style-card-body">
            <CardTitle>{post.title}</CardTitle>
            <CardText>{post.content}</CardText>
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
      </a>
    );
  })
  return (
    <div>{posts}</div>
  )
}

export default Posts