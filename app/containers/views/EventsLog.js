import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";

class EventsLog extends Component {

  render() {
    const {logs} = this.props;
    let elements = [];
    for (let e of logs) {
      elements.push(<div key={uuid()}>{e.source}: {e.message}</div>);
    }
    return <div style={{border: '2px solid black'}} className={this.props.cls}>
      {elements}
    </div>;
  }
}

EventsLog.propTypes = {
  actions: PropTypes.object.isRequired,
  cls: PropTypes.string,
  logs: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    logs: state.eventsLog.logs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsLog)
