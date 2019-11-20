import React, { Component } from "react";
import ReactLoading from "react-loading";

export default class GlobleLoader extends Component {
  render() {
    const { getVenuesByUserIdLoader, getBookingItemLoader, getArchiveVenuesLoader, getPendingStatusVenuesLoader } = this.props;
    return (
      <div>
        {getVenuesByUserIdLoader || getBookingItemLoader || getArchiveVenuesLoader || getPendingStatusVenuesLoader ? (
          <div
            style={{
              margin: "0 auto",
              width: "20%",
              top: "25%",
              left: "25%",
              right: "25%"
            }}
          >
            <ReactLoading
              type={"cylon"}
              color={"#e91e63"}
              height={"30%"}
              width={"100%"}
            />
          </div>
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}
