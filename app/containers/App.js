import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ServiceUrl from "./ServiceUrl";
import * as Actions from "../actions";
import Switch from "react-toggle-switch";
import MainClient from "./MainClient";
import WSConnectionStatus from "./WSConnectionStatus";

class App extends Component {

  render() {
    const {serviceUrl, actions, state, appStateEnabled} = this.props;
    let stateTag = undefined;
    if (appStateEnabled) {
      stateTag = (<div className="col-md-12">
        <hr/>
        <p>Here is entire app state:</p>
        <pre>{JSON.stringify(state, null, 3)}</pre>
      </div>);
    }
    return (
      <div className='col-md-12'>
        <div>
          <div className='col-md-8'>
            <ServiceUrl serviceUrl={serviceUrl} onChange={actions.changeBackendURL}/>
          </div>
          <div className="col-md-4">
            <WSConnectionStatus />
          </div>
        </div>
        <hr/>
        <div className='col-md-12'>
          <MainClient />
        </div>
        <hr/>
        <div className='col-md-12'>
          <Switch on={appStateEnabled} onClick={() => this.props.actions.toggleShowingState()}/><br/>
          {stateTag}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  serviceUrl: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  appStateEnabled: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    serviceUrl: state.base.backendUrl,
    state: state,
    appStateEnabled: state.appState.enabled,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
