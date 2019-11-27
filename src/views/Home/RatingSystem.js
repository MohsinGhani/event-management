import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class RatingSystem extends Component {
  render() {
    const { combineRating } = this.props;
    console.log(combineRating)
    return (
      <StarRatings
        rating={combineRating}
        starRatedColor="rgb(221, 175, 55)"
        starEmptyColor="rgb(203, 211, 227)"
        starHoverColor="rgb(221, 175, 55)"
        starDimension="20px"
        starSpacing="3px"
        numberOfStars={5}
        name="rating"
      />
    );
  }
}
export default RatingSystem;
