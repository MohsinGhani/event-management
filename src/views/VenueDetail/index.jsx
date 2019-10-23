import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
import Venues from "./Venues";
import GlobleLoader from "./GlobleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class VenueDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: "",
      servicesBookingPrice: [],
      bookingDate: new Date(),
      objStatus: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { venue } = this.props;
    if (prevProps.venue !== venue && venue) {
      debugger;
      console.log(venue);
      const { vid } = this.props.match.params;
      console.log(vid);
      debugger;
      this.setState({
        ...venue,
        objStatus: venue.objStatus,
        vid: vid
      });
    }
  }

  componentDidMount() {
    const { vid } = this.props.match.params;
    this.props.getVenue(vid);
  }

  handleOnDateChange = date => {
    this.setState({
      bookingDate: date
    });
  };

  handleDeleteStatus = () => {
    const { user, venue } = this.props;
    const { objStatus, vid } = this.state;
    console.log(objStatus);
    const newObjStatus = {
      ...venue,
      objStatus: 0,
      vid,
      userId: user && user.uid
    };
    this.props.changeObjStatus(newObjStatus);
    console.log(objStatus);
  };

  handleArchiveStatus = () => {
    const { user, venue } = this.props;
    const { objStatus, vid } = this.state;
    console.log(objStatus);
    const newObjStatus = {
      ...venue,
      objStatus: 2,
      vid,
      userId: user && user.uid
    };
    this.props.changeObjStatus(newObjStatus);
    console.log(objStatus);
  };
  successNotifiy = message => toast.success(message);

  goto = path => {
    this.props.history.push(path);
  };

  saveCustomBooking = () => {
    const { vid } = this.props.match.params;
    let user = this.props.user;

    const { servicesBookingPrice, bookingDate } = this.state;
    this.setState({
      eventId: vid
    });
    const bookingDetail = {
      userId: user && user.uid,
      eventId: vid,
      servicesBookingPrice,
      bookingDate,
      createdTimestamp: new Date().getTime()
    };
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
    const { venue, user, getVenueLoader, saveCustomBookingLoader } = this.props;
    const { servicesBookingPrice, bookingDate } = this.state;
    return (
      <div>
        <div>
          <AuthenticatedNavbar />
          <GlobleLoader getVenueLoader={getVenueLoader} />
        </div>
        <ToastContainer />

        {venue ? (
          <Venues
            venue={venue}
            user={user}
            bookingPrice={servicesBookingPrice}
            bookingDate={bookingDate}
            saveCustomBookingLoader={saveCustomBookingLoader}
            handleToggle={this.handleToggleOnService}
            saveCustomBooking={this.saveCustomBooking}
            handleOnDateChange={this.handleOnDateChange}
            successNotifiy={this.successNotifiy}
            handleDeleteStatus={this.handleDeleteStatus}
            handleArchiveStatus={this.handleArchiveStatus}
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
      dispatch(venueAction.saveCustomBooking(payload)),
    changeObjStatus: payload => dispatch(venueAction.changeObjStatus(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(carouselStyle)(VenueDetail)));
