import React, { Component } from "react";
import Countdown, { zeroPad } from "react-countdown-now";

export default class CountDownTimer extends Component {
  // Random component
  Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  renderer = ({ hours, days, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <span>{this.Completionist}</span>;
    } else {
      // Render a countdown
      return (
        <div
          className="counter"
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            className="text"
            style={{
              display: "flex",
              fontFamily: "Righteous"
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <div>{zeroPad(days)}</div>
              <div>Days</div>
            </div>
            <div style={{ marginRight: "5px" }}>
              <div>{zeroPad(hours)}:</div>
              <div>Hours</div>
            </div>
            <div style={{ marginRight: "5px" }}>
              <div>{zeroPad(minutes)}:</div>
              <div>Minutes</div>
            </div>
            <div style={{ marginRight: "5px" }}>
              <div>{zeroPad(seconds)}</div>
              <div>Seconds</div>
            </div>
          </div>
        </div>
      );
    }
  };
  render() {
    const { remainingTime } = this.props;
    return (
      <div>
        <Countdown
          date={new Date(remainingTime) + Date.now()}
          renderer={this.renderer}
        />
      </div>
    );
  }
}
