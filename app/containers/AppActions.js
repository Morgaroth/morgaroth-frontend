import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";

class AppActions extends Component {

  render() {
    const {actions, cls} = this.props;
    return (<div style={{border: '1px solid black', marginBottom: '10px'}} className={cls}>
      <button onClick={() => actions.gpBettingLeague()}>GP BL</button>
      <button onClick={() => actions.photoManager()}>Photo Manager</button>
      <button onClick={() => actions.spotifyManager()}>Spotify</button>
      <button onClick={() => actions.crontab()}>CronTab</button>
    </div>)
  }
}

AppActions.propTypes = {
  actions: PropTypes.object,
  state: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    state: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppActions)
