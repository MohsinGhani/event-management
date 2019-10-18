import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "./../../store/actions";

class UpdateVenue extends Component {
  componentDidMount() {
      debugger
    const { vid } = this.props.match.params;
    this.props.getVenue(vid);
    console.log(this.props.getVenue())
  }
  render() {
    debugger
    
    return <div></div>;
  }
}
const mapStateToProps = state => {
    const {
      authReducer: { user, isLoggedIn },
      venueReducer: {
        venue,
        getVenueLoader,
        getVenueError,
        saveCustomBooking,
        saveCustomBookingLoader,
        saveCustomBookingError
      }
    } = state;
    return {
      venue,
      getVenueLoader,
      getVenueError,
  
      saveCustomBooking,
      saveCustomBookingLoader,
      saveCustomBookingError,
  
      user,
      isLoggedIn
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
      getVenue: vid => dispatch(venueAction.getVenue(vid)),
      saveCustomBooking: payload =>
        dispatch(venueAction.saveCustomBooking(payload))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(withStyles(UpdateVenue)));
