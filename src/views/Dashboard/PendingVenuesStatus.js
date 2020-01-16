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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import GlobleLoader from "./GlobleLoader";

import RatingSystem from "./RatingSystem";

class PendingVenuesStatus extends React.Component {
  componentDidMount() {
    const { getPendingStatusVenuesDetails, user } = this.props;
    user && getPendingStatusVenuesDetails({ userId: user.uid });
  }

  componentDidUpdate(prevProps) {
    const { getPendingStatusVenuesDetails, user } = this.props;
    if (prevProps.user !== user && user) {
      getPendingStatusVenuesDetails({ userId: user.uid });
    }
  }

  goto = path => {
    this.props.history.push(path);
  };

  render() {
    const {
      classes,
      pendingStatusVenues,
      getPendingStatusVenuesLoader
    } = this.props;
    return (
      <div style={{ margin: "auto 0" }}>
        <CardHeader color="primary" style={{ marginTop: "2px" }}>
          <h4
            className={classes.cardTitleWhite}
            style={{
              textAlign: "center",
              marginTop: "10px"
            }}
          >
            Pending Venues Status
          </h4>
        </CardHeader>
        <GlobleLoader
          getPendingStatusVenuesLoader={getPendingStatusVenuesLoader}
        />
        <GridContainer
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          {pendingStatusVenues && pendingStatusVenues.length === 0 ? (
            <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
              <CardBody>
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "red"
                  }}
                >
                  No Pending Request For Venue
                </h1>
              </CardBody>
            </Card>
          ) : (
            pendingStatusVenues &&
            pendingStatusVenues.map((pendingVenue, i) => {
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
                            title={pendingVenue.name}
                            style={{
                              width: "100%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              margin: "5px 0 5px 0"
                            }}
                          >
                            {pendingVenue.name}
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
                            {pendingVenue.url.map(source => (
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
                                  title={pendingVenue.address}
                                  style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    margin: "5px 0 0 0"
                                  }}
                                >
                                  {pendingVenue.address}
                                </p>
                              </div>

                              <div className="contact">
                                <i
                                  class="fas fa-phone"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {pendingVenue.phone}
                              </div>
                              <div className="email">
                                <i
                                  class="fas fa-envelope"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {pendingVenue.email}
                              </div>
                              <div className="type">
                                <i
                                  class="fas fa-list-ul"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {pendingVenue.objType.title}
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
                                  <RatingSystem />
                                </div>
                                <Button
                                  color="warning"
                                  size="sm"
                                  round
                                  onClick={() =>
                                    this.goto(
                                      `/venue-detail/${pendingVenue.vid}`
                                    )
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
            })
          )}
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: {
      pendingStatusVenues,
      getPendingStatusVenuesLoader,
      getPendingStatusVenuesError
    }
  } = state;
  return {
    user,
    isLoggedIn,

    pendingStatusVenues,
    getPendingStatusVenuesLoader,
    getPendingStatusVenuesError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getPendingStatusVenuesDetails: payload =>
      dispatch(venueAction.getPendingStatusVenues(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(PendingVenuesStatus)));
