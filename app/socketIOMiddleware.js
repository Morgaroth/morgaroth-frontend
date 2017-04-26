import * as actions from "./actions";
import {SEND_MESSAGE, SOCKET_CLOSED, SOCKET_CONNECT, SOCKET_CONNECTED, SOCKET_DISCONNECT} from "./constants";
import io from "socket.io-client";

const socketMiddleware = (function () {

  let socket = null;

  const onMessage = (store) => evt => {
    store.dispatch(actions.handleServerMessage(evt));
  };
  const onServerLog = (store) => evt => {
    store.dispatch(actions.appendEvent(evt));
  };

  return store => next => action => {
    switch (action.type) {

      //The user wants us to connect
      case SOCKET_CONNECT:
        //Start a new connection to the server
        if (socket !== null) {
          socket.close();
        }
        socket = io.connect(action.url, {transports: ["websocket"]});

        socket.on('connect', function () {
          store.dispatch({type: SOCKET_CONNECTED});
          console.log('SocketIO connected')
        });

        socket.on('disconnect', function () {
          console.log('SocketIO disconnected');
          store.dispatch({type: SOCKET_CLOSED});

        });
        socket.on("ServerEvent", onServerLog(store));
        socket.on("SSE", onMessage(store));
        break;

      //The user wants us to disconnect
      case SOCKET_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        console.log('socket disconnected');
        // store.dispatch(actions.disconnected());
        break;

      case SEND_MESSAGE:
        console.log("sending message " + action);
        console.log(action);
        socket.emit(action.data.event, action.data.args);
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware