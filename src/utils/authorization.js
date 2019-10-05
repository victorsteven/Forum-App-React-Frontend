import axios from 'axios';

// export default function setAuthorizationToken(token) {
//   axios.defaults.headers.common['Authorization'] = '';
//   delete axios.defaults.headers.common['Authorization'];

//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   }
// }



export default function  setAuthorizationToken(token){
  if (token) {
    axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
    console.log("The Bearer is set")
  } else {
    console.log("Nothing")
    delete axios.defaults.headers.common['Authorization'];
  }
}
