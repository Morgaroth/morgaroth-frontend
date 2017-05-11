import {combineReducers} from "redux";
import * as types from "./constants";
import {ADD_EVENT, CHANGE_URL, LOAD_WINDOW, SOCKET_CLOSED, SOCKET_CONNECTED, SOCKET_CONNECTING} from "./constants";
import {clone, merge} from "./commons";
import {GOT_CRONTAB_ENTRIES} from "./constants";
import {GOT_COMMANDS_LIST} from "./constants";

function base(state = {backendUrl: "ws://localhost:8080", wsConnected: 'no'}, action) {
  switch (action.type) {
    case CHANGE_URL:
      return {backendUrl: action.newUrl};
    case SOCKET_CONNECTING:
      return merge(state, {wsConnected: 'progress'});
    case SOCKET_CONNECTED:
      console.log('socket.io connected');
      return merge(state, {wsConnected: 'connected'});
    case SOCKET_CLOSED:
      console.log('socket.io connected');
      return merge(state, {wsConnected: 'no'});
    case GOT_COMMANDS_LIST:
      console.log('socket.io connected');
      return merge(state, {commands: action.data});
    default:
      return state;
  }
}

function eventsLog(state = {logs: []}, action) {
  switch (action.type) {
    case ADD_EVENT:
      let a = clone(state.logs);
      a.unshift(action.data);
      return merge(state, {logs: a.slice(0, 30)});
    default:
      return state
  }
}

function mainPage(state = {}, action) {
  switch (action.type) {
    case LOAD_WINDOW:
      return {type: action.window};
    case GOT_CRONTAB_ENTRIES:
      return merge(state, {entries: action.data});
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


const rootReducer = combineReducers({base, mainPage, eventsLog, appState,});

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
