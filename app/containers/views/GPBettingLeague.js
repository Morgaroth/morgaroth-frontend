import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class GPBettingLeague extends Component {

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.saveCreds();
    }
  }

  doWork() {
    let userLogin = document.getElementById("login.input").value;
    let userpass = document.getElementById("password.input").value;
    if (userLogin.length > 0 && userpass.length > 0) {
      this.props.actions.sendMessage({
        event: 'RunGPBettingLeague',
        args: {credentials: {user: userLogin, password: userpass}},
      });
    } else {
      this.props.actions.internalEvent('GPFront', 'Empty credentials!')
    }
  };

  saveCreds() {
    let userLogin = document.getElementById("login.input").value;
    let userpass = document.getElementById("password.input").value;
    if (userLogin.length > 0 && userpass.length > 0) {
      this.props.actions.sendMessage({
        event: 'SaveGPCredentials',
        args: {creds: {user: userLogin, password: userpass}},
      });
    } else {
      this.props.actions.internalEvent('GPFront', 'Empty credentials!')
    }
  };

  doWorkWithPrevious() {
    this.props.actions.sendMessage({
      event: 'RunGPBettingLeague',
      args: {usePrevious: true},
    });
  };

  render() {
    return (<div className={this.props.cls}>
      <div>
        <text className="col-sm-2">Login:</text>
        <input id="login.input" type="text" value='mateusz.jaje'/><br/>
        <text className="col-sm-2">Password:</text>
        <input id="password.input" type="password" onKeyUp={this.handleEnter.bind(this)}/><br/>
        <button onClick={this.saveCreds.bind(this)}>Store credentials!</button>
        <button onClick={this.doWork.bind(this)}>Make Selections!</button>
        <button onClick={this.doWorkWithPrevious.bind(this)}>Make Selections with previous password!</button>
        <button onClick={() => this.props.actions.sendMessage({event: 'RunGPBettingLeagueTomorrowPreviousPass'})}>Run
          for tomorrow!
        </button>
      </div>
    </div>)
  }
}

GPBettingLeague.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GPBettingLeague)
