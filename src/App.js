import React from 'react';
import NavbarClass from './containers/NavbarClass'
import Posts from './containers/Posts/Posts';
import { Provider } from "react-redux"
import store from './store/index'

import Routes from "./Routes";


const App  = () => {
   
    return (
      <Provider store={store}>
        <div className="App">
          <div>
            <NavbarClass />
          </div>
          <div className="container">
            <Posts />
          </div>

          {/* <main>
            <Routes />
          </main> */}
        </div>
      </Provider>
    );
}

export default App;
