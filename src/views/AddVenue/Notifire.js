import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Notifire extends Component {
  notifyA = () => toast.success("Wow so easy !", { containerId: "A" });
  notifyB = () => toast.warn("Wow so easy !", { containerId: "B" });

  render() {
    return (
      <div>
        <ToastContainer
          enableMultiContainer
          containerId={"A"}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <ToastContainer
          enableMultiContainer
          containerId={"B"}
          position={toast.POSITION.TOP_RIGHT}
        />

        <button onClick={this.notifyA}>Notify A !</button>
        <button onClick={this.notifyB}>Notify B !</button>
      </div>
    );
  }
}
