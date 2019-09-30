import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
// @material-ui/core components
// @material-ui/icons
// core components
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
// core components
import Venues from "./Venues";
import GlobleLoader from "./GlobleLoader";

class VenueDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesBookingPrice: []
    };
  }

  componentDidMount() {
    const { vid } = this.props.match.params;
    console.log(this.props);
    this.props.getVenue(vid);
    // console.log(vid);
  }

  // handleToggle = event => {
  //   console.log(event.target.name);
  //   // let {bookingPrice} = this.state
  //   // bookingPrice[event.target.name] = event.target.value;
  //   this.setState({
  //     bookingPrice:event.target.name
  //   })
  //   // bookingPrice.concat(event.target.name)
  // };

  handleToggleOnService = value => {
    let { servicesBookingPrice } = this.state;

    // 1. check is value exist in servicesBookingPrice array or not

    // 2. if is value exist in servicesBookingPrice array then remove from it

    // 3. otherwise push value in servicesBookingPrice array

    // const currentIndex = servicesBookingPrice.find(value);
    
    var isExist = servicesBookingPrice.filter(
      (service, index) => {
        // currentIndex = index
        return service.title === value.title
        }
    );
 
    console.log(isExist)
    // var isExist = servicesBookingPrice.map((service, index) => service.title === value.title)

    if(isExist.length){
      servicesBookingPrice.splice(1);
    }
    else {
      servicesBookingPrice.push(value)
      this.setState({
        servicesBookingPrice
      })
    }

//     const currentIndex = servicesBookingPrice.indexOf(value);
//     console.log(currentIndex)
//     const newServicesBookingPrice = [...servicesBookingPrice];
//     console.log(newServicesBookingPrice)
//     if (currentIndex === -1) {
//       newServicesBookingPrice.push(value);
//     } else {
//       newServicesBookingPrice.splice(currentIndex, 1);
//     }
//     this.setState({
//         servicesBookingPrice: newServicesBookingPrice
//     });
  };

  render() {
    const { classes, venue, getVenueLoader } = this.props;
    const { servicesBookingPrice } = this.state;
    // console.log(venue);
    return (
      <div>
        <div>
          <AuthenticatedNavbar />
          <GlobleLoader getVenueLoader={getVenueLoader} />
        </div>
        {venue ? <Venues venue={venue} bookingPrice={servicesBookingPrice} handleToggle={this.handleToggleOnService} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: { venue, getVenueLoader, getVenueError }
  } = state;
  //
  return {
    venue,
    getVenueLoader,
    getVenueError,
    user,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  //
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getVenue: vid => dispatch(venueAction.getVenue(vid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(carouselStyle)(VenueDetail)));
