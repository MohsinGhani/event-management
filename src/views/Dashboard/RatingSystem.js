import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class RatingSystem extends Component {
  render() {
    const { rating, handleOnChange, identifier } = this.props;
    return (
      <StarRatings
        rating={rating}
        starRatedColor="rgb(221, 175, 55)"
        starEmptyColor="rgb(203, 211, 227)"
        starHoverColor="rgb(221, 175, 55)"
        starDimension="20px"
        starSpacing="3px"
        changeRating={e => handleOnChange(e, identifier)}
        numberOfStars={5}
        name="rating"
      />
    );
  }
}
export default RatingSystem;
