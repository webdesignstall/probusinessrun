import React, { Component } from "react";
import Signature from "./Signature";
import PropTypes from "prop-types";

export default class AdditionalCharge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      reason: "",
      amount: 0
    };

    this.setClick = this.setClick.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.reset = this.reset.bind(this);
  }

  setClick() {
    this.setState(prevState => {
      return {
        clicked: !prevState.clicked
      };
    });
  }

  reset() {
    this.setState({
      clicked: false,
      reason: "",
      amount: 0
    });
  }

  reasonChange(e) {
    this.setState({
      reason: e.target.value
    });
  }

  changeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  displayAdditionalCharge() {
    return (
      <div style={{ textAlign: "left" }}>
        <hr />
        <p style={{ textAlign: "left" }}>Reason:</p>
        <textarea
          name="additionalCharge"
          onChange={e => this.reasonChange(e)}
          id="additional-charge"
          style={{
            display: "inline-block",
            maxWidth: "60%",
            minWidth: "60%",
            padding: "10px",
            marginRight: "10px"
          }}
        ></textarea>
        <div
          style={{
            display: "inline-block",
            position: "absolute",
            padding: "10px"
          }}
        >
          <label htmlFor="additional-cahrge--amount" className="active">
            Charge Amount
          </label>
          <input
            className="browser-default"
            type="number"
            id="additional-cahrge--amount"
            placeholder="Enter amount"
            onChange={e => this.changeAmount(e)}
          />
        </div>
        <hr />
        <Signature
          reset={this.reset}
          which="additionalCharge"
          saveSignature={this.props.saveSignature}
          extraInformation={{
            amount: this.state.amount,
            reason: this.state.reason
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="card__">
        <div onClick={this.setClick}>Additional Charge</div>
        {this.state.clicked ? this.displayAdditionalCharge() : ""}
      </div>
    );
  }
}

AdditionalCharge.propTypes = {
  saveSignature: PropTypes.function
};
