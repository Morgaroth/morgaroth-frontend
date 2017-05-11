import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import GPBettingLeague from "./views/GPBettingLeague";
import {Cron, GPBetting, PhotoManager, Spotify} from "./views/index";
import PhotoManagerView from "./views/PhotoManagerView";
import SpotifyManager from "./views/SpotifyManager";
import CronEditor from "./views/CronEditor";

class MainView extends Component {

  static getInfoPage(type) {
    switch (type) {
      case GPBetting:
        return <GPBettingLeague />;
      case PhotoManager:
        return <PhotoManagerView />;
      case Spotify:
        return <SpotifyManager />;
      case Cron:
        return <CronEditor />;
      case null:
        return <div style={{fontSize: 40, lineHeight: 2}} className="label label-danger">Blank Info
          Page</div>;
      default:
        console.log('undefined info page type', type);
        return <div style={{fontSize: 40, lineHeight: 2}} className="label label-danger">UNDEFINED Info
          Page {type}</div>;
    }
  }

  render() {
    const {type} = this.props;
    // let selfManagingPages = ['live-prompt', 'database-actions', 'bet-browser', 'matrix'];
    // if ((type != null && selfManagingPages.indexOf(type) > 0) || status == 'OK') {
    return <div className={this.props.cls} style={{border: '2px solid black'}}>{MainView.getInfoPage(type)}</div>;
    // } else {
    //   return <div className={this.props.cls}>Loading info about {type}, {status}...</div>;
    // }
  }
}

MainView.propTypes = {
  actions: PropTypes.object.isRequired,
  cls: PropTypes.string,
  type: PropTypes.string,
  // status: PropTypes.string,
  // data: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    type: state.mainPage.type,
    // data: state.infoPage.data,
    // status: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainView)
