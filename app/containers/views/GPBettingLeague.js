import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class GPBettingLeague extends Component {

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.doWork();
    }
  }

  doWork() {
    let a = document.getElementById("password.input");
    this.props.actions.sendMessage({
      event: 'RunGpBettingLeague',
      args: {password: a.value},
    });
  };

  render() {
    return (<div className={this.props.cls}>
      <div>
        <input id="password.input" type="password" onKeyUp={this.handleEnter.bind(this)}/>
        <button onClick={this.doWork.bind(this)}>Do Work!</button>
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
