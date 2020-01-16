import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction, venueAction } from "./../../store/actions";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker, Popup } from "react-mapbox-gl";
import credentials from "../../config/credentials";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import venuePin from "../../assets/icons/venuePin.svg";
import decorationPin from "../../assets/icons/decoration.svg";
import foodPin from "../../assets/icons/foood.svg";
import photoPin from "../../assets/icons/photo.svg";
import MapMarkerIdentity from "./MapMarkerIdentity";
import VenueCard from "./VenueCard";
import GridContainer from "components/Grid/GridContainer";

const Map = ReactMapboxGl({
  accessToken: credentials.MAP_ACCESS_TOCKEN
});

class Home extends React.Component {
  state = {
    center: {
      longitude: 67.06985544,
      latitude: 24.86053553
    },
    popupInfo: null,
    selectedType: "all"
  };

  goto = path => {
    this.props.history.push(path);
  };

  componentDidMount() {
    const { getVenues } = this.props;
    getVenues();
  }

  logout = () => {
    this.props.logout();
    this.goto("/login");
  };

  handleOnChange = event => {
    this.setState({ selectedType: event });
  };

  showPin = data => {
    switch (data.id) {
      case "venue":
        return venuePin;
      case "food_and_caterers":
        return foodPin;
      case "decorator":
        return decorationPin;
      case "photographer":
        return photoPin;
      default:
        return venuePin;
    }
  };

  _renderPopup() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          coordinates={[
            Number(popupInfo.location.longitude),
            Number(popupInfo.location.latitude)
          ]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <GridContainer
            style={{ maxWidth: 300, background: "transparent", height: 395 }}
          >
            <VenueCard
              venue={popupInfo}
              i={0}
              isPopup={true}
              goto={this.goto}
            />
          </GridContainer>
        </Popup>
      )
    );
  }

  render() {
    const { venues } = this.props;
    const { center, selectedType } = this.state;

    let mapMarker = [];

    if (venues && venues.length) {
      mapMarker = [...venues];

      if (selectedType !== "all") {
        mapMarker = venues.filter(venue => {
          const { objType } = venue;
          return objType.id === selectedType;
        });
      }
    }

    return (
      <div style={{ position: "fixed" }}>
        <AuthenticatedNavbar  navBgColor={'rose'}/>
        <Map
          style={"mapbox://styles/mapbox/streets-v9"}
          containerStyle={{
            height: "100vh",
            width: "100vw",
            position: "relative"
          }}
          movingMethod={"jumpTo"}
          center={[center.longitude, center.latitude]}
          onClick={() => this.setState({ popupInfo: null })}
        >
          <MapMarkerIdentity handleOnChange={this.handleOnChange} />
          {mapMarker &&
            mapMarker.map((venue, index) => {
              const { location, objType } = venue;
              return (
                <Marker
                  key={index}
                  coordinates={[
                    Number(location.longitude),
                    Number(location.latitude)
                  ]}
                  onClick={() => this.setState({ popupInfo: venue })}
                >
                  <img
                    style={{ height: "25px", width: "30px", cursor: "pointer" }}
                    src={this.showPin(objType)}
                    title={objType.id}
                    alt={"current location"}
                    // onClick={() => this.goto(`/venue-detail/${venue.vid}`)}
                  />
                </Marker>
              );
            })}
          {this._renderPopup()}
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
