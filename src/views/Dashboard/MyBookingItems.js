import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "./../../store/actions";
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
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
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
                  <StyledTableCell>Booking Date</StyledTableCell>
                  <StyledTableCell>Custom Services</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingItem ? (
                  bookingItem.map((item, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {new Date(item.createdTimestamp).getTime()}
                        </StyledTableCell>
                        <StyledTableCell>{item.eventId}</StyledTableCell>
                        <StyledTableCell>
                          <Button color="warning" size="sm" round>
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
      dispatch(venueAction.getBookingItem(payload))
  };
};
export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(MyBookingItems)));
