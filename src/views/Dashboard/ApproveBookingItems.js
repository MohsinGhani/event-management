import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authAction, venueAction } from "../../store/actions";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

class ApproveBookingItems extends Component {
  componentDidMount() {
    const { user, getPendingBookingApprovalAction } = this.props;
    getPendingBookingApprovalAction({ userId: user.uid });
  }

  render() {
    return <div>hello</div>;
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: {
      pendingBookingApproval,
      getPendingBookingApprovalLoader,
      getPendingBookingApprovalError
    }
  } = state;
  return {
    user,
    isLoggedIn,
    pendingBookingApproval,
    getPendingBookingApprovalLoader,
    getPendingBookingApprovalError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPendingBookingApprovalAction: payload =>
      dispatch(venueAction.getPendingBookingApproval(payload)),
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getBookingItemDetails: eventId => dispatch(venueAction.getVenue(eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(ApproveBookingItems)));
