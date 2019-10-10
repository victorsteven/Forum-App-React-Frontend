import axios from 'axios';

export default function  setAuthorizationToken(token){
  if (token) {
    axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
    console.log("The Bearer is set")
  } else {
    console.log("Nothing")
    delete axios.defaults.headers.common['Authorization'];
  }
}
