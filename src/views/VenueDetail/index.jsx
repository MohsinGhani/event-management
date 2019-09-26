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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     venue: []
  //   };
  // }

  componentDidMount() {
    const { vid } = this.props.match.params;
    console.log(this.props)
    this.props.getVenue(vid);
    // console.log(vid);
  }

  render() {

    const { classes, venue, getVenueLoader } = this.props;
    console.log(venue)
    return (
      <div>
        <div>
          <AuthenticatedNavbar />
          <GlobleLoader getVenueLoader={getVenueLoader} />
        </div>
        {venue ? (<Venues venue={venue} />) : null}
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: { venue, getVenueLoader, getVenueError }
  } = state;
  // debugger
  return {
    venue,
    getVenueLoader,
    getVenueError,
    user,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  // debugger
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getVenue: vid => dispatch(venueAction.getVenue(vid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(carouselStyle)(VenueDetail)));
