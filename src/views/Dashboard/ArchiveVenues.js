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
import SuccessTostify from "./../GlobleCompnenets/Tostify/SuccessTostify"

class ArchiveView extends React.Component {
  componentDidMount() {
    const { getArchiveVenues, user } = this.props;
    user && getArchiveVenues({ userId: user.uid });
  }

  componentDidUpdate(prevProps) {
    const { getArchiveVenues, user } = this.props;
    if(prevProps.user !== user && user){
      getArchiveVenues({ userId: user.uid });
    }
  }

  handleUnArchiveStatus = venue => {
    this.props.changeObjStatus({ ...venue, objStatus: 1 });
    SuccessTostify("Successfull Un-Archive")
    this.goto("/admin/my-venues");
  };
  

  goto = path => {
    this.props.history.push(path);
  };

  render() {
    const { getArchiveVenuesLoader, classes, archiveVenues, user } = this.props;
    return (
      <div
        style={{
          margin: "0 auto"
        }}
      >
        <CardHeader color="primary" style={{ marginTop: "2px" }}>
          <h4
            className={classes.cardTitleWhite}
            style={{
              textAlign: "center",
              marginTop: "10px"
            }}
          >
            Archive Items
          </h4>
        </CardHeader>
        <GlobleLoader getArchiveVenuesLoader={getArchiveVenuesLoader} />

        <GridContainer
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          {archiveVenues && archiveVenues.length == 0 ? (
            <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
              <CardBody>
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "red"
                  }}
                >
                  No Archive Items
                </h1>
              </CardBody>
            </Card>
          ) : (
            archiveVenues &&
            archiveVenues.map((archiveVenue, i) => {
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
                            title={archiveVenue.name}
                            style={{
                              width: "100%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              margin: "5px 0 5px 0"
                            }}
                          >
                            {archiveVenue.name}
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
                            {archiveVenue.url.map(source => (
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
                                style={{
                                  display: "flex",
                                  paddingTop: "5px"
                                }}
                              >
                                <i
                                  class="fas fa-map-marker-alt"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                <p
                                  title={archiveVenue.address}
                                  style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    margin: "5px 0 0 0"
                                  }}
                                >
                                  {archiveVenue.address}
                                </p>
                              </div>

                              <div className="contact">
                                <i
                                  class="fas fa-phone"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {archiveVenue.phone}
                              </div>
                              <div className="email">
                                <i
                                  class="fas fa-envelope"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {archiveVenue.email}
                              </div>
                              <div className="type">
                                <i
                                  class="fas fa-list-ul"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {archiveVenue.objType.title}
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
                                  onClick={() => {
                                    this.handleUnArchiveStatus(archiveVenue);
                                  }}
                                >
                                  Un Archive
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
    venueReducer: {
      archiveVenues,
      getArchiveVenuesLoader,
      getArchiveVenuesError
    },
    authReducer: { user, isLoggedIn }
  } = state;
  return {
    archiveVenues,
    getArchiveVenuesLoader,
    getArchiveVenuesError,
    user,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getArchiveVenues: payload =>
      dispatch(venueAction.getArchiveVenues(payload)),
    changeObjStatus: payload => dispatch(venueAction.changeObjStatus(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(ArchiveView)));
