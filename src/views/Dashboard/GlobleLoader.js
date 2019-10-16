import React, { Component } from "react";
import ReactLoading from "react-loading";

export default class GlobleLoader extends Component {
  render() {
    const { getVenuesLoader } = this.props;
    return (
      <div>
        {getVenuesLoader ? (
          <div
            style={{
              margin: "0 auto",
              width: "20%",
              position: "absolute",
              top: "25%",
              left: "25%",
              right: "25%"
            }}
          >
            <ReactLoading
              type={"cylon"}
              color={"#e91e63"}
              height={"20%"}
              width={"100%"}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
