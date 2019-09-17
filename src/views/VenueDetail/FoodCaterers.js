import React, { Component } from "react";

class FoodCaterers extends Component {
  render() {
    const { classes, venue } = this.props;
    return (
      <div>
        <h1>{venue.objType}</h1>
        <h1>HELLO</h1>
        <h1>{venue.objType}</h1>
        <h1>{venue.objType}</h1>
        <h1>{venue.objType}</h1>
      </div>
    );
  }
}
export default FoodCaterers;
