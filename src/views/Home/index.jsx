import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction, venueAction } from "./../../store/actions";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker, Popup } from "react-mapbox-gl";
import credentials from "../../config/credentials";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import Layout_style from "../../assets/icons/Layout_style.svg";
import Venue_type from "../../assets/icons/Venue_type.svg";
import GridItem from "components/Grid/GridItem";
import SavedLocation from "../../assets/icons/save_location.svg";

const Map = ReactMapboxGl({
  accessToken: credentials.MAP_ACCESS_TOCKEN
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      // longitude: 67.06985544,
      // latitude: 24.86053553,
      center: {
        longitude: 67.06985544,
        latitude: 24.86053553
      },
      //   // venues: this.props.venues,
      popupInfo: null
    };
  }

  goto = path => {
    this.props.history.push(path);
  };

  componentDidMount() {
    this.props.getVenues();
  }

  test = (event, object) => {
    this.setState({
      center: {
        longitude: object.lngLat.lng,
        latitude: object.lngLat.lat
      }
    });
    // this.setState({ clickedPosition })
    // console.log('clickedPosition', clickedPosition)
  };

  logout = () => {
    this.props.logout();
    this.goto("/login");
  };

  _renderCityMarker = (venue, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        coordinates={[venue.location.log, venue.location.lat]}
      >
        <img
          style={{ height: 15, width: 15 }}
          src={require("./../../assets/icons/marker.png")}
          alt={"current location"}
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
          <div style={{ width: "250px" }}>
            {/* <Card children={ */}
            <Fragment>
              {/* <CardHeader style={{ position: 'inherit', opacity: 0.9 }} color={'primary'}>{popupInfo.name}</CardHeader> */}
              <CardBody className="card-body">
                <img
                  src={popupInfo.mainPic}
                  alt="venue-image"
                  width="100%"
                  style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                />
                <div className="card-body-info">
                  <div>
                    <div className="star-ratting">
                      {this._renderFullStars()}
                      <p
                        style={{
                          display: "inline",
                          fontSize: "80%",
                          color: "grey"
                        }}
                      >
                        {" "}
                        Ratting
                      </p>
                    </div>
                    <div className="city">
                      <img alt="some-img" src={Location} width="8%" />
                      <p
                        style={{
                          display: "inline",
                          fontSize: "80%",
                          color: "grey"
                        }}
                      >
                        {" "}
                        {popupInfo.address}
                      </p>
                    </div>
                    <div className="type">
                      <img alt="some-img" src={Layout_style} width="8%" />
                      <p
                        style={{
                          display: "inline",
                          fontSize: "80%",
                          color: "grey"
                        }}
                      >
                        {" "}
                        {popupInfo.venueTypes}
                      </p>
                    </div>
                    <div className="type">
                      <img alt="some-img" src={Venue_type} width="8%" />
                      <p
                        style={{
                          display: "inline",
                          fontSize: "80%",
                          color: "grey"
                        }}
                      >
                        {" "}
                        Sitting {popupInfo.capacity}
                      </p>
                    </div>
                  </div>

                  <div className="right-panel">
                    <div className="dtl-btn-wrapper">
                      <Button
                        color="warning"
                        size="sm"
                        round
                        onClick={() => this.goto("/venue-detail")}
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Fragment>
            {/* } /> */}
          </div>
        </Popup>
      )
    );
  }

  _renderFullStars = () => {
    const stars = Math.ceil(this.state.venues[0].rating.overall);
    return stars !== 0
      ? Array(stars)
          .fill(null)
          .map((item, i) => {
            return <i className="fa fa-star" aria-hidden="true" key={i}></i>;
          })
      : "";
  };
  render() {
    const { classes, user, venues, ...rest } = this.props;
    const { center } = this.state;
    return (
      <div>
        <AuthenticatedNavbar />
        <Map
          style={"mapbox://styles/mapbox/streets-v9"}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          movingMethod={"jumpTo"}
          center={[center.longitude, center.latitude]}
          // zoom={[15]}
          // onClick={(map, e) => { this.props.reverseGeoCodingAction(e.lngLat) }}
          // onClick={this.test}
        >
          {venues &&
            venues.length &&
            venues.map((venue, index) => {
              const { location } = venue;
              return (
                <Marker
                  coordinates={[
                    Number(location.longitude),
                    Number(location.latitude)
                  ]}
                >
                  <img
                    style={{ height: '25px', width: '30px' }}
                    src={SavedLocation}
                    alt={"current location"}
                    onClick={() => this.goto(`/venue-detail/${venue.vid}`)}
                  />
                </Marker>
              );
            })}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    venueReducer: { venues, getVenuesLoader, getVenuesError },
    authReducer: { user, isLoggedIn }
  } = state;
  return {
    venues,
    getVenuesLoader,
    getVenuesError,
    user,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    logout: () => dispatch(authAction.logout()),
    getVenues: () => dispatch(venueAction.getVenues())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(Home)));
