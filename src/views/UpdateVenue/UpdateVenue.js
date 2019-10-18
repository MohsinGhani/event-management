import React, { Component } from "react";
import { venueAction } from "./../../store/actions";
import { connect } from "react-redux";

import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";

class UpdateVenue extends Component {
  componentDidMount() {
    const { vid } = this.props.match.params;
    this.props.getVenue(vid);
  }
  render() {

    return (
      <div>
        <AuthenticatedNavbar />
        <h1>Helloooooooooooooo World</h1>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    venueReducer: { venue, getVenueLoader, getVenueError }
  } = state;
  return {
    venue,
    getVenueLoader,
    getVenueError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVenue: vid => dispatch(venueAction.getVenue(vid))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateVenue);
