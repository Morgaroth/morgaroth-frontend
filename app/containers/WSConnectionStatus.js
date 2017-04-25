import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

class WSConnectionStatus extends Component {

  render() {
    let s = {fontSize: 30, lineHeight: 2};

    const {state} = this.props;
    if (state === 'connected') {
      return <a className="label label-info" style={s}>Connected.</a>
    } else if (state === 'progress') {
      return <a className="label label-warning" style={s}>Connecting...</a>
    } else if (state === 'no') {
      return <a className="label label-danger" style={s}>Disconnected.</a>
    } else {
      return <a className="label label-danger" style={s}>{state}.</a>
    }
  }
}

WSConnectionStatus.propTypes = {
  status: PropTypes.string,
};


function mapStateToProps(state) {
  return {
    state: state.base.wsConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(WSConnectionStatus)
