import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction, venueAction } from "./../../store/actions";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.jsx";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import GlobleLoader from "./GlobleLoader";

import { listenEvents } from "react-mapbox-gl/lib/map-events";
import RatingSystem from "./RatingSystem";
import Feedback from "./Feedbacks";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      venues: []
    };
  }

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
    const { getVenuesLoader, getRating, feedbacked } = this.props;
    const { venues } = this.state;
    debugger;
    return (
      <div>
        <AuthenticatedNavbar />

        <GridContainer
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          <GlobleLoader getVenuesLoader={getVenuesLoader} />
          {venues &&
            venues.map((venue, i) => {
              debugger;
              let combineRating = 0;
              
              if(feedbacked && feedbacked.length) {
                const rate = feedbacked.filter(feed => venue.vid === feed.eventId);
                console.log("rate: ",rate)

                combineRating = rate.length ? rate[0].combineRating : 0;
              }
              // console.log("venue: ", venue, "feed: ", feed)
              // console.log("rate: ", rate);

              return (
                <GridItem md={4} key={i}>
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
                                  justifyContent: "space-between"
                                }}
                              >
                                <div style={{ marginTop: "8px" }}>
                                  <RatingSystem combineRating={combineRating} />
                                  {/* <Feedback vid={venue.vid} getRating={getRating} feedbacked={feedbacked} /> */}
                                </div>

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
              );
            })}
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
)(withRouter(withStyles(loginPageStyle)(ListView)));
