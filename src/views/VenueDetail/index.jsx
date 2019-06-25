import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { authAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar"
class VenueDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { ...rest } = this.props;
        return (
            <div>
                <AuthenticatedNavbar />
                <h1>Venue Detail</h1>
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
)(withRouter(withStyles({})(VenueDetail)));