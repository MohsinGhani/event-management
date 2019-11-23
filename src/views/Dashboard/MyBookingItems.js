import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "../../store/actions";
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
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CountDownTimer from "./CountDownTimer";

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

class MyBookingItems extends Component {
  componentDidMount() {
    const { user, getBookingItemAction } = this.props;

    getBookingItemAction({ userId: user.uid });
  }

  goto = path => {
    this.props.history.push(path);
  };

  viewVenueDetaile = event => {
    this.props.getBookingItemDetails(event);
  };
  render() {
    const { classes, getBookingItemLoader, bookingItem } = this.props;
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
            My Booking Items
          </h4>
        </CardHeader>
        {bookingItem && bookingItem.length == 0 ? (
          <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
            <CardBody>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red"
                }}
              >
                No Booking Items
              </h1>
            </CardBody>
          </Card>
        ) : getBookingItemLoader ? (
          <GlobleLoader getBookingItemLoader={getBookingItemLoader} />
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

            {bookingItem ? (
              bookingItem.map((item, index) => {
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
                              <StyledTableCell>Remaining Time</StyledTableCell>
                              <StyledTableCell>Booking Date</StyledTableCell>
                              <StyledTableCell>Custom Services</StyledTableCell>
                              <StyledTableCell>Package Details</StyledTableCell>
                              <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <StyledTableRow key={index}>
                              <StyledTableCell component="th" scope="row">
                                <CountDownTimer
                                  remainingTime={item.bookingDate}
                                />
                              </StyledTableCell>
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
                                {/* {item.packageArray &&
                                item.packageArray.length ? (
                                  item.packageArray.map((pack, i)=> {
                                    return(
                                      <div>
                                        <h5 key={i}>{pack.packageObj}</h5>
                                          {pack.servicePackages ? (
                                            pack.servicePackages.map(
                                              (packSer, i) => {
                                                return (
                                                  <li key={i}>
                                                    {packSer.title}
                                                  </li>
                                                );
                                              }
                                            )
                                          ) : (
                                            <span></span>
                                          )}
                                      </div>
                                    )
                                  })
                                ) : (
                                  <span></span>
                                )} */}
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

const mapStateToPros = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: { bookingItem, getBookingItemLoader, getBookingItemError }
  } = state;
  return {
    user,
    isLoggedIn,

    bookingItem,
    getBookingItemLoader,
    getBookingItemError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getBookingItemAction: payload =>
      dispatch(venueAction.getBookingItem(payload)),
    getBookingItemDetails: eventId => dispatch(venueAction.getVenue(eventId))
  };
};
export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(MyBookingItems)));
