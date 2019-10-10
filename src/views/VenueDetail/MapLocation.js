import React, { Component } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import credentials from "../../config/credentials";
import marker from "../../../src/assets/icons/marker.svg";

const Map = ReactMapboxGl({
  accessToken: credentials.MAP_ACCESS_TOCKEN
});

export default class MapLocation extends Component {
  render() {
    const { location } = this.props;
    if (location) {
      return (
        <Map
          style={"mapbox://styles/mapbox/streets-v9"}
          containerStyle={{
            height: "360px",
            width: "360px",
            border: "2px solid red"
          }}
          movingMethod={"jumpTo"}
          center={[location.longitude, location.latitude]}
        >
          <Marker coordinates={[location.longitude, location.latitude]}>
            <img
              style={{ height: 15, width: 15 }}
              src={marker}
              alt={"current location"}
            />
          </Marker>
        </Map>
      );
    } else {
      return <div>No Location Found</div>;
    }
  }
}
