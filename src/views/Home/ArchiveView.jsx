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
import Archive from "@material-ui/icons/Unarchive";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import GlobleLoader from "./GlobleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ArchiveView extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      // archiveVenues: [],
      objStatus: 0
    };
  }

  goto = path => {
    this.props.history.push(path);
  };

  // componentDidUpdate(prevProps) {
  //   const { archiveVenues } = this.props;

  //   if (prevProps.archiveVenues !== archiveVenues && archiveVenues) {
  //     console.log(archiveVenues);
  //     debugger;
  //     const { vid } = this.props.archiveVenues;
  //     console.log(vid);
  //     debugger;
  //     this.setState({
  //       ...archiveVenues,
  //       objStatus: archiveVenues.objStatus,
  //       vid: vid
  //     });
  //   }
  // }
  
  componentDidMount() {
    this.props.getArchiveVenues();
  }

  handleUnArchiveStatus = (vid) => {
    debugger
    const { user, archiveVenues } = this.props;
    const { objStatus } = this.state;
    console.log(objStatus);
    const newObjStatus = {
      ...archiveVenues,
      objStatus: 1,
      vid,
      userId: user && user.uid
    };
    this.props.changeObjStatus(newObjStatus);
    console.log(objStatus);
  };
  successNotifiy = message => toast.success(message);

  goto = path => {
    this.props.history.push(path);
  };

  render() {
    const { getArchiveVenuesLoader, classes, archiveVenues } = this.props;
    // const { archiveVenues } = this.state;

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
          <GlobleLoader getArchiveVenuesLoader={getArchiveVenuesLoader} />
          {archiveVenues &&
            archiveVenues.map((archiveVenue, i) => {
              console.log("archiveVenues=>", archiveVenue);
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
                                style={{ display: "flex", paddingTop: "5px" }}
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
                                  justifyContent: "flex-end"
                                }}
                              >
                                <Button
                                  color="warning"
                                  size="sm"
                                  round
                                  onClick={() => {
                                    this.successNotifiy(
                                      "Form Successfully UnArchive...!"
                                    );

                                    this.handleUnArchiveStatus(archiveVenue.vid);
                                    this.goto("/list-view");
                                  }}
                                >
                                  <Archive className={classes.icons} />
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
            })}
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
    getArchiveVenues: () => dispatch(venueAction.getArchiveVenues()),
    changeObjStatus: payload => dispatch(venueAction.changeObjStatus(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(ArchiveView)));
