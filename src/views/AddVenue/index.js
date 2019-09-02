import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import VenueForm from "./VenueForm";
import Photographers from "./Photographers";
import DecoratorsFrom from "./DecoratorsForm";
import Food_CaterersForm from "./Food_CaterersForm";
import Selectbar from "./Selectbar";

class AddVenue extends Component {
  state = {
    categorySelect: "",
    temp: true,
    venueDetails: {
      title: "",
      perHead: "",
      file: "",
      packages: "",
      contactNumber: "",
      checked: [24, 22],
      lenght: "",
      width: "",
      price: "",
      capacity: "",
      address: "",
      classicModal: false,
      picked: null,
      eventType: "",
      saveVenueLoader: false,
      saveVenueSuccess: false
    },
    decoratorDetails: {
      classicModal: false,
      picked: null,
      title: "",
      price: "",
      address: "",
      decorationThemeType: "",
      perHead: "",
      file: "",
      packages: "",
      contactNumber: "",
      saveVenueLoader: false,
      saveVenueSuccess: false
    },
    photographerDetails: {
      classicModal: false,
      picked: null,
      title: "",
      albumPrice: "",
      unlimitedAlbumPrice: "",
      address: "",
      saveVenueLoader: false,
      saveVenueSuccess: false,
      packages: "",
      contactNumber: ""
    },
    food_caterersDetails: {
      classicModal: false,
      picked: null,
      title: "",
      price: "",
      address: "",
      saveVenueLoader: false,
      saveVenueSuccess: false,
      type: "",
      foodItem: "",
      file: "",
      packages: ""
    },
    abc: ""
  };

  handleClickOpen = modal => {
    var x = [];
    x[modal] = true;
    this.setState(x);
  };

  handleClose = modal => {
    var x = [];
    x[modal] = false;
    this.setState(x);
  };

  pickedLocation = picked => {
    this.setState(
      {
        picked
      },
      this.handleClose("classicModal")
    );
  };

  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  venueDetailHandler = event => {
    let { venueDetails } = this.state;
    venueDetails[event.target.name] = event.target.value;
    this.setState({
      venueDetails,
      temp: !this.state.temp
    });
  };

  decoratorDetailsHandler = event => {
    let { decoratorDetails } = this.state;
    decoratorDetails[event.target.name] = event.target.value;
    this.setState({
      decoratorDetails,
      temp: !this.state.temp
    });
  };

  food_caterersDetailsHandler = event => {
    let { food_caterersDetails } = this.state;
    food_caterersDetails[event.target.name] = event.target.value;
    this.setState({
      food_caterersDetails,
      temp: !this.state.temp
    });
  };

  photographerDetailsHandler = event => {
    let { photographerDetails } = this.state;
    photographerDetails[event.target.name] = event.target.value;
    this.setState({
      photographerDetails,
      temp: !this.state.temp
    });
  };

  categoryHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // venueDetailHandler = (event, formName) => {
  //   const { name, value } = event.target;
  //   let formData = { ...this.state[formName] };

  //   formData = {
  //     ...formData,
  //     [name]: value
  //   };
  //   this.setState({});
  //   // this.setState({
  //   //   [name]: value,

  //   // });
  // };

  render() {
    const {
      categorySelect,
      venueDetails,
      food_caterersDetails,
      photographerDetails,
      decoratorDetails,
      temp
    } = this.state;
    return (
      <div>
        <AuthenticatedNavbar />
        <br />
        <Selectbar
          categorySelect={categorySelect}
          categoryHandler={this.categoryHandler}
        />

        {/* annonymus fuction     auto call */}

        {(() => {
          if (categorySelect === "venue_form") {
            return (
              <VenueForm
                venueDetails={venueDetails}
                temp={temp}
                venueDetailHandler={this.venueDetailHandler}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                pickedLocation={this.pickedLocation}
                handleToggle={this.handleToggle}
              />
            );
          } else if (categorySelect === "food_caterers") {
            return (
              <Food_CaterersForm
                food_caterersDetails={food_caterersDetails}
                food_caterersDetailsHandler={this.food_caterersDetailsHandler}
                temp={temp}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                pickedLocation={this.pickedLocation}
                handleToggle={this.handleToggle}
              />
            );
          } else if (categorySelect === "decorators_form") {
            return (
              <DecoratorsFrom
                decoratorDetails={decoratorDetails}
                decoratorDetailsHandler={this.decoratorDetailsHandler}
                temp={temp}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                pickedLocation={this.pickedLocation}
                handleToggle={this.handleToggle}
              />
            );
          } else if (categorySelect === "photographer") {
            return (
              <Photographers
                photographerDetails={photographerDetails}
                photographerDetailsHandler={this.photographerDetailsHandler}
                temp={temp}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                pickedLocation={this.pickedLocation}
                handleToggle={this.handleToggle}
              />
            );
          }
        })()}
        {/* <VenueForm />
        <Photographers />
        <DecoratorsFrom />
        <Food_CaterersForm /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: { venues }
  } = state;
  return {
    user,
    isLoggedIn,
    venues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    saveVenueAction: payload => dispatch(venueAction.saveVenue(payload)),
    logout: () => dispatch(authAction.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(basicsStyle)(AddVenue)));

// import { connect } from 'react-redux';
// import withStyles from "@material-ui/core/styles/withStyles";
// import { withRouter } from 'react-router-dom';
// import { authAction, venueAction } from "./../../store/actions";
// import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar"
// import GridContainer from 'components/Grid/GridContainer'
// import Card from 'components/Card/Card'
// import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import PickLocationModal from "./PickLocationModal"
// import Button from "components/CustomButtons/Button.jsx";
// import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
// import Check from "@material-ui/icons/Check";

// class AddVenue extends React.Component {
//     state = {
//         classicModal: false,
//         picked: null,
//         title: '',
//         price: '',
//         capacity: '',
//         address: '',
//         saveVenueLoader: false,
//         saveVenueSuccess: false,
//         type: ""
//     }

//     handleClickOpen = (modal) => {
//         var x = [];
//         x[modal] = true;
//         this.setState(x);
//     }

//     handleClose = (modal) => {
//         var x = [];
//         x[modal] = false;
//         this.setState(x);
//     }

//     pickedLocation = (picked) => {
//         this.setState({
//             picked
//         }, this.handleClose("classicModal"))
//     }

//     inputHandler = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     saveVenue = () => {
//         let venue = {
//             vid: '0002',
//             name: 'Global Marque',
//             contact: '(021) 35344665',
//             description: "The Royal Rodale allows you to take a complete detour form the humdrum of a monotonous life and throw yourself in a world of excitements. Ideally located just near Sea-View Township touching the main residential phase of D.H.A. Phase 5 Ext, this three level facility is surely a unique and exotic treat for the fun-deprived Karachiites",
//             additionalText: [
//                 { title: "" }
//             ],
//             rating: {
//                 overall: 4.9,
//                 service: 4,
//                 ambiance: 5,
//                 price: 4.6,
//                 food: 5,
//                 staff: 5,
//                 communication: 5
//             },
//             responseTime: { count: 1, unit: 'hour' },
//             profileViewed: 690,
//             operationalHours: { from: '12PM', to: '12AM' },
//             country: 'Pakistan',
//             city: 'Karachi',
//             address: 'P.E.C.H.S Shara-e-faisal',
//             location: {
//                 lat: 24.870153517402485,
//                 log: 67.07484439387972
//             },
//             capacity: 500,
//             mainPic: 'http://venuehook.com/uploads/listing/1511261297IMG_4549%20%2002.jpg',
//             pics: [
//                 'http://venuehook.com/uploads/listing/1511261297IMG_4544%20%2001.jpg',
//                 'http://venuehook.com/uploads/listing/1511261297IMG_4549%20%2002.jpg',
//                 'http://venuehook.com/uploads/listing/1511261297IMG_4552%20%2003.jpg',
//                 'http://venuehook.com/uploads/listing/1511261297IMG_4553%20%2004.jpg',
//                 'http://venuehook.com/uploads/listing/1511261297IMG_4559%20%2005.jpg',
//             ],
//             dimention: { length: 100, width: 100, height: 100, unit: 'ft' },
//             termsAndCondition: [
//                 'Soft Drinks are not included in above package and will be charged separately. (Billed on Actual Consumption)',
//                 'Mineral Water is not included in above package and will be charged separately (Billed on Actual Consumption)',
//                 'Musical, Religious, Political, Commercial or Public events are subject to approval from concerned authorities',
//                 'Function must end at 12:00 A.M or else penalty rate of PKR ----/hour will be applied unless NOC issued from concerned authorities',
//                 'Venue Premises  is secured by  CCTV cameras',
//                 'Religious, Political, Public or commercial events are subject to approval from concerned',
//                 'Booking of venue will be confirmed on receiving of 30% advance payment at the time of booking'
//             ],
//             feature: [
//                 { atrName: 'AC Availability', type: 0, price: 5000 },
//                 { atrName: 'Food Availability', type: 0, price: 20000 },
//                 { atrName: 'DJ Availability', type: 0, price: 6000 },
//                 { atrName: 'Ramp Walk Availability', type: 0, price: 3000 },
//                 { atrName: 'Speacial Decoration', type: 0, price: 4000 },
//                 {
//                     atrName: 'Speacial Lighting', type: 1, option: [
//                         { title: 'category one', price: 1000 },
//                         { title: 'category two', price: 2000 },
//                         { title: 'category three', price: 3000 },
//                     ]
//                 },
//             ],
//             bestSuitableFor: [
//                 'Festival',
//                 'Fashion Show',
//                 'Music / Gig'
//             ],
//             venueTypes: 'Banquet Hall',
//             basicCost: 30000,
//             totatCost: 1 //this should be generate by accoring to features and basicCost
//         }

//         const { picked, title, price, capacity, address } = this.state
//         venue['name'] = title
//         venue['basicCost'] = price
//         venue['capacity'] = capacity
//         venue['address'] = address
//         let location = {
//             lat: picked.latitude,
//             log: picked.longitude
//         }
//         venue['location'] = location
//         this.setState({ saveVenueLoader: true })
//         setTimeout(() => {
//             this.props.saveVenueAction(venue)
//             this.setState({
//                 classicModal: false,
//                 picked: null,
//                 title: '',
//                 price: '',
//                 capacity: '',
//                 address: '',
//                 saveVenueLoader: false,
//                 saveVenueSuccess: true
//             })
//         }, 3000)
//     }

//     render() {
//         const { classes } = this.props;
//         const { classicModal, picked, title, price, capacity, address, saveVenueLoader, saveVenueSuccess } = this.state
//         return (
//             <div>
//                 <AuthenticatedNavbar />
//                 <br />
//                 <GridContainer style={{ padding: '0', maxWidth: '1024px', margin: '0 auto' }}>
//                     {
//                         saveVenueSuccess &&
//                         <SnackbarContent
//                             message={
//                                 <span>
//                                     <b>Congratulation!:</b> You have successfully added your Venue in our System...
//                                 </span>
//                             }
//                             close
//                             color="success"
//                             icon={Check}
//                         />
//                     }
//                     <Card style={{ padding: '15px', margin: 0 }}>
//                         <div style={{ margin: '0' }} className={classes.title}>
//                             <h2>Venue Form</h2>
//                         </div>

//                         <GridContainer>
//                             <GridItem xs={12} sm={6} md={6} lg={6}>
//                                 <CustomInput
//                                     labelText="Venue Title"
//                                     id="float"
//                                     formControlProps={{
//                                         fullWidth: true
//                                     }}
//                                     inputProps={{
//                                         value: title,
//                                         name: 'title',
//                                         onChange: this.inputHandler
//                                     }}
//                                 />
//                             </GridItem>
//                             <GridItem xs={12} sm={6} md={6} lg={6}>
//                                 <CustomInput
//                                     labelText="Venue Price"
//                                     id="float"
//                                     formControlProps={{
//                                         fullWidth: true
//                                     }}
//                                     inputProps={{
//                                         type: 'number',
//                                         name: 'price',
//                                         value: price,
//                                         onChange: this.inputHandler
//                                     }}
//                                 />
//                             </GridItem>
//                             <GridItem xs={12} sm={6} md={6} lg={6}>
//                                 <CustomInput
//                                     labelText="Venue Capacity"
//                                     id="float"
//                                     formControlProps={{
//                                         fullWidth: true
//                                     }}
//                                     inputProps={{
//                                         type: 'number',
//                                         name: 'capacity',
//                                         value: capacity,
//                                         onChange: this.inputHandler,
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <i class="material-icons">people</i>
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />
//                             </GridItem>
//                             <GridItem xs={12} sm={6} md={6} lg={6}>
//                                 <CustomInput
//                                     labelText="Venue Address"
//                                     id="material"
//                                     formControlProps={{
//                                         fullWidth: true
//                                     }}
//                                     inputProps={{
//                                         value: address,
//                                         name: 'address',
//                                         onChange: this.inputHandler,
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <i class="material-icons">location_on</i>
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />
//                             </GridItem>
//                             {
//                                 !picked &&
//                                 <GridItem xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
//                                     <Button color="primary" round size="sm" onClick={() => this.handleClickOpen("classicModal")} >
//                                         <i class="material-icons">add_location</i> Pick Your Venue Location
//                                 </Button>
//                                 </GridItem>
//                             }
//                             {
//                                 picked &&
//                                 <GridItem xs={12} sm={6} md={6} lg={6}>
//                                     <CustomInput
//                                         labelText="Picked Longitude"
//                                         id="regular"
//                                         formControlProps={{
//                                             fullWidth: true
//                                         }}
//                                         inputProps={{
//                                             disabled: true,
//                                             value: picked.longitude,
//                                             endAdornment: (
//                                                 <InputAdornment position="end" onClick={() => this.pickedLocation(null)}>
//                                                     <i class="material-icons">close</i>
//                                                 </InputAdornment>
//                                             )
//                                         }}
//                                     />
//                                 </GridItem>
//                             }
//                             {
//                                 picked &&
//                                 <GridItem xs={12} sm={6} md={6} lg={6}>
//                                     <CustomInput
//                                         labelText="Picked Latitude"
//                                         id="regular"
//                                         formControlProps={{
//                                             fullWidth: true
//                                         }}
//                                         inputProps={{
//                                             disabled: true,
//                                             value: picked.latitude,
//                                             endAdornment: (
//                                                 <InputAdornment position="end" onClick={() => this.pickedLocation(null)}>
//                                                     <i class="material-icons">close</i>
//                                                 </InputAdornment>
//                                             )
//                                         }}
//                                     />
//                                 </GridItem>
//                             }
//                             {
//                                 <GridItem xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                                     <Button
//                                         color="success"
//                                         disabled={!(title && price && address && capacity && picked) || saveVenueLoader}
//                                         onClick={this.saveVenue}
//                                     >
//                                         <i class="material-icons">save_alt</i> Save {saveVenueLoader ? '...' : ''}
//                                     </Button>
//                                 </GridItem>
//                             }
//                         </GridContainer>
//                     </Card>
//                 </GridContainer>

//                 <PickLocationModal
//                     classicModal={classicModal}
//                     handleClose={this.handleClose}
//                     pickedLocation={this.pickedLocation}
//                 />

//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//   const {
//     authReducer: { user, isLoggedIn },
//     venueReducer: { venues }
//   } = state;
//   return {
//     user,
//     isLoggedIn,
//     venues
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
//     saveVenueAction: payload => dispatch(venueAction.saveVenue(payload)),
//     logout: () => dispatch(authAction.logout())
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(withStyles(basicsStyle)(AddVenue)));
