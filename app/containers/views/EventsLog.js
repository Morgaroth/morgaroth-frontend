import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import TeamInfoPage from "./TeamInfoPage";
import DateInfoPage from "./DateInfoPage";
import CouponInfoPage from "./CouponInfoPage";
import BetInfoPage from "./GPBettingLeague";
import Shortcuts from "../additional/Shortcuts";
import DataBaseMethods from "../additional/DataBaseMethods";
import VersionsMatrix from "../additional/VersionsMatrix";
import BetBrowser from "../additional/BetBrowser";
import LivePromptPage from "../additional/LivePromptPage";
import ServerHealth from "../additional/ServerHealth";
import DateRangeInfoPage from "./DateRangeInfoPage";

class EventsLog extends Component {

  render() {
    const {logs} = this.props;
    return <div style={{border: '2px solid black'}} className={this.props.cls}>Showing {logs.length} logs...</div>;

  }
}

EventsLog.propTypes = {
  actions: PropTypes.object.isRequired,
  cls: PropTypes.string,
  logs: PropTypes.array,
  // status: PropTypes.string,
  // data: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    logs: state.eventsLog.logs,
    // data: state.infoPage.data,
    // status: state.infoPage.status || null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsLog)
