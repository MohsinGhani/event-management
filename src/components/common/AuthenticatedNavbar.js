import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Apps } from "@material-ui/icons";
// core components
import Header from "components/Header/Header.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { connect } from "react-redux";
import { authAction } from "./../../store/actions";
import { withRouter } from "react-router-dom";
import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";
// import Archive from "@material-ui/icons/Archive";

import "./index.css";

class AuthenticatedNavbar extends React.Component {

  goto = path => {
    this.props.history.replace(path);
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div id="navbar" className={classes.navbar}>
          <Header
            fixed
            color="rose"
            brand="Event Management"
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    className={"switch-button"}
                    variant="outline-success"
                    onClick={() => {
                      this.goto("/");
                      this.props.switchUserMode();
                    }}
                    color="transparent"
                  >
                    <Icon className={classes.icons}>swap_horiz</Icon>{" "}
                    {this.props.userMood === "customer"
                      ? "SWITCH TO VENDOR"
                      : "SWITCH TO CUSTOMER"}
                  </Button>
                </ListItem>
                {this.props.userMood === "customer" ? (
                  <ListItem className={classes.listItem}>
                    <CustomDropdown
                      noLiPadding
                      buttonText="Venue"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      buttonIcon={Apps}
                      dropdownList={[
                        <Button
                          className={classes.navLink}
                          // className={classes.navLink + " " + classes.navLinkActive}
                          onClick={e => this.goto("/list-view")}
                          color="transparent"
                        >
                          <Icon className={classes.icons}>list</Icon> List View
                        </Button>,
                        <Button
                          className={classes.navLink}
                          // className={classes.navLink + " " + classes.navLinkActive}
                          onClick={e => this.goto("/")}
                          color="transparent"
                        >
                          <Icon className={classes.icons}>map</Icon> Map View
                        </Button>
                      ]}
                    />
                  </ListItem>
                ) : (
                  <ListItem className={classes.listItem}>
                    <CustomDropdown
                      noLiPadding
                      buttonText="Venue"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      buttonIcon={Apps}
                      dropdownList={[
                        <Button
                          className={classes.navLink}
                          // className={classes.navLink + " " + classes.navLinkActive}
                          onClick={e => this.goto("/add-venue")}
                          color="transparent"
                        >
                          <Icon className={classes.icons}>add_rounded</Icon>
                          Create
                        </Button>,
                        // <Button
                        //   className={classes.navLink}
                        //   // className={classes.navLink + " " + classes.navLinkActive}
                        //   onClick={e => this.goto("/archive-view")}
                        //   color="transparent"
                        // >
                        //   <Archive className={classes.icons} />
                        //   Archive List
                        // </Button>,
                        <Button
                          className={classes.navLink}
                          // className={classes.navLink + " " + classes.navLinkActive}
                          onClick={e => this.goto("/list-view")}
                          color="transparent"
                        >
                          <Icon className={classes.icons}>list</Icon> List View
                        </Button>,

                        <Button
                          className={classes.navLink}
                          // className={classes.navLink + " " + classes.navLinkActive}
                          onClick={e => this.goto("/")}
                          color="transparent"
                        >
                          <Icon className={classes.icons}>map</Icon> Map View
                        </Button>
                      ]}
                    />
                  </ListItem>
                )}

                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink}
                    onClick={e => this.goto("/admin/my-venues")}
                    color="transparent"
                  >
                    <Icon className={classes.icons}>dashboard</Icon> Dashboard
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink}
                    onClick={this.logout}
                    color="transparent"
                  >
                    <Icon className={classes.icons}>logout</Icon> Logout
                  </Button>
                </ListItem>
              </List>
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn, userMood }
  } = state;
  return {
    user,
    isLoggedIn,
    userMood
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    logout: () => dispatch(authAction.logout()),
    switchUserMode: () => dispatch(authAction.switchUserMode())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(navbarsStyle)(AuthenticatedNavbar)));
