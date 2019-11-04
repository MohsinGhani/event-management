import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
import Venues from "./Venues";
import GlobleLoader from "./GlobleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class VenueDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: "",
      packageObj: "",
      packageCategories: [
        { title: "Platinum", id: "platinum" },
        { title: "Gold", id: "gold" },
        { title: "Silver", id: "sliver" }
      ],
      servicesBookingPrice: [],
      bookingDate: new Date(),
      objStatus: 0,
      servicePackages: [],
      ConfirmModal: false,
      discountAmount: "",
      packagePrice: 0,
      afterDiscountPrice: 0,
      packageArray: []
    };
  }

  handleClickCreatePackageOpen = modal => {
    var x = [];
    x[modal] = true;
    this.setState(x);
  };

  handleCreatePackageClose = modal => {
    var x = [];
    x[modal] = false;
    this.setState(x);
  };

  handleChangeEnabled = event => {
    this.setState({ packageObj: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    const { venue } = this.props;
    if (prevProps.venue !== venue && venue) {
      console.log(venue);
      const { vid } = this.props.match.params;
      console.log(vid);

      this.setState({
        ...venue,
        objStatus: venue.objStatus,
        vid: vid
      });
    }
  }

  componentDidMount() {
    const { vid } = this.props.match.params;
    const { getVenue, getPackages } = this.props;

    getVenue(vid);

    getPackages({ vid: vid && vid });
  }

  handleOnDateChange = date => {
    this.setState({
      bookingDate: date
    });
  };

  handleDeleteStatus = () => {
    const { user, venue } = this.props;
    const { objStatus, vid } = this.state;
    console.log(objStatus);
    const newObjStatus = {
      ...venue,
      objStatus: 0,
      vid,
      userId: user && user.uid
    };
    this.props.changeObjStatus(newObjStatus);
    console.log(objStatus);
  };

  handleArchiveStatus = () => {
    const { user, venue } = this.props;
    const { objStatus, vid } = this.state;
    console.log(objStatus);
    const newObjStatus = {
      ...venue,
      objStatus: 2,
      vid,
      userId: user && user.uid
    };
    this.props.changeObjStatus(newObjStatus);
    console.log(objStatus);
  };
  successNotifiy = message => toast.success(message);

  goto = path => {
    this.props.history.push(path);
  };

  saveCustomBooking = () => {
    const { vid } = this.props.match.params;
    let user = this.props.user;

    const { servicesBookingPrice, bookingDate } = this.state;
    this.setState({
      eventId: vid
    });
    const bookingDetail = {
      userId: user && user.uid,
      eventId: vid,
      servicesBookingPrice,
      bookingDate,
      createdTimestamp: new Date().getTime()
    };
    this.props.saveCustomBooking(bookingDetail);
    this.setState({
      servicesBookingPrice: []
    });
  };

  handleToggleOnService = value => {
    let { servicesBookingPrice } = this.state;

    // check the value in array thorugh filter

    var isExist = servicesBookingPrice.filter(service => {
      return service.title === value.title;
    });

    if (isExist.length) {
      // remove array is exit through filter

      var removePrice = servicesBookingPrice.filter(service => {
        return service.title !== value.title;
      });
      this.setState({
        servicesBookingPrice: removePrice
      });
    } else {
      servicesBookingPrice.push(value);
      this.setState({
        servicesBookingPrice
      });
    }
  };

  handleToggleOnServicePackages = value => {
    let { servicePackages } = this.state;

    // check the value in array thorugh filter

    var isExist = servicePackages.filter(service => {
      return service.title === value.title;
    });

    if (isExist.length) {
      // remove array is exit through filter

      var removePrice = servicePackages.filter(service => {
        return service.title !== value.title;
      });
      this.setState({
        servicePackages: removePrice
      });
    } else {
      servicePackages.push(value);
      this.setState({
        servicePackages
      });
    }
  };

  // handleToggleOnPackage = (value, index) => {
  //   debugger;
  //   const {packageArray } =this.state
  //   let { packages } = this.props;
  //   debugger;

  //   // check the value in array thorugh filter

  //   var isExist = packages.filter(service => {
  //     debugger;

  //     return service.packageObj === value.packages[value.i].packageObj;
  //   });

  //   if (isExist.length) {
  //     debugger;
  //     this.setState({
  //       packageArray
  //     });
  //   }
  //   console.log(packageArray)
  // };

  handleToggleOnPackage = (value) => {
    let { packageArray } = this.state;
    debugger;
    // check the value in array thorugh filter
    debugger;
    var isExist = packageArray.filter(pack => {
      debugger;
      return pack.packageObj === value.packageObj;
    });
    console.log(isExist);
    if (isExist.length) {
      // remove array is exit through filter
      var removePrice = packageArray.filter(pack => {
        debugger;
        return pack.packageObj !== value.packageObj;
      });
      debugger;
      this.setState({
        packageArray: removePrice
      });
    } else {
      debugger;
      packageArray.push(value);
      debugger;
      this.setState({
        packageArray
      });
      console.log(packageArray);
    }
    console.log(packageArray);
  };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  saveCustomPackages = () => {
    const { vid } = this.props.match.params;
    const { packageObj, servicePackages, discountAmount } = this.state;
    const { createCustomPackages, user } = this.props;
    const newPackage = {
      packageObj,
      servicePackages,
      discountAmount,
      eventId: vid,
      userId: user && user.uid
    };
    createCustomPackages(newPackage);
    console.log(newPackage);
    this.setState({
      packageObj: "",
      servicePackages: "",
      discountAmount: ""
    });
    this.handleCreatePackageClose("ConfirmModal");
  };

  render() {
    const {
      venue,
      user,
      getVenueLoader,
      saveCustomBookingLoader,
      packages
    } = this.props;
    const {
      servicesBookingPrice,
      bookingDate,
      ConfirmModal,
      packageCategories,
      packageObj,
      servicePackages,
      discountAmount,
      packagePrice,
      afterDiscountPrice,
      packageArray
    } = this.state;
    console.log("packages=>", packages);
    return (
      <div>
        <div>
          <AuthenticatedNavbar />
          <GlobleLoader getVenueLoader={getVenueLoader} />
        </div>
        <ToastContainer />

        {venue ? (
          <Venues
            venue={venue}
            user={user}
            bookingPrice={servicesBookingPrice}
            bookingDate={bookingDate}
            saveCustomBookingLoader={saveCustomBookingLoader}
            ConfirmModal={ConfirmModal}
            handleClickCreatePackageOpen={this.handleClickCreatePackageOpen}
            handleCreatePackageClose={this.handleCreatePackageClose}
            packageObj={packageObj}
            handleChangeEnabled={this.handleChangeEnabled}
            handleToggle={this.handleToggleOnService}
            saveCustomBooking={this.saveCustomBooking}
            handleOnDateChange={this.handleOnDateChange}
            successNotifiy={this.successNotifiy}
            handleDeleteStatus={this.handleDeleteStatus}
            handleArchiveStatus={this.handleArchiveStatus}
            handleChangeEnabled={this.handleChangeEnabled}
            packageCategories={packageCategories}
            servicePackages={servicePackages}
            handleToggleOnServicePackages={this.handleToggleOnServicePackages}
            discountAmount={discountAmount}
            handleOnChange={this.handleOnChange}
            packagePrice={packagePrice}
            afterDiscountPrice={afterDiscountPrice}
            saveCustomPackages={this.saveCustomPackages}
            handleToggleOnService={this.handleToggleOnService}
            packages={packages}
            handleToggleOnPackage={this.handleToggleOnPackage}
            packageArray={packageArray}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: {
      venue,
      getVenueLoader,
      getVenueError,
      saveCustomBooking,
      saveCustomBookingLoader,
      saveCustomBookingError,
      createPackages,
      createPackagesLoader,
      createPackagesError,

      packages,
      getPackagesLoader,
      getPackagesError
    }
  } = state;
  return {
    venue,
    getVenueLoader,
    getVenueError,

    saveCustomBooking,
    saveCustomBookingLoader,
    saveCustomBookingError,

    createPackages,
    createPackagesLoader,
    createPackagesError,

    packages,
    getPackagesLoader,
    getPackagesError,

    user,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getVenue: vid => dispatch(venueAction.getVenue(vid)),
    saveCustomBooking: payload =>
      dispatch(venueAction.saveCustomBooking(payload)),
    changeObjStatus: payload => dispatch(venueAction.changeObjStatus(payload)),
    createCustomPackages: payload =>
      dispatch(venueAction.createPackages(payload)),
    getPackages: vid => dispatch(venueAction.getPackages(vid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(carouselStyle)(VenueDetail)));
