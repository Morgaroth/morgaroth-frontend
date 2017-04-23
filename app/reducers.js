import {combineReducers} from "redux";
import * as types from "./constants";
import {merge} from "./commons";
import {WEBSOCKET_OPEN} from "./redux-websocket/types";

function base(state = {backendUrl: "ws://localhost:8080/ws", wsConnected: 'no'}, action) {
  switch (action.type) {
    case types.CHANGE_URL:
      return {backendUrl: action.newUrl};
    case types.CONNECTING_WS:
      return merge(state, {wsConnected: 'progress'});
    case WEBSOCKET_OPEN:
      console.log('websocker connected');
      return merge(state, {wsConnected: 'connected'});
    default:
      return state;
  }
}

function eventsPage(state = {type: null, data: null, qprop: null}, action) {
  switch (action.type) {
    default:
      return state
  }
}

function mainPage(state = {enabled: false}, action) {
  switch (action.type) {
    default:
      return state
  }
}

function appState(state = {enabled: false}, action) {
  switch (action.type) {
    case types.TOGGLE_APP_STATE:
      return {enabled: !state.enabled};
    default:
      return state
  }
}


const rootReducer = combineReducers({base, mainPage, eventsPage, appState,});

export default rootReducer

// export let serverUrl = "http://dev-root-betblocks-01.gp-cloud.com";
// if (window.location.href.startsWith("http://192.168.33.6")) {
//   serverUrl = "http://192.168.33.6";
// } else if (window.location.href.startsWith("http://prod-root-betblocks")) {
//   serverUrl = "http://prod-root-betblocks-01.gp-cloud.com";
// } else if (window.location.href.startsWith("http://dev-root-betblocks")) {
//   serverUrl = "http://dev-root-betblocks-01.gp-cloud.com";
// } else {
//   serverUrl = window.location.href;
//   if (serverUrl.endsWith('/') || serverUrl.endsWith('/') || serverUrl.endsWith('/')) {
//     serverUrl = serverUrl.slice(0, -1)
//   }
//   if (serverUrl.endsWith(':8008') || serverUrl.endsWith(':8080') || serverUrl.endsWith(':5000')) {
//     serverUrl = serverUrl.slice(0, -5)
//   }
// }
