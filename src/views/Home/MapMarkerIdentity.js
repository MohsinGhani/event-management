import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import venuePin from "../../assets/icons/venuePin.svg";
import decoration from "../../assets/icons/decoration.svg";
import foood from "../../assets/icons/foood.svg";
import photo from "../../assets/icons/photo.svg";

class MapMarkerIdentity extends Component {
  render() {
    const { handleOnChange } = this.props;
    return (
      <div
        className="map-marker-position"
        style={{ display: "flex", justifyContent: "flex-end", padding: "5px" }}
      >
        <div
          className="map-marker-identity"
          style={{
            position: "absolute",
            border: "2px solid red",
            backgroundColor: "lightgray",
            padding: "5px",
            cursor: "pointer"
          }}
        >
           <div
            style={{ padding: "5px" }}
            onClick={() => {
              handleOnChange("all");
            }}
          >
            <img
              style={{ height: "20px", width: "20px" }}
              src={foood}
              alt={"current location"}
            />
            <img
              style={{ height: "20px", width: "20px" }}
              src={decoration}
              alt={"current location"}
            />
            <img
              style={{ height: "20px", width: "20px" }}
              src={photo}
              alt={"current location"}
            />
            <img
              style={{ height: "20px", width: "20px" }}
              src={venuePin}
              alt={"current location"}
            />
            <span>All</span>
          </div>
          <div
            style={{ padding: "5px" }}
            onClick={e => {
              handleOnChange("photographer");
            }}
          >
            <img
              style={{ height: "20px", width: "20px" }}
              src={photo}
              alt={"current location"}
            />
            <span>Photographers</span>
          </div>
          <div
            style={{ padding: "5px" }}
            onClick={() => {
              handleOnChange("venue");
            }}
          >
            <img
              style={{ height: "20px", width: "20px" }}
              src={venuePin}
              alt={"current location"}
            />
            <span>Venues</span>
          </div>
          <div
            style={{ padding: "5px" }}
            onClick={() => {
              handleOnChange("decorator");
            }}
          >
            <img
              style={{ height: "20px", width: "20px" }}
              src={decoration}
              alt={"current location"}
            />
            <span>Decorators</span>
          </div>
          <div
            style={{ padding: "5px" }}
            onClick={() => {
              handleOnChange("food_and_caterers");
            }}
          >
            <img
              style={{ height: "20px", width: "20px" }}
              src={foood}
              alt={"current location"}
            />
            <span>Food And Caterers</span>
          </div>
         
        </div>
      </div>
    );
  }
}
export default MapMarkerIdentity;
