import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction } from "./../../store/actions";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker, Popup } from "react-mapbox-gl";
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
            latitude: 24.86053553,
            center: {
                longitude: 67.06985544,
                latitude: 24.86053553
            },
            venues: this.props.venues,
            popupInfo: null
        };
    }

    goto = path => {
        this.props.history.push(path);
    };

    test = (event, object, ) => {
        this.setState({
            center: {
                longitude: object.lngLat.lng,
                latitude: object.lngLat.lat
            }
        })
        // this.setState({ clickedPosition })
        // console.log('clickedPosition', clickedPosition)
    }

    logout = () => {
        this.props.logout();
        this.goto('/login');
    }

    _renderCityMarker = (venue, index) => {
        return (
            <Marker key={`marker-${index}`} coordinates={[venue.location.log, venue.location.lat]}>
                <img
                    style={{ height: 15, width: 15 }}
                    src={require('./../../assets/icons/marker.png')}
                    alt={'current location'}
                    onClick={() => this.setState({ popupInfo: venue })}
                />
            </Marker>
        );
    };

    _renderPopup() {
        const { popupInfo } = this.state;

        return (
            popupInfo && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    coordinates={[popupInfo.location.log, popupInfo.location.lat]}
                    closeOnClick={false}
                    onClose={() => this.setState({ popupInfo: null })}
                >
                    <div>
                        <div>
                            {popupInfo.name} | {' '}
                            <a onClick={() => { this.setState({ popupInfo: null }) }}>
                                Close
                            </a>
                        </div>
                        <img width={240} src={popupInfo.mainPic} />
                    </div>
                </Popup>
            )
        );
    }

    render() {
        const { classes, user, ...rest } = this.props;
        const { longitude, latitude, venues, center } = this.state
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
                    center={[center.longitude, center.latitude]}
                    zoom={[15]}
                    // onClick={(map, e) => { this.props.reverseGeoCodingAction(e.lngLat) }}
                    onClick={this.test}
                >
                    <Marker
                        coordinates={[longitude, latitude]}
                    >
                        <img style={{ height: 20, width: 15 }} src={require('./../../assets/icons/current-location.png')} alt={'current location'} />
                    </Marker>

                    {/* {venues && venues.map(this._renderCityMarker)} */}

                    {this._renderPopup()}
                    {
                        venues && venues.map((venue, index) => {
                            return (
                                this._renderCityMarker(venue, index)
                                // <Marker
                                //     coordinates={[venue.location.log, venue.location.lat]}
                                // >
                                //     <img style={{ height: 15, width: 15, cursor: 'pointer' }} src={require('./../../assets/icons/marker.png')} alt={'current location'} />
                                // </Marker>
                            )
                        })
                    }
                </Map>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { authReducer: { user, isLoggedIn }, venueReducer: { venues } } = state;
    return {
        user, isLoggedIn, venues
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