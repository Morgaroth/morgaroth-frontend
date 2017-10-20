import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import {connectToBackend} from "./actions";
import rootReducer from "./reducers";
import socketMiddleware from "./socketIOMiddleware";

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, socketMiddleware, createLogger())
  );

  store.dispatch(connectToBackend("ws://127.0.0.1:8888"));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
