import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "../../store/actions";
import GlobleLoader from "./GlobleLoader";
import GridContainer from "components/Grid/GridContainer";
import CardHeader from "components/Card/CardHeader";
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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

class MyBookingItems extends Component {
  componentDidMount() {
    debugger;
    const { user, getBookingItemAction } = this.props;
    debugger;
    getBookingItemAction({ userId: user.uid });
  }

  goto = path => {
    this.props.history.push(path);
  };

  viewVenueDetaile = event => {
    debugger;
    this.props.getBookingItemDetails(event);
  };
  render() {
    const { classes, getBookingItemLoader, bookingItem } = this.props;
    return (
      <div style={{ margin: "auto 0" }}>
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
        <GlobleLoader getBookingItemLoader={getBookingItemLoader} />
        <div className={"table-class"} style={{ marginTop: "10px" }}>
          <Paper
            style={{
              width: "100%",
              overflowX: "auto"
            }}
          >
            <Table style={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Event Id</StyledTableCell>
                  <StyledTableCell>Booking Date</StyledTableCell>
                  <StyledTableCell>Custom Services</StyledTableCell>
                  <StyledTableCell>Package Details</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {item.eventId}
                        </StyledTableCell>
                        <StyledTableCell>
                          {new Intl.DateTimeFormat("en-US", options).format(
                            item.bookingDate
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>
                                Booked Services
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {item.servicesBookingPrice ? (
                                item.servicesBookingPrice.map((ser, i) => {
                                  return <li key={i}>{ser.title}</li>;
                                })
                              ) : (
                                <span>No Custom Services</span>
                              )}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>
                                Package Detail
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {item.packageArray
                                ? item.packageArray.map((pack, i) => {
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
                                : ""}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
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
                    );
                  })
                ) : (
                  <span></span>
                )}
              </TableBody>
            </Table>
          </Paper>
        </div>
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
