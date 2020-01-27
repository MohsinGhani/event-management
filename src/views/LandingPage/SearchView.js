import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction, venueAction } from "./../../store/actions";
import GridContainer from "components/Grid/GridContainer";
import VenueCard from "./../Home/VenueCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GlobleLoader from "./../Home/GlobleLoader";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Warning from "@material-ui/icons/Warning";


class SearchView extends React.Component {
  state = {
    venues: []
  };

  goto = path => {
    this.props.history.push(path);
  };

  componentDidUpdate(prevProps) {
    const { venues } = this.props;
    if (
      (prevProps.venues && prevProps.venues.length) !==
      (venues && venues.length)
    ) {
      this.setState({
        venues: venues
      });
    }
  }

  componentDidMount() {
    const { getRating, getVenues } = this.props;
    getVenues();
    getRating();
  }

  render() {
    const { getVenuesLoader, feedbacked, search } = this.props;
    const { venues } = this.state;
    return (
      <div>
        <GridContainer
          style={{
            padding: "15px 15px",
            maxWidth: "1024px",
            minHeight: "500px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          <GlobleLoader getVenuesLoader={getVenuesLoader} />
          {venues &&
            venues.map((venue, i) => {
              let combineRating = 0;

              if (feedbacked && feedbacked.length) {
                const rate = feedbacked.filter(
                  feed => venue.vid === feed.eventId
                );

                combineRating = rate.length ? rate[0].combineRating : 0;
              }

              if (venue.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                return (
                  <VenueCard
                    venue={venue}
                    i={i}
                    combineRating={combineRating}
                    goto={this.goto}
                  />
                );
              }

            })}

          {venues && venues.length && !venues.filter(venue => venue.name.toLowerCase().indexOf(search.toLowerCase()) !== -1).length &&
            <div style={{ height: 50, width: '100%' }}>
              <SnackbarContent
                message={
                  <span>
                    <b>WARNING ALERT:</b> Items not found...
                  </span>
                }
                color="warning"
                icon={Warning}
              />
            </div>
          }
        </GridContainer>
      </div>
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
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getVenues: () => dispatch(venueAction.getVenues()),
    getRating: payload => dispatch(venueAction.getFeedbacks(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(SearchView)));
