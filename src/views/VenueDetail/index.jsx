import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
// @material-ui/core components
// @material-ui/icons
// core components
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
// core components
import Venues from "./Venues";
import GlobleLoader from "./GlobleLoader";

class VenueDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: "",
      servicesBookingPrice: []
    };
  }

  componentDidMount() {
    const { vid } = this.props.match.params;
    console.log(this.props);
    this.props.getVenue(vid);
    // console.log(vid);
  }

  saveCustomBooking = () => {
    const { vid } = this.props.match.params;
    const { servicesBookingPrice } = this.state;
    this.setState({
      eventId: vid
    });
    const bookingDetail = {
      userId: "current user id",
      eventId: vid,
      servicesBookingPrice,
      createdTimestamp: new Date().getTime()
    };
    console.log(bookingDetail);
    this.props.saveCustomBooking(bookingDetail);
    this.setState({
      servicesBookingPrice: []
    });
  };

  handleToggleOnService = value => {
    let { servicesBookingPrice } = this.state;

    // check the value in array thorugh filter

    var isExist = servicesBookingPrice.filter(service => {
      return service.title === value.title;
    });

    if (isExist.length) {
      // remove array is exit through filter
      var removePrice = servicesBookingPrice.filter(service => {
        return service.title !== value.title;
      });
      this.setState({
        servicesBookingPrice: removePrice
      });
    } else {
      servicesBookingPrice.push(value);
      this.setState({
        servicesBookingPrice
      });
    }
  };

  render() {
    const { classes, venue, getVenueLoader } = this.props;
    const { servicesBookingPrice } = this.state;
    // console.log(venue);
    return (
      <div>
        <div>
          <AuthenticatedNavbar />
          <GlobleLoader getVenueLoader={getVenueLoader} />
        </div>
        {venue ? (
          <Venues
            venue={venue}
            bookingPrice={servicesBookingPrice}
            handleToggle={this.handleToggleOnService}
            saveCustomBooking={this.saveCustomBooking}
          />
        ) : null}
      </div>
    );
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
  //
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
  //
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
)(withRouter(withStyles(carouselStyle)(VenueDetail)));
