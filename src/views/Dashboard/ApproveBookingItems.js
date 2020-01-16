import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authAction, venueAction } from "../../store/actions";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import GlobleLoader from "./GlobleLoader";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "components/CustomButtons/Button.jsx";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AuthenticatedNavbar from "../../components/common/AuthenticatedNavbar";
import SuccessTostify from "../GlobleCompnenets/Tostify/SuccessTostify";

import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#C9CDD1",
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.common.default
    }
  }
}))(TableRow);

class ApproveBookingItems extends Component {
//   state = {
//     // bookingApprovalID: null,
//     bookingStatus: 0
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const { pendingBookingApproval } = this.props;
//     if (
//       prevProps.pendingBookingApproval !== pendingBookingApproval &&
//       pendingBookingApproval
//     ) {
//       this.setState({
//         ...pendingBookingApproval,
//         bookingStatus: pendingBookingApproval.bookingStatus,
//         bookingApprovalID: pendingBookingApproval.bookingApprovalID
//       });
//     }
//   }
  componentDidMount() {
    const { user, getPendingBookingApprovalAction } = this.props;
    user && getPendingBookingApprovalAction({ userId: user.uid });
  }

  componentDidUpdate(prevProps) {
    const { getPendingBookingApprovalAction, user } = this.props;
    if (prevProps.user !== user && user) {
      getPendingBookingApprovalAction({ userId: user.uid });
    }
  }

  handleApprovedStatus = (bookingApprovalID,index ) => {
    debugger
    //   console.log(index, "index")
    //   console.log(bookingApprovalID, "ID")
      const { pendingBookingApproval } = this.props;
    //   console.log(pendingBookingApproval, "approval")
    const newObjStatus = {
      ...pendingBookingApproval[index],
      bookingStatus: 1,
      itemId: bookingApprovalID,
      collectionName: "booking"
    };
    debugger
    this.props.changeObjStatus(newObjStatus);
    console.log(newObjStatus, "=> new data")
    SuccessTostify("Archive Successfull");
  };
  goto = path => {
    this.props.history.push(path);
  };

  viewVenueDetaile = event => {
    this.props.getBookingItemDetails(event);
  };

  render() {
    const {
      classes,
      pendingBookingApproval,
      getPendingBookingApprovalLoader
    } = this.props;
    console.log(pendingBookingApproval, "approved");
    return (
      <div style={{ margin: "auto 0" }}>
        <div>
          {" "}
          <ScrollUpButton
            StopPosition={0}
            ShowAtPosition={150}
            EasingType="easeOutCubic"
            AnimationDuration={1000}
            style={{ zIndex: "1" }}
          />
        </div>

        {/* <AuthenticatedNavbar /> */}
        <CardHeader color="primary" style={{ marginTop: "2px" }}>
          <h4
            className={classes.cardTitleWhite}
            style={{
              textAlign: "center",
              marginTop: "10px"
            }}
          >
            Pending Bookings Approval Request
          </h4>
        </CardHeader>
        {pendingBookingApproval && pendingBookingApproval.length == 0 ? (
          <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
            <CardBody>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red"
                }}
              >
                No Pending Bookings Approval Request
              </h1>
            </CardBody>
          </Card>
        ) : getPendingBookingApprovalLoader ? (
          <GlobleLoader
            getPendingBookingApprovalLoader={getPendingBookingApprovalLoader}
          />
        ) : (
          <ExpansionPanel style={{ margin: "0px 15px 0px 15px" }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              style={{
                marginTop: "20px"
              }}
            >
              <Typography
                style={{
                  fontSize: "larger",
                  fontWeight: "500",
                  width: "100%"
                }}
              >
                Booked Details
              </Typography>
            </ExpansionPanelSummary>

            {pendingBookingApproval ? (
              pendingBookingApproval.map((item, index) => {
                var options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true
                };
                return (
                  <div className={"table-class"} style={{ marginTop: "10px" }}>
                    <Paper
                      style={{
                        width: "100%",
                        overflowX: "auto"
                      }}
                    >
                      <ExpansionPanelDetails>
                        <Table style={{ minWidth: "700" }}>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Booking Date</StyledTableCell>
                              <StyledTableCell>Custom Services</StyledTableCell>
                              <StyledTableCell>Package Details</StyledTableCell>
                              <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                {new Intl.DateTimeFormat(
                                  "en-US",
                                  options
                                ).format(item.bookingDate)}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item.servicesBookingPrice.length &&
                                item.servicesBookingPrice ? (
                                  item.servicesBookingPrice.map((ser, i) => {
                                    return <li key={i}>{ser.title}</li>;
                                  })
                                ) : (
                                  <span>No Custom Services</span>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item.packageArray.length &&
                                item.packageArray ? (
                                  item.packageArray.map((pack, i) => {
                                    return (
                                      <div>
                                        <h5 key={i}>{pack.packageObj}</h5>
                                        {pack.servicePackages ? (
                                          pack.servicePackages.map(
                                            (packSer, i) => {
                                              return (
                                                <li key={i}>{packSer.title}</li>
                                              );
                                            }
                                          )
                                        ) : (
                                          <span>No Package</span>
                                        )}
                                      </div>
                                    );
                                  })
                                ) : (
                                  <span>No Package Select</span>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>
                                <Button
                                  color="primary"
                                  size="sm"
                                  round
                                  onClick={() =>
                                    this.goto(`/venue-detail/${item.eventId}`)
                                  }
                                >
                                  View Event Details
                                </Button>
                                <Button
                                  color="danger"
                                  size="sm"
                                  round
                                  onClick={() => this.handleApprovedStatus(item.bookingApprovalID, index)}
                                >
                                  Approved
                                </Button>
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      </ExpansionPanelDetails>
                    </Paper>
                  </div>
                );
              })
            ) : (
              <span></span>
            )}
          </ExpansionPanel>
        )}
      </div>
    );
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
    getBookingItemDetails: eventId => dispatch(venueAction.getVenue(eventId)),
    changeObjStatus: payload => dispatch(venueAction.changeObjStatus(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(ApproveBookingItems)));
