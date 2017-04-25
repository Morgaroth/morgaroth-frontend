import React, {Component, PropTypes} from "react";


class ServiceUrl extends Component {
  handleEnter(e) {
    if (e.keyCode === 13) {
      this.setUrl();
    }
  }

  setUrl() {
    let a = document.getElementById("serviceurl.input");
    let value = a.value;
    if (value.length > 0 && value !== this.props.serviceUrl) {
      if (!value.startsWith("ws://")) {
        value = "ws://" + value
      }
      // if (value.endsWith("/")) {
      //     value = value.slice(0, -1)
      // }
      // if (value.endsWith(":8001") || value.endsWith(":8000")) {
      //     value = value.slice(0, -5)
      // }
      this.props.onChange(value)
    }
  };

  render() {
    const {serviceUrl, onChange} = this.props;
    return (
      <div>
        <a>Current url to service is {serviceUrl}</a><br/>
        <button onClick={() => onChange("ws://localhost:8080")}>Set to localhost</button>
        <button onClick={this.setUrl.bind(this)}>Set to:</button>
        <input id="serviceurl.input" type="url" defaultValue={serviceUrl}
               onKeyUp={this.handleEnter.bind(this)}/>
      </div>
    )
  }
}

ServiceUrl.propTypes = {
  serviceUrl: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default ServiceUrl