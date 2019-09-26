import React from 'react';
import NavbarClass from './containers/NavbarClass'
import Posts from './containers/Posts/Posts';

const App  = () => {

  // state = {
  //   users: [],
  // }

   
    return (
      <div className="App">
      <div>
        <NavbarClass />
      </div>
        <div className="container">
          <Posts />
        </div>
      </div>
    );
}

export default App;
