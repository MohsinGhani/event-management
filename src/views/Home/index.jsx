import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction, venueAction } from "./../../store/actions";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker, Popup } from "react-mapbox-gl";
import credentials from "../../config/credentials";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import CardBody from "components/Card/CardBody";
import Layout_style from "../../assets/icons/Layout_style.svg";
import Venue_type from "../../assets/icons/Venue_type.svg";
import venuePin from "../../assets/icons/venuePin.svg";
import decoration from "../../assets/icons/decoration.svg";
import foood from "../../assets/icons/foood.svg";
import photo from "../../assets/icons/photo.svg";
import MapMarkerIdentity from "./MapMarkerIdentity";
const Map = ReactMapboxGl({
  accessToken: credentials.MAP_ACCESS_TOCKEN
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      center: {
        longitude: 67.06985544,
        latitude: 24.86053553
      },
      popupInfo: null,
      selectedType: "all"
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
  };

  logout = () => {
    this.props.logout();
    this.goto("/login");
  };

  handleOnChange = event => {
    debugger;
    this.setState({ selectedType: event });
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
            <Fragment>
              <CardBody className="card-body">
                <img
                  src={popupInfo.mainPic}
                  alt="venue"
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
    const { venues } = this.props;
    const { center, selectedType } = this.state;
    return (
      <div style={{ position: "fixed" }}>
        <AuthenticatedNavbar />
        <Map
          style={"mapbox://styles/mapbox/streets-v9"}
          containerStyle={{
            height: "100vh",
            width: "100vw",
            position: "relative"
          }}
          movingMethod={"jumpTo"}
          center={[center.longitude, center.latitude]}
        >
          <MapMarkerIdentity handleOnChange={this.handleOnChange} />
          {venues
            ? venues.map((venue, index) => {
                const { location, objType } = venue;
                debugger;
                if (
                  (objType.id === "food_and_caterers" &&
                    selectedType === "food_and_caterers") ||
                  selectedType === "all"
                ) {
                  return (
                    <Marker
                      key={index}
                      coordinates={[
                        Number(location.longitude),
                        Number(location.latitude)
                      ]}
                    >
                      <img
                        style={{
                          height: "25px",
                          width: "30px",
                          cursor: "pointer"
                        }}
                        src={foood}
                        title="Food & Caterers"
                        alt={"current location"}
                        onClick={() => this.goto(`/venue-detail/${venue.vid}`)}
                      />
                    </Marker>
                  );
                } else if (
                  (objType.id === "decorator" &&
                    selectedType === "decorator") ||
                  selectedType === "all"
                ) {
                  return (
                    <Marker
                      key={index}
                      coordinates={[
                        Number(location.longitude),
                        Number(location.latitude)
                      ]}
                    >
                      <img
                        style={{
                          height: "25px",
                          width: "30px",
                          cursor: "pointer"
                        }}
                        src={decoration}
                        title="Decorators"
                        alt={"current location"}
                        onClick={() => this.goto(`/venue-detail/${venue.vid}`)}
                      />
                    </Marker>
                  );
                } else if (
                  (objType.id === "venue" && selectedType === "venue") ||
                  selectedType === "all"
                ) {
                  return (
                    <Marker
                      key={index}
                      coordinates={[
                        Number(location.longitude),
                        Number(location.latitude)
                      ]}
                    >
                      <img
                        style={{
                          height: "25px",
                          width: "30px",
                          cursor: "pointer"
                        }}
                        src={venuePin}
                        title="Venue"
                        alt={"current location"}
                        onClick={() => this.goto(`/venue-detail/${venue.vid}`)}
                      />
                    </Marker>
                  );
                } else if (
                  (objType.id === "photographer" &&
                    selectedType === "photographer") ||
                  selectedType === "all"
                ) {
                  return (
                    <Marker
                      key={index}
                      coordinates={[
                        Number(location.longitude),
                        Number(location.latitude)
                      ]}
                    >
                      <img
                        style={{
                          height: "25px",
                          width: "30px",
                          cursor: "pointer"
                        }}
                        src={photo}
                        title="Photographer"
                        alt={"current location"}
                        onClick={() => this.goto(`/venue-detail/${venue.vid}`)}
                      />
                    </Marker>
                  );
                } else {
                  return null;
                }
              })
            : null}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    venueReducer: { venues, getVenuesLoader, getVenuesError },
    authReducer: { isLoggedIn }
  } = state;
  return {
    venues,
    getVenuesLoader,
    getVenuesError,
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
