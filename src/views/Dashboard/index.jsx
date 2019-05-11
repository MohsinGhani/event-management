import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

// actions
import { authAction } from "./../../store/actions";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
        };
    }

    goto = path => {
        this.props.history.push(path);
    };

    render() {
        const { classes, user, ...rest } = this.props;

        return (
            <div>
                <Header
                    absolute
                    color="transparent"
                    brand="Event Management"
                    {...rest}
                />

                <div>
                    {
                        user ? (
                            <h2>Welcome {user.firstname + " " + user.lastname}</h2>
                        ) : null
                    }
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
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(Dashboard)));