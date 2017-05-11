import * as types from "./constants";
import {SEND_MESSAGE, SOCKET_CONNECT} from "./constants";
import {merge} from "./commons";
import {Cron, GPBetting, PhotoManager, Spotify} from "./containers/views/index";
import {ADD_EVENT} from "./constants";
import {LOAD_WINDOW} from "./constants";
import {TOGGLE_APP_STATE} from "./constants";


function action(type, more) {
  return merge({type: type}, more || {})
}

export function openSocket(address) {
  return {
    type: SOCKET_CONNECT,
    url: address,
  }
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    data: message
  }
}

export function connectToBackend() {
  return (dispatch, getState) => {
    dispatch(action(types.SOCKET_CONNECTING));
    dispatch(openSocket(getState().base.backendUrl));
  }
}

export function changeBackendURL(url) {
  return (dispatch) => {
    dispatch({type: types.CHANGE_URL, newUrl: url});
    dispatch(connectToBackend());
  }
}

export function toggleShowingState() {
  return action(TOGGLE_APP_STATE);
}


export function gpBettingLeague() {
  return {type: LOAD_WINDOW, window: GPBetting}
}

export function photoManager() {
  return {type: LOAD_WINDOW, window: PhotoManager}
}
export function spotifyManager() {
  return {type: LOAD_WINDOW, window: Spotify}
}
export function crontab() {
  return {type: LOAD_WINDOW, window: Cron}
}

export function handleServerMessage(name, data) {
  console.log("received", name, data);
  return {type: name, data: data}
}

export function appendEvent(ev) {
  return action(ADD_EVENT, {data: ev})
}

//
// export function connect(url, token) {
//   return {
//     type: types.SOCKET_CONNECT,
//     url: url + ":8000",
//     token: token
//   }
// }
//
// export function loadToken() {
//   return (dispatch, getState) => {
//     dispatch({type: types.LOAD_TOKEN});
//     dispatch(fetchRoomsFromServer());
//     dispatch(connect(getState().auth.url, getState().auth.token))
//   }
// }
//
// export function deepLinkToBetBrowser(qprop) {
//   console.log('loading deep link', qprop);
//   return (dispatch, getState) => {
//     dispatch(action(types.LOADING_BET_BROWSER));
//     return BBPost(getState(), '/betting/bet-browser/deep-link', qprop)
//     .then(response => response.json())
//     .then(resp => dispatch(action(types.LOADED_BET_BROWSER, {data: resp})));
//   }
// }
//
// export function deepLinkToCoupon(data, marketName = undefined) {
//   console.log('loading deep link to coupon', data, 'with market', marketName);
//   return (dispatch, getState) => {
//     dispatch({type: types.LOADING_INFO_PAGE, page: 'coupon'});
//     let marketQ = '';
//     if (marketName != undefined) {
//       marketQ = '?market-name=' + marketName
//     }
//     return BBPost(getState(), '/betting/info-pages/coupon/v2' + marketQ, data)
//     .then(response => response.json())
//     .then(resp => dispatch(action(types.INFO_PAGE, {
//       page: 'coupon',
//       data: resp,
//       additional: {
//         market: marketName,
//       },
//     })));
//   }
// }
//
// export function fetchInfoPage(type, qprop) {
//   console.log('loading', type, 'info page', qprop);
//   return (dispatch, getState) => {
//     dispatch({type: types.LOADING_INFO_PAGE, page: type});
//     return fetch(getState().auth.url + ':8001/betting/info-pages/' + type + '/' + qprop.name, bbOpts(getState()))
//     .then(response => response.json())
//     .then(json => dispatch({type: types.INFO_PAGE, page: type, qprop: qprop, data: json}));
//   }
// }
//
// export function fetchBetInfoPage(messageOrBetId) {
//   console.log('loading bet info page', messageOrBetId);
//   return (dispatch, getState) => {
//     let q = 'bet-id=' + messageOrBetId;
//     if (typeof(messageOrBetId) == 'object') {
//       q = 'message-id=' + messageOrBetId.messageId;
//     }
//     dispatch({type: types.LOADING_INFO_PAGE, page: 'bet'});
//     return fetch(getState().auth.url + ':8001/betting/info-pages/bet?' + q, bbOpts(getState()))
//     .then(response => {
//       if (response.status == 404) {
//         return dispatch({type: types.INFO_PAGE_NOT_FOUND, page: 'bet', qprop: messageOrBetId})
//       } else {
//         return response.json()
//         .then(json => dispatch({type: types.INFO_PAGE, page: 'bet', qprop: messageOrBetId, data: {options: json}}))
//       }
//     });
//   }
// }
//
// export function fetchDateRangeInfoPage(info) {
//   console.log('loading date-range info page', info);
//   return (dispatch, getState) => {
//     dispatch({type: types.LOADING_INFO_PAGE, page: 'date-range'});
//     return fetch(getState().auth.url + ':8001/betting/info-pages/date-range?date-start=' + info.dateStart + '&date-end=' + info.dateEnd, bbOpts(getState()))
//     .then(response => response.json())
//     .then(json => dispatch({
//       type: types.INFO_PAGE,
//       page: 'date-range',
//       qprop: info,
//       data: merge({dateStart: info.dateStart, dateEnd: info.dateEnd}, json)
//     }));
//   }
// }
//
// export function fetchCouponView(block) {
//   console.log('loading data info page by browser-block', block);
//   return (dispatch, getState) => {
//     dispatch({type: types.LOADING_INFO_PAGE, page: 'coupon', qprop: {name: block.text.toLowerCase}});
//     BBPost(getState(), '/betting/info-pages/date/coupon', block)
//     .then(response => response.json())
//     .then(json => dispatch({
//       type: types.INFO_PAGE,
//       page: 'coupon',
//       qprop: {name: block.text},
//       data: json
//     }));
//   }
// }
//
// export function loadInfoPage(type, info) {
//   console.log('loadInfoPage', '\'' + type + '\'', info);
//   switch (type) {
//     case 'player':
//     case 'team':
//       return fetchInfoPage(type, info);
//     case 'date':
//       return fetchInfoPage(type, info);
//     case 'date-range':
//       return fetchDateRangeInfoPage(info);
//     case 'bet':
//       return fetchBetInfoPage(info);
//     default:
//       console.log('unknown info page type', type);
//       return {type: 'ignoring'};
//   }
// }
//
// export function updateSuggestions(data) {
//   return {type: types.LOADED_PROP_SUGGESTIONS, data: data}
// }
//
// export function sendMsgForProgress(text) {
//   return (dispatch, getState) => {
//     dispatch({type: types.LOADING_PROP_SUGGESTIONS});
//     if (SUGGESTIONS_TUNNEL == 'http') {
//       return BBPost(getState(), '/prompt/', {message: text})
//       .then(response => response.json())
//       .then(json => dispatch(updateSuggestions(json)));
//     } else if (SUGGESTIONS_TUNNEL == 'socketio') {
//       dispatch({type: types.FIND_SUGESTIONS, message: text});
//     } else {
//       console.log('unknown suggestions tunnel', SUGGESTIONS_TUNNEL)
//     }
//   }
// }
//
// export function selectRoom(id) {
//   return (dispatch) => {
//     dispatch({type: types.SELECT_ROOM, id: id});
//     dispatch(loadSelectedRoom())
//   }
// }
//
// export function tryLogin(phone) {
//   return prepareLogin(phone)
// }
//
// export function prepareLogin(phone) {
//   console.log("Preparing login with phone:", phone);
//   return (dispatch, getState) => {
//     return fetch(getState().auth.url + ':8001/users/auth/' + phone)
//     .then(response => response.json())
//     .then(json => dispatch(proceedLogin(phone, json.code)));
//   }
// }
//
// export function registerUser(name, surname, pin, phone, mail) {
//   console.log("Preparing register with:", name, surname, pin, phone, mail);
//   return (dispatch, getState) => {
//     return BBPost(getState(), '/users', {
//       firstName: name,
//       lastName: surname,
//       phoneNumber: phone,
//       pin: pin,
//       preferences: [],
//       email: mail,
//     }).then(response => response.json())
//     .then(json => dispatch(proceedLogin(phone, json.code)));
//   }
// }
//
// export function proceedLogin(phone, code) {
//   console.log("Logging with phone:", phone, code);
//   return (dispatch, getState) => {
//     return fetch(getState().auth.url + ':8001/users/auth/', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       mode: 'cors',
//       body: JSON.stringify({phoneNumber: phone, smsCode: code})
//     }).then(response => response.json())
//     .then(json => dispatch(saveUserToken(json)));
//
//   }
// }
//
//
// export function saveUserToken(json) {
//   return (dispatch) => {
//     dispatch({type: types.SAVE_TOKEN, data: json});
//     dispatch(loadToken());
//   }
// }
//
// export function loadSelectedRoom() {
//   return (dispatch, getState) => {
//     return fetch(getState().auth.url + ':8001/rooms/' + getState().rooms.selected + "/history?limit=30&olderThan=" + new Date().toISOString(), bbOpts(getState()))
//     .then(response => response.json())
//     .then(json => dispatch(handleRoomHistory(json)));
//   }
// }
//
// export function fetchRoomsFromServer() {
//   return (dispatch, getState) => {
//     if (!getState().auth.needsLogin) {
//       return fetch(getState().auth.url + ':8001/rooms', bbOpts(getState()))
//       .then(response => response.json())
//       .then(json => dispatch(refreshRoomsList(json)))
//       .then(() => dispatch(loadSelectedRoom()));
//     } else {
//       console.log("not fetching, login is disabled")
//     }
//   }
// }
//
// export function fetchShortcuts() {
//   return (dispatch, getState) => {
//     dispatch(action(types.LOADING_SHORTCUTS));
//     if (!getState().auth.needsLogin) {
//       return fetch(getState().auth.url + ':8001/betting/shortcuts', bbOpts(getState()))
//       .then(response => response.json())
//       .then(json => dispatch(action(types.LOADED_SHORTCUTS, {data: json})))
//     } else {
//       console.log("fetchShortcuts: not fetching, user isn't logged")
//     }
//   }
// }
//
// export function loadBetBrowser() {
//   return (dispatch) => {
//     dispatch(action(types.LOAD_BET_BROWSER_WINDOW));
//     dispatch(acquireBetBrowser([], ''));
//   }
// }
//
// export function acquireBetBrowser(blocks, text) {
//   return (dispatch, getState) => {
//     console.log('acquiring', blocks);
//     dispatch(action(types.LOADING_BET_BROWSER));
//     return BBPost(getState(), '/betting/bet-browser', {query: text, blocks: blocks})
//     .then(response => response.json())
//     .then(resp => dispatch(action(types.LOADED_BET_BROWSER, {data: resp})));
//   }
// }
//
// export function loadingServerHealth() {
//   return action(types.LOADING_SERVER_HEALTH)
// }
//
// function get(name, url, onReady) {
//   return fetch('http://' + url + ':8001/_health/').then(response => {
//     if (response.status == 200) {
//       response.json().then(x => {
//         onReady({name: name, data: x});
//         return [{name: name, data: x}]
//       })
//     } else {
//       return []
//     }
//   })
// }
//
// export function loadVersionsMatrix() {
//   return (dispatch) => {
//     dispatch(action(types.MATRIX));
//     let p1 = get('DEV', 'dev-root-betblocks-01.gp-cloud.com', (x) => dispatch(action(types.MATRIX, {data: x})));
//     let p2 = get('STG', 'stg-root-betblocks-01.gp-cloud.com', (x) => dispatch(action(types.MATRIX, {data: x})));
//     let p3 = get('LOCAL', 'localhost', (x) => dispatch(action(types.MATRIX, {data: x})));
//     let p4 = get('VAG', '192.168.33.6', (x) => dispatch(action(types.MATRIX, {data: x})));
//     return Promise.all([p1, p2, p3, p4])
//   }
// }
//
// export function handleServerHealth(data) {
//   return {type: types.LOADED_SERVER_HEALTH, data: {health: data}}
// }
//
//
// export function loadServerHealth() {
//   return (dispatch, getState) => {
//     dispatch(loadingServerHealth());
//     return fetch(getState().auth.url + ':8001/_health/', bbOpts(getState()))
//     .then(response => response.json())
//     .then(json => dispatch(handleServerHealth(json)));
//   }
// }
//
// export function loadDatabaseActions() {
//   return action(types.SHOW_INFO_DATA_PANEL)
// }
//
// export function DataApi_update(part) {
//   return (dispatch, getState) => {
//     dispatch(action(types.LOADING_INFO_DATA_ACTION, {name: part}));
//     return fetch(getState().auth.url + ':8001/betting/db-manager/update/' + part, bbOpts(getState(), {method: 'PUT'}))
//     .then(response => response.text())
//     .then(resp => dispatch(action(types.LOADED_INFO_DATA_ACTION, {data: part + ' ' + resp})));
//   }
// }
//
// export function Keywords_update(part) {
//   return (dispatch, getState) => {
//     dispatch(action(types.LOADING_INFO_DATA_ACTION, {name: part}));
//     return fetch(getState().auth.url + ':8001/betting/data/keywords/' + part, bbOpts(getState(), {method: 'PUT'}))
//     .then(response => response.text())
//     .then(resp => dispatch(action(types.LOADED_INFO_DATA_ACTION, {data: part + ' ' + resp})));
//   }
// }
//
// export function shareBet(betId, roomIds) {
//   console.log('Sending BetShare request:', betId, roomIds);
//   return (dispatch, getState) => {
//     return BBPost(getState(), '/betting/bets/share', {betId: betId, rooms: roomIds})
//   }
// }