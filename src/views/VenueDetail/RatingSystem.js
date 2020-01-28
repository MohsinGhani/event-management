import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import { venueAction } from "./../../store/actions";
import { db } from "../../firebase/FireBase";

class RatingSystem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0
    };
  }

  componentDidMount() {
    const { getRating, vid } = this.props
    // getRating({ vid })
    let feedbacks = []
    db
      .collection("feedback")
      .where("eventId", "==", vid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          feedbacks.push({ ...doc.data(), fid: doc.id });
        });

        let rating = 0
        feedbacks.map((feedback) => {
          rating += feedback.combineRating
        })
        rating = rating / feedbacks.length

        if (rating) {
          this.setState({ rating: parseInt(rating.toFixed(0)) })
        }
      })
      .catch(err => {
        return venueAction.getArchiveVenuesFailure(
          `Error in getting feedbacks! ${err}`
        );
      })
  }

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
  };

  // componentDidUpdate(prevProps) {
  //   const { feedbacked } = this.props
  //   if (prevProps.feedbacked !== feedbacked && feedbacked) {
  //     let rating = 0
  //     feedbacked.map((feedback) => {
  //       rating += feedback.combineRating
  //     })
  //     rating = rating / feedbacked.length

  //     if (rating) {
  //       this.setState({ rating: parseInt(rating.toFixed(0)) })
  //     }
  //   }
  // }

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
        // changeRating={newRating => {
        //   this.changeRating(newRating);
        // }}
        numberOfStars={rating}
        name="rating"
      />
    );
  }
}

const mapStateToProps = state => {
  const {
    venueReducer: {
      venues,
      getVenuesLoader,
      getVenuesError,
      feedbacked,
      getFeedbackLoader,
      getFeedbackError
    },
    authReducer: { user, isLoggedIn }
  } = state;
  return {
    venues,
    getVenuesLoader,
    getVenuesError,

    user,
    isLoggedIn,

    feedbacked,
    getFeedbackLoader,
    getFeedbackError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRating: payload => dispatch(venueAction.getFeedbacks(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatingSystem);
