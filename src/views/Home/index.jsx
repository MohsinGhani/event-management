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
import AuthenticatedNavbar from './../../components/common/AuthenticatedNavbar'

const Map = ReactMapboxGl({
    accessToken: credentials.MAP_ACCESS_TOCKEN
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            longitude: 67.06985544,
            latitude: 24.86053553
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
                <AuthenticatedNavbar />
                <Map
                    style={"mapbox://styles/mapbox/streets-v9"}
                    containerStyle={{
                        height: "100vh",
                        width: "100vw"
                    }}
                    movingMethod={'jumpTo'}
                    center={[longitude, latitude]}
                    zoom={[18]}
                    // onClick={(map, e) => { this.props.reverseGeoCodingAction(e.lngLat) }}
                    onClick={(map, e) => { this.test(e.lngLat) }}
                >
                    <Marker
                        coordinates={[longitude, latitude]}
                    >
                        <img style={{ height: 20, width: 15 }} src={require('./../../assets/icons/current-location.png')} alt={'current location'} />
                    </Marker>
                </Map>
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
)(withRouter(withStyles(loginPageStyle)(Home)));