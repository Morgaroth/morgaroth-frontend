import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import websocket from './redux-websocket';
import {connectToBackend} from "./actions";
import rootReducer from './reducers'
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, websocket, createLogger())
  );

  store.dispatch(connectToBackend("ws://localhost:8080/ws"));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
