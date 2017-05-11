import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";

class CronEditor extends Component {

  componentDidMount() {
    this.props.actions.sendMessage({
      event: 'GetEntries',
      args: {}
    });
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

  removeEntry(name) {
    return () => {
      this.props.actions.sendMessage({
        event: 'RemoveEntry',
        args: {jobName: name},
      })
    }
  }

  createEntry() {
    let name = document.getElementById("cron.name").value;
    let cmd = document.getElementById("cron.command").value;
    let args = document.getElementById("cron.args").value;
    let def = document.getElementById("cron.def").value;
    this.props.actions.sendMessage({
      event: 'AddEntry',
      args: {jobName: name, defStr: def, cmd: JSON.stringify([cmd, args])},
    });
  };

  //@formatter:off
  render() {
    let btnDisabled = !this.props.backendConnected;
    let entriesHtml = [];
    for (let e of this.props.entries) {
      entriesHtml.push(<div key={uuid()}><text>e.name ({e.defString})</text><button onClick={ this.removeEntry(e.name).bind(this)}>Remove</button></div>)
    }
    return (<div className={this.props.cls}>
      <div>
        {entriesHtml}
      </div>
      <div>
        <text>Name:    </text><input id="cron.name" type="text"/><br/>
        <text>Command: </text><input id="cron.command" type="text"/><br/>
        <text>Args:    </text><input id="cron.args" type="text"/><br/>
        <text>When:    </text><input id="cron.def" type="text"/><br/>
        <button disabled={btnDisabled} onClick={this.createEntry.bind(this)}>Save!</button>
      </div>
    </div>)
  }
  //@formatter:on
}

CronEditor.propTypes = {
  actions: PropTypes.object.isRequired,
  backendConnected: PropTypes.bool,
  entries: PropTypes.array,
  commands: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    backendConnected: state.base.wsConnected === 'connected',
    entries: state.mainPage.entries || [],
    commands: state.base.commands || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CronEditor)
