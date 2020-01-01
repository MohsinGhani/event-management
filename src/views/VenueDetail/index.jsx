import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
import Venues from "./Venues";
import GlobleLoader from "./GlobleLoader";
import SuccessTostify from "../GlobleCompnenets/Tostify/SuccessTostify";
import WarrningTostify from "../GlobleCompnenets/Tostify/WarrningTostify";

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
      bookingDate: new Date().getTime(),
      objStatus: 0,
      servicePackages: [],
      ConfirmModal: false,
      discountAmount: "",
      packagePrice: 0,
      afterDiscountPrice: 0,
      packageArray: [],

      isBookingButtonDisable: true
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
      const { vid } = this.props.match.params;
      this.setState({
        ...venue,
        objStatus: venue.objStatus,
        vid: vid
      });
    }
  }

  componentDidMount() {
    const { vid } = this.props.match.params;
    const { getVenue, getPackages, bookingItem, allBookingItem } = this.props;

    getVenue(vid);

    getPackages({ vid: vid && vid });

    allBookingItem({ vid: vid && vid });
  }

  handleOnDateChange = date => {
    let dateInTimestamp = new Date(date[0]).getTime();
    this.setState({
      bookingDate: dateInTimestamp,
      isBookingButtonDisable: false
    });
  };

  handleDeleteStatus = () => {
    const { user, venue } = this.props;
    const { vid } = this.state;
    const newObjStatus = {
      ...venue,
      objStatus: 3,
      userId: user && user.uid, 
      itemId: vid,
      collectionName: "services"
    };
    this.props.changeObjStatus(newObjStatus);
    WarrningTostify("Successfully Deleted");
    this.goto("/admin/my-venues");
  };

  handleArchiveStatus = () => {
    const { user, venue } = this.props;
    const { vid } = this.state;
    const newObjStatus = {
      ...venue,
      objStatus: 2,
      userId: user && user.uid,
      itemId: vid,
      collectionName: "services"
    };
    this.props.changeObjStatus(newObjStatus);
    SuccessTostify("Archive Successfull");
    this.goto("/admin/archive-venues");
  };

  goto = path => {
    this.props.history.push(path);
  };

  saveBooking = () => {
    const { vid } = this.props.match.params;
    let user = this.props.user;

    const { venue } = this.props;

    const { servicesBookingPrice, bookingDate, packageArray } = this.state;
    this.setState({
      eventId: vid
    });
    const bookingDetail = {
      userId: user && user.uid,
      eventId: vid,
      servicesBookingPrice,
      bookingDate,
      packageArray,
      bookingStatus: 0,
      createdTimestamp: new Date().getTime(),
      eventCreatorId: venue && venue.userId
    }
    this.props.saveBookingItemAction(bookingDetail);
    this.goto(`/booking-step/${vid}`)
    this.setState({
      servicesBookingPrice: [],
      packageArray: []
    });
  };




  // saveCustomBooking = () => {
  //   const { vid } = this.props.match.params;
  //   let user = this.props.user;

  //   const { venue } = this.props;

  //   const { servicesBookingPrice, bookingDate, packageArray } = this.state;
  //   this.setState({
  //     eventId: vid
  //   });
  //   const bookingDetail = {
  //     userId: user && user.uid,
  //     eventId: vid,
  //     servicesBookingPrice,
  //     bookingDate,
  //     packageArray,
  //     bookingStatus: 0,
  //     createdTimestamp: new Date().getTime(),
  //     eventCreatorId: venue && venue.userId
  //   }
  //   SuccessTostify("Booked Successfull")
  //   this.props.saveCustomBooking(bookingDetail);
  //   this.goto("/admin/pending-booking-item");
  //   this.setState({
  //     servicesBookingPrice: [],
  //     packageArray: []
  //   });
  // };

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
  //
  //   const {packageArray } =this.state
  //   let { packages } = this.props;
  //

  //   // check the value in array thorugh filter

  //   var isExist = packages.filter(service => {
  //

  //     return service.packageObj === value.packages[value.i].packageObj;
  //   });

  //   if (isExist.length) {
  //
  //     this.setState({
  //       packageArray
  //     });
  //   }
  //   console.log(packageArray)
  // };

  handleToggleOnPackage = value => {
    let { packageArray } = this.state;

    // check the value in array thorugh filter

    var isExist = packageArray.filter(pack => {
      return pack.packageObj === value.packageObj;
    });
    console.log(isExist);
    if (isExist.length) {
      // remove array is exit through filter
      var removePrice = packageArray.filter(pack => {
        return pack.packageObj !== value.packageObj;
      });

      this.setState({
        packageArray: removePrice
      });
    } else {
      packageArray.push(value);

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
      userId: user && user.uid,
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
      packages,
      bookingItem,
      allBookingItem
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
      packageArray,
      isBookingButtonDisable
    } = this.state;
    return (
      <div>
        <div>
          <AuthenticatedNavbar />
          <GlobleLoader getVenueLoader={getVenueLoader} />
        </div>

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
            saveBooking={this.saveBooking}
            saveCustomBooking={this.saveCustomBooking}
            handleOnDateChange={this.handleOnDateChange}
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
            bookingItem={bookingItem}
            allBookingItem={allBookingItem}
            isBookingButtonDisable={isBookingButtonDisable}
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

      bookingItem,
      getBookingItemLoader,
      getBookingItemError,

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

    bookingItem,
    getBookingItemLoader,
    getBookingItemError,

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
    getPackages: vid => dispatch(venueAction.getPackages(vid)),
    allBookingItem: payload => dispatch(venueAction.getBookingItem(payload)),
    saveBookingItemAction: payload => dispatch(venueAction.saveBookingItem(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(carouselStyle)(VenueDetail)));
