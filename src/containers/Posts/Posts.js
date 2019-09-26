import React, { Component } from 'react'
import axios from 'axios'
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
// import NavbarClass from './containers/NavbarClass'
import API_ROUTE from '../../apiRoute'
import { FaRegHeart, FaRegComment } from 'react-icons/fa'
import './Posts.css';


class Posts extends Component {

  state = {
    posts: []
  }

  componentDidMount(){

    axios.get(`${API_ROUTE}/posts`).then(res => {
      console.log("these are the posts: ", res.data.response)
      this.setState({
        posts: res.data.response
      })
    })
  }

  render(){
    let posts = this.state.posts.map((post) => {
      return (
        <a href="/" key={post.id} className="style-anchor">
        <div  className="mt-5 style-card">
          <Card>
            <CardBody className="style-card-body">
              <CardTitle>{post.title}</CardTitle>
              <CardText>{post.content}</CardText>
              {/* <Button>Button</Button> */}
              {/* <div></div> */}
              <div className="style-fav">
                <div className="style-heart-outer">
                  <FaRegHeart className="style-heart " />
                </div>
                <div className="style-heart-outer">
                  <FaRegComment className="style-heart " />
                </div>
              </div>
              
              {/* <FaRegComment  /> */}

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
}

export default Posts