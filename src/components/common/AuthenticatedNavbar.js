import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Explore from "@material-ui/icons/Explore";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { connect } from 'react-redux';
import { authAction } from "./../../store/actions";
import { withRouter } from 'react-router-dom';
import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

class AuthenticatedNavbar extends React.Component {

    goto = path => {
        this.props.history.push(path);
    };

    logout = () => {
        this.props.logout();
        this.goto('/login');
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <div id="navbar" className={classes.navbar}>
                    {/* <Header
                    absolute
                    color="rose"
                    brand="Event Management"
                    {...rest}
                    rightLinks={
                        <Fragment>
                            <Button onClick={() => this.goto('/list-view')} color={'white'}>List View</Button>
                            <Button onClick={this.logout} color={'white'}>Logout</Button>
                        </Fragment>
                    }
                /> */}
                    <Header
                        fixed
                        color="rose"
                        brand="Event Management"
                        rightLinks={
                            <List className={classes.list}>
                                <ListItem className={classes.listItem}>
                                    <Button
                                        className={classes.navLink}
                                        // className={classes.navLink + " " + classes.navLinkActive}
                                        onClick={e => this.goto('/list-view')}
                                        color="transparent"
                                    >
                                        <Icon className={classes.icons}>list</Icon> List View
                                </Button>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Button
                                        className={classes.navLink}
                                        onClick={e => this.goto('/admin/dashboard')}
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


const mapStateToProps = (state) => {
    const { authReducer: { user, isLoggedIn } } = state;
    return {
        user, isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isLoggedInAction: (payload) => dispatch(authAction.isLoggedIn(payload)),
        logout: () => dispatch(authAction.logout()),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(navbarsStyle)(AuthenticatedNavbar)));
