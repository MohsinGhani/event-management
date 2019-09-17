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
import FoodCaterers from "./FoodCaterers"


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
    const { classes, venue } = this.props;
    return (
      <div>
        <div>
          <AuthenticatedNavbar />
        </div>
        {(() => {
          if (venue) {
            switch (venue.objType) {
              case "food_caterers":
                return <FoodCaterers venue={venue} />;
            }
          }
        })()}
        {/* <GridContainer>
            <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
              <Card carousel>
                <Carousel {...settings}>
                  <div>
                    <img
                      src={image1}
                      alt="First slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        <LocationOn className="slick-icons" />
                        Yellowstone National Park, United States
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src={image2}
                      alt="Second slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        <LocationOn className="slick-icons" />
                        Somewhere Beyond, United States
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src={image3}
                      alt="Third slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        <LocationOn className="slick-icons" />
                        Yellowstone National Park, United States
                      </h4>
                    </div>
                  </div>
                </Carousel>
              </Card>
            </GridItem>
          </GridContainer> */}
        <div className={classes.section}>
          <div className={classes.container}>
            <div id="nav-tabs">
              <h3>Venue Detail</h3>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomTabs
                    plainTabs
                    headerColor="danger"
                    tabs={[
                      {
                        tabName: "About",
                        tabContent: (
                          <p className={classes.textCenter}>
                            The Medallion Banquets is a perfect place to host
                            your upscale events like weddings, corporate events,
                            birthdays or private gatherings. Located at the
                            prime location with all premium facilities you may
                            need to organize a perfect event. Come and
                            experience the beautiful ambiance and see the
                            difference .For the first time in Pakistan, a double
                            story marquee with the seating capacity on first
                            floor as well with a grand view to the exquisite
                            stage !
                          </p>
                        )
                      },
                      {
                        tabName: "Discount Partners",
                        tabContent: <p className={classes.textCenter} />
                      },
                      {
                        tabName: "Terms And Conditions",
                        tabContent: (
                          <p className={classes.textCenter}>
                            Soft Drinks are not included in above package and
                            will be charged separately. (Billed on Actual
                            Consumption) Mineral Water is not included in above
                            package and will be charged separately (Billed on
                            Actual Consumption) Musical, Religious, Political,
                            Commercial or Public events are subject to approval
                            from concerned authorities Function must end at
                            12:00 A.M or else penalty rate of PKR ----/hour will
                            be applied unless NOC issued from concerned
                            authorities Confirmed booking is subject to advance
                            payment which is non refundable Any other
                            instructions conveyed at the time of booking and
                            commencement of functions by the Management has to
                            be compiled by the party Fireworks are strictly
                            prohibited within venue premises Private Guards of
                            the Party are not allowed to enter in the Lawn,
                            Carrying of Arms/Ammunitions inside the lawn
                            premises is also prohibited. Eating of Pan is not
                            allowed inside venue premises Lawn management has
                            the authority to cancel the booking at any time
                            without assigning any reason if they found anything
                            misleading or suspicious. Rates may fluctuate due to
                            seasonal variation Above rates are exclusive of all
                            applicable taxes.
                          </p>
                        )
                      },
                      {
                        tabName: "Other Charges",
                        tabContent: <p className={classes.textCenter} />
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
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

// const FoodCateres = ({ venue }) => {
//   return (
//     <div>
      // <h1>{venue.objType}</h1>
      // <h1>HELLO</h1>
      // <h1>{venue.objType}</h1>
      // <h1>{venue.objType}</h1>
      // <h1>{venue.objType}</h1>
//     </div>
//   );
// };

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
