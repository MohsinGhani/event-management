import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class RatingSystem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // rating: 0
      rating: 5

    };
  }

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
  };

  render() {
    const { rating } = this.state;
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor="rgb(221, 175, 55)"
        starEmptyColor="rgb(203, 211, 227)"
        starHoverColor="rgb(221, 175, 55)"
        starDimension="25px"
        starSpacing="3px"
        changeRating={newRating => {
          this.changeRating(newRating);
        }}
        numberOfStars={5}
        name="rating"
      />
    );
  }
}
export default RatingSystem;
