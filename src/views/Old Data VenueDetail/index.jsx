import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";

// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";

// core components
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import tabsStyle from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.jsx";
import FoodCaterers from "./FoodCaterers";
import Venues from "./Venues";
import Decorators from "./Decorators";
import Photographers from "./Photographers";
import GlobleLoader from "./GlobleLoader";

class VenueDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: []
    };
  }

  componentDidMount() {
    const { vid } = this.props.match.params;
    this.props.getVenue(vid);
    console.log(vid);
  }

  render() {
    const { classes, venue, getVenueLoader } = this.props;
    return (
      <div>
        <div>
          <AuthenticatedNavbar  navBgColor={'rose'}/>
          <GlobleLoader getVenueLoader={getVenueLoader} />
        </div>
        {(() => {
          if (venue) {
            switch (venue.objType) {
              case "food_caterers":
                return <FoodCaterers venue={venue} />;
                break;
              case "decorators_form":
                return <Decorators venue={venue} />;
                break;
              case "venue_form":
                return <Venues venue={venue} />;
                break;
              case "photographer":
                return <Photographers venue={venue} />;
                break;
              default:
                break;
            }
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: { venue, getVenueLoader, getVenueError }
  } = state;
  return {
    venue,
    getVenueLoader,
    getVenueError,
    user,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getVenue: vid => dispatch(venueAction.getVenue(vid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(carouselStyle)(VenueDetail)));
