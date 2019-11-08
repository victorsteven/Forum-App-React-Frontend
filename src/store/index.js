import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from './modules/index'


// FOR LOCAL BUILD
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducer,  
//   composeEnhancers(
//     applyMiddleware(thunk)
//   )
// );

// FOR PRODUCTION BUILD
const store = createStore(
    reducer,  
      applyMiddleware(thunk)
  );

export default store;

