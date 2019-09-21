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
        <div style={{display: 'flex', justifyItems: 'center',
        alignItems: 'center'}}>
          <Map
            style={"mapbox://styles/mapbox/streets-v9"}
            containerStyle={{
              height: "250px",
              width: "250px",
              justifyContent: "center",
              alignItems: "center"
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
        </div>
      );
    } else {
      return <div>No Location Found</div>;
    }
  }
}
