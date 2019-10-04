import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from '../reducers/index'

// const store = createStore(
//     reducer, 
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
  // import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,  
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );

export default store;
