import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import MainView from "./MainView";
import AppActions from "./AppActions";
import EventsLog from "./views/EventsLog";

class MainClient extends Component {
  render() {
    return <div>
      <AppActions cls="col-md-12"/>
      <MainView cls='col-md-8'/>
      <EventsLog cls="col-md-4"/>
    </div>;
  }
}

MainClient.propTypes = {
  // actions: PropTypes.object,
  // needsLogin: PropTypes.bool,
  // serviceUrl: PropTypes.string,
  // roomInfo: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    // serviceUrl: state.auth.url,
    // needsLogin: state.auth.needsLogin,
    // roomInfo: state.rooms
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainClient)
