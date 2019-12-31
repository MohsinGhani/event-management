import React, { Component } from "react";
import Warning from "components/Typography/Warning.jsx";
import FeedBackForm from "./FeedBackForm";
import Countdown, { zeroPad } from "react-countdown-now";

// Random component
const Completionist = ({eventId}) => {
  return (
    <div>
      <Warning>Your Event Time Is About To End....!</Warning>
      <FeedBackForm eventId={eventId}/>
    </div>
  );
};

export default class CountDownTimer extends Component {
  // Renderer callback with condition
  renderer = ({ hours, days, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return (
        <span>
          <Completionist eventId={this.props.eventId} />
        </span>
      );
    } else {
      // Render a countdown
      return (
        <div
          className="counter"
          style={{
            display: "flex",
            justifyContent: "flex-start"
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
    const { remainingTime, eventId } = this.props;
    return (
      <div>
        <Countdown
          date={new Date(1574573657000) + Date.now()}
          // date={new Date(remainingTime) + Date.now()}
          renderer={this.renderer}
        />
      </div>
    );
  }
}
