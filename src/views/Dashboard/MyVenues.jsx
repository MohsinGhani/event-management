import React, { Component, Fragment } from "react";
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
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.jsx";
import Card from "dashboard-components/Card/Card.jsx";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import GlobleLoader from "./GlobleLoader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
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
  }

  render() {
    const { classes, getVenuesByUserId, getVenuesByUserIdLoader } = this.props;
    console.log("getVenuesByUserId: ", getVenuesByUserId);
    return (
      <div>
        <h2>My Data Collection</h2>
        <GlobleLoader getVenuesByUserIdLoader={getVenuesByUserIdLoader} />
        {getVenuesByUserId &&
          getVenuesByUserId.map((venue, index) => {
            console.log("getVenues: ", venue);
            return (
              <GridContainer>
                <GridItem xs={12} sm={2} md={2} lg={3} key={index}>
                  <Card
                    children={
                      <Fragment>
                        <CardHeader
                          style={{
                            position: "inherit",
                            opacity: 0.9,
                            display: "flex"
                          }}
                          color={"primary"}
                        >
                          <p
                            title={venue.name}
                            style={{
                              width: "100%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              margin: "5px 0 5px 0"
                            }}
                          >
                            {venue.name}
                          </p>
                        </CardHeader>
                        <CardBody
                          className="card-body"
                          style={{ color: "gray" }}
                        >
                          <Carousel
                            showThumbs={false}
                            showIndicators={false}
                            autoPlay={true}
                            infiniteLoop={true}
                          >
                            {venue.url.map(source => (
                              <img
                                src={source}
                                alt="some-img"
                                width="100%"
                                height="160px"
                                style={{
                                  // marginTop: "-36px",
                                  borderTopLeftRadius: 5,
                                  borderTopRightRadius: 5
                                }}
                              />
                            ))}
                          </Carousel>
                          <div className="card-body-info">
                            <div>
                              <div
                                className="address"
                                style={{ display: "flex", paddingTop: "5px" }}
                              >
                                <i
                                  class="fas fa-map-marker-alt"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                <p
                                  title={venue.address}
                                  style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    margin: "5px 0 0 0"
                                  }}
                                >
                                  {venue.address}
                                </p>
                              </div>

                              <div className="contact">
                                <i
                                  class="fas fa-phone"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {venue.phone}
                              </div>
                              <div className="email">
                                <i
                                  class="fas fa-envelope"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {venue.email}
                              </div>
                              <div className="type">
                                <i
                                  class="fas fa-list-ul"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {venue.objType.title}
                              </div>
                            </div>

                            <div className="right-panel">
                              <div
                                className="dtl-btn-wrapper"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end"
                                }}
                              >
                                <Button
                                  color="warning"
                                  size="sm"
                                  round
                                  onClick={() =>
                                    this.goto(`/venue-detail/${venue.vid}`)
                                  }
                                >
                                  Detail
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Fragment>
                    }
                  />
                </GridItem>
              </GridContainer>
            );
          })}
      </div>
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
