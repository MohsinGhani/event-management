import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction } from "./../../store/actions";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import credentials from '../../config/credentials'

const Map = ReactMapboxGl({
    accessToken: credentials.MAP_ACCESS_TOCKEN
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            longitude: 67.005615,
            latitude: 24.946218
        };
    }

    goto = path => {
        this.props.history.push(path);
    };

    test = (clickedPosition) => {
        this.setState({ clickedPosition })
        console.log('clickedPosition', clickedPosition)
    }

    logout = () => {
        this.props.logout();
        this.goto('/login');
    }

    render() {
        const { classes, user, ...rest } = this.props;
        const { longitude, latitude } = this.state
        return (
            <div>
                <Header
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
                />
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: "100vh",
                        width: "100vw"
                    }}
                    movingMethod={'jumpTo'}
                    center={[longitude, latitude]}
                    zoom={[12]}
                    // onClick={(map, e) => { this.props.reverseGeoCodingAction(e.lngLat) }}
                    onClick={(map, e) => { this.test(e.lngLat) }}
                ></Map>
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
)(withRouter(withStyles(loginPageStyle)(Dashboard)));