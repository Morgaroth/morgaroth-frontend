import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class SpotifyManager extends Component {

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.saveUri();
    }
  }

  uriAction(action) {
    let a = document.getElementById("uri.input");
    this.props.actions.sendMessage({
      event: action,
      args: {uri: a.value},
    });
  }

  saveUri() {
    this.uriAction('AddUriToMaintain')
  };

  ripIt() {
    this.uriAction('RipUri')
  };

  saveCreds() {
    let login = document.getElementById("auth.username").value;
    let pass = document.getElementById("auth.password").value;
    this.props.actions.sendMessage({
      event: 'SaveCredentials',
      args: {creds: {user: login, password: pass}},
    });
  };

  //@formatter:off
  render() {
    let btnDisabled = !this.props.backendConnected;
    return (<div className={this.props.cls}>
      <div>
        <text>Username: </text><input id="auth.username" type="text"/><br/>
        <text>Password:  </text><input id="auth.password" type="password"/><br/>
        <button disabled={btnDisabled} onClick={this.saveCreds.bind(this)}>Save!</button>
      </div>
      <div>
        <text>URI: </text><input id="uri.input" onKeyUp={this.handleEnter.bind(this)}/><br/>
        <button disabled={btnDisabled} onClick={this.saveUri.bind(this)}>Save!</button>
        <button disabled={btnDisabled} onClick={this.ripIt.bind(this)}>RipIt!</button>
      </div>
    </div>)
  }
  //@formatter:on
}

SpotifyManager.propTypes = {
  actions: PropTypes.object.isRequired,
  backendConnected: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    backendConnected: state.base.wsConnected === 'connected'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyManager)
