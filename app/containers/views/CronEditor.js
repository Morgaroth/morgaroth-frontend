import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {actionsProp} from "../../actions";
import {uuid} from "../../commons";
import Select from "react-select";

class CronEditor extends Component {

  constructor(props) {
    super(props);
    this.createEntry = this._createEntry.bind(this);
    this.logChange = this.logChange.bind(this);
    this.state = {
      options: props.commands.map(x => {
        return {value: x, label: x}
      })
    }
  }

  componentDidMount() {
    this.props.actions.fetchCrontabEntries();
    this.props.actions.sendMessage({event: 'GetCommandsList'});
  }

  componentDidUpdate() {
    this.state = {
      options: this.props.commands.map(x => {
        return {value: x, label: x}
      }),
      selectValue: this.state.selectValue,
    }
  }

  removeEntry(name) {
    return () => {
      this.props.actions.sendMessage({
        event: 'RemoveEntry',
        args: {jobName: name},
      })
    }
  }

  _createEntry() {
    let name = document.getElementById("cron.name").value;
    // let cmd = this.state.commandSelected;
    let cmd = this.state.selectValue;
    // let cmd = this.cmd.value;
    console.log(this, this.state, cmd);
    let args = JSON.parse(document.getElementById("cron.args").value);
    let def = document.getElementById("cron.def").value;
    this.props.actions.sendMessage({
      event: 'AddEntry',
      args: {jobName: name, defStr: def, cmd: JSON.stringify([cmd, args])},
    });
  };

  logChange(val) {
    this.setState({selectValue: val});
  }

  //@formatter:off
  render() {
    let btnDisabled = !this.props.backendConnected;
    let entriesHtml = [];
    for (let e of this.props.entries) {
      entriesHtml.push(<div key={uuid()}>
        <text>{e.name} {e.command} ({e.defString})</text>
        <button onClick={ this.removeEntry(e.name).bind(this)}>Remove</button>
      </div>)
    }

    return (<div className={this.props.cls}>
      <div>
        {entriesHtml}
      </div>
      <hr/>
      <div>
        <text className="col-sm-2">Name:</text>
        <input id="cron.name" type="text"/><br/>
        <text className="col-sm-2">Command:</text>
        <Select
          name="cron.command"
          options={this.state.options}
          simpleValue
          value={this.state.selectValue}
          onChange={this.logChange}
        /><br/>
        <text className="col-sm-2">Args:</text>
        <input id="cron.args" type="text"/><br/>
        <text className="col-sm-2">When:</text>
        <input id="cron.def" type="text"/><br/>
        <button className="col-sm-2" disabled={btnDisabled} onClick={this.createEntry}>Save!</button>
      </div>
    </div>)
  }

  //@formatter:on
}

CronEditor.propTypes = {
  actions: actionsProp,
  backendConnected: PropTypes.bool,
  entries: PropTypes.arrayOf(PropTypes.shape({
    defString: PropTypes.string.isRequired,
    command: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
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
