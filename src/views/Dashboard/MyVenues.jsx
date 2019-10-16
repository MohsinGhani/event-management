import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authAction, venueAction } from "./../../store/actions";
import auth from "../../firebase/FireBase";
// @material-ui/core dashboard-components
import withStyles from "@material-ui/core/styles/withStyles";
// core dashboard-components
import Quote from "dashboard-components/Typography/Quote.jsx";
import Muted from "dashboard-components/Typography/Muted.jsx";
import Primary from "dashboard-components/Typography/Primary.jsx";
import Info from "dashboard-components/Typography/Info.jsx";
import Success from "dashboard-components/Typography/Success.jsx";
import Warning from "dashboard-components/Typography/Warning.jsx";
import Danger from "dashboard-components/Typography/Danger.jsx";
import Card from "dashboard-components/Card/Card.jsx";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class MyVenues extends Component {
  componentDidMount() {
    const { getVenuesByUserIdDetails, user } = this.props;
    getVenuesByUserIdDetails({ userId: user.uid });

    console.log(user);
  }

  render() {
    const { classes, getVenuesByUserId } = this.props;
    console.log("getVenuesByUserId: ", getVenuesByUserId);
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>My Data Collection</h4>
        </CardHeader>
        <CardBody>
          <div className={classes.typo}>
            {getVenuesByUserId &&
              getVenuesByUserId.map((venue, index) => {
                console.log("getVenues: ", venue);
                debugger;

                return (
                  <div key={index}>
                    <li>{venue.name}</li>
                    <br />
                    <li>{venue.phone}</li>
                    <br />
                  </div>
                );
              })}
          </div>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: {
      venues,
      getVenuesByUserId,
      getVenuesByUserIdLoader,
      getVenuesByUserIdError
    }
  } = state;
  return {
    user,
    isLoggedIn,

    venues,
    getVenuesByUserId,
    getVenuesByUserIdLoader,
    getVenuesByUserIdError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getVenuesByUserIdDetails: payload =>
      dispatch(venueAction.getVenuesByUserId(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(style)(MyVenues)));

// export default withStyles(style)(MyVenues)
