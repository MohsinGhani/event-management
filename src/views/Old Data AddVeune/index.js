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
import storage from "../../firebase/FireBase";

class AddVenue extends Component {
  state = {
    categorySelect: "",
    temp: true,
    classicModal: false,
    picked: null,
    // image: null,
    // url: "",
    // progress: 0,
    venueDetails: {
      title: "",
      price: "",
      packages: "",
      contactNumber: "",
      lenght: "",
      width: "",
      capacity: "",
      address: "",
      email: '',
      serviceChecked: [],
      eventTypeCheck: [],
      image: null,
      url: [],
      progress: 0,
      description: ""
    },
    decoratorDetails: {
      title: "",
      price: "",
      address: "",
      decorationThemeTypeCheck: [],
      file: "",
      email: '',
      packages: "",
      contactNumber: "",
      image: null,
      url: [],
      progress: 0,
      description: ''
    },
    food_caterersDetails: {
      title: "",
      price: "",
      address: "",
      foodItemCheck: [],
      file: "",
      packages: "",
      email: "",
      contactNumber: "",
      image: null,
      url: [],
      progress: 0,
      description: ''
    },
    photographerDetails: {
      title: "",
      price: "",
      unlimitedAlbumPrice: "",
      address: "",
      email: "",
      packages: "",
      contactNumber: "",
      photographyType: [],
      image: null,
      url: [],
      progress: 0,
      description: ''
    }
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

  handleChangeOnVenueUpload = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({
        venueDetails: {
          ...this.state.venueDetails,
          image
        }
      });
    }
  };

  handleChangeOnDecorationUpload = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({
        decoratorDetails: {
          ...this.state.decoratorDetails,
          image
        }
      });
    }
  };

  handleChangeOnFoodUpload = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({
        food_caterersDetails: {
          ...this.state.food_caterersDetails,
          image
        }
      });
    }
  };

  handleChangeOnPhotograherUpload = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({
        photographerDetails: {
          ...this.state.photographerDetails,
          image
        }
      });
    }
  };

  handleOnVenueUploadFile = () => {
    const { image } = this.state.venueDetails;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        this.setState({
          venueDetails: {
            ...this.state.venueDetails,
            progress
          }
        });
      },
      error => {
        // error function ....
        console.log(error);
      },

      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            let venueDetails = this.state.venueDetails;
            venueDetails.url.push(url);
            this.setState({ venueDetails });
            // this.setState({ venueDetails: {
            //   ...this.state.venueDetails,
            //   url
            // } });
          });
      }
    );
  };
  handleOnDecorationUploadFile = () => {
    const { image } = this.state.decoratorDetails;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        this.setState({
          decoratorDetails: {
            ...this.state.decoratorDetails,
            progress
          }
        });
      },
      error => {
        // error function ....
        console.log(error);
      },

      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            let decoratorDetails = this.state.decoratorDetails;
            decoratorDetails.url.push(url);
            this.setState({ decoratorDetails });
            // this.setState({ decoratorDetails: {
            //   ...this.state.decoratorDetails,
            //   url
            // } });
          });
      }
    );
  };
  handleOnFoodUploadFile = () => {
    const { image } = this.state.food_caterersDetails;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        this.setState({
          food_caterersDetails: {
            ...this.state.food_caterersDetails,
            progress
          }
        });
      },
      error => {
        // error function ....
        console.log(error);
      },

      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            let food_caterersDetails = this.state.food_caterersDetails;
            food_caterersDetails.url.push(url);
            this.setState({ food_caterersDetails });
            // this.setState({ food_caterersDetails: {
            //   ...this.state.food_caterersDetails,
            //   url
            // } });
          });
      }
    );
  };
  handleOnPhotograhUploadFile = () => {
    const { image } = this.state.photographerDetails;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        this.setState({
          photographerDetails: {
            ...this.state.photographerDetails,
            progress
          }
        });
      },
      error => {
        // error function ....
        console.log(error);
      },

      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            let photographerDetails = this.state.photographerDetails;
            photographerDetails.url.push(url);
            this.setState({ photographerDetails });
            // this.setState({ photographerDetails: {
            //   ...this.state.photographerDetails,
            //   url
            // } });
          });
      }
    );
  };

  // ********************************* File Storage Function **************************************  //

  // const { image } = this.state;
  // // const uploadTask = storage.ref(`images/${image.image}`).put(image);
  // console.log(image);
  // var storageRef = storage.ref();
  // const uploadTask = storageRef.child(`images/${image}`).put(image);
  // uploadTask.on(
  //   "state_changed",
  //   snapshot => {
  //     const progress = Math.round(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     );
  //     console.log("Upload is " + progress + "% done");
  //     this.setState({
  //       progress
  //     });
  //   },
  //   error => {
  //     console.log(error);
  //   },
  //   () => {
  //     uploadTask.snapshot.ref.getDownloadURL().then(url => {
  //       console.log("File available at", url);
  //     });
  //   }
  //   // () => {
  //   //   storage
  //   //     .ref("images")
  //   //     .child(image.name)
  //   //     .getDownloadURL()
  //   //     .then(url => {
  //   //       console.log(url);
  //   //       this.setState({
  //   //         venueDetails: {
  //   //           ...this.state.venueDetails,
  //   //           url
  //   //         }
  //   //       });
  //   //     });
  //   // }
  // );
  // console.log(uploadTask);

  handleToggleOnService = value => {
    let { venueDetails } = this.state;
    const { serviceChecked } = this.state.venueDetails;
    const currentIndex = serviceChecked.indexOf(value);
    const newServiceChecked = [...serviceChecked];

    if (currentIndex === -1) {
      newServiceChecked.push(value);
    } else {
      newServiceChecked.splice(currentIndex, 1);
    }
    this.setState({
      venueDetails: {
        ...venueDetails,
        serviceChecked: newServiceChecked
      }
    });
  };

  handleToggleOnEventType = value => {
    let { venueDetails } = this.state;
    const { eventTypeCheck } = this.state.venueDetails;
    const currentIndex = eventTypeCheck.indexOf(value);
    const newEventTypeCheck = [...eventTypeCheck];

    if (currentIndex === -1) {
      newEventTypeCheck.push(value);
    } else {
      newEventTypeCheck.splice(currentIndex, 1);
    }

    this.setState({
      venueDetails: {
        ...venueDetails,
        eventTypeCheck: newEventTypeCheck
      }
    });
  };

  handleToggleOnDecorationThemeTypeCheck = value => {
    let { decoratorDetails } = this.state;
    const { decorationThemeTypeCheck } = this.state.decoratorDetails;
    const currentIndex = decorationThemeTypeCheck.indexOf(value);
    const newDecorationThemeTypeCheck = [...decorationThemeTypeCheck];

    if (currentIndex === -1) {
      newDecorationThemeTypeCheck.push(value);
    } else {
      newDecorationThemeTypeCheck.splice(currentIndex, 1);
    }

    this.setState({
      decoratorDetails: {
        ...decoratorDetails,
        decorationThemeTypeCheck: newDecorationThemeTypeCheck
      }
    });
  };

  handleToggleOnFoodItemCheck = value => {
    let { food_caterersDetails } = this.state;
    const { foodItemCheck } = this.state.food_caterersDetails;
    const currentIndex = foodItemCheck.indexOf(value);
    const newFoodItemCheck = [...foodItemCheck];

    if (currentIndex === -1) {
      newFoodItemCheck.push(value);
    } else {
      newFoodItemCheck.splice(currentIndex, 1);
    }

    this.setState({
      food_caterersDetails: {
        ...food_caterersDetails,
        foodItemCheck: newFoodItemCheck
      }
    });
  };

  handleToggleOnPhotographyType = value => {
    let { photographerDetails } = this.state;
    const { photographyType } = this.state.photographerDetails;
    const currentIndex = photographyType.indexOf(value);
    const newPhotographyType = [...photographyType];

    if (currentIndex === -1) {
      newPhotographyType.push(value);
    } else {
      newPhotographyType.splice(currentIndex, 1);
    }

    this.setState({
      photographerDetails: {
        ...photographerDetails,
        photographyType: newPhotographyType
      }
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

  saveVenue = () => {
    const { categorySelect } = this.state;
    const { picked, image, progress, url } = this.state;

    if (categorySelect === "venue_form") {
      const {
        title,
        price,
        packages,
        contactNumber,
        lenght,
        email,
        width,
        capacity,
        address,
        serviceChecked,
        eventTypeCheck,
        image,
        url,
        progress,
        description
      } = this.state.venueDetails;
      const newVenueDetails = {
        title,
        price,
        packages,
        contactNumber,
        lenght,
        width,
        email,
        capacity,
        address,
        serviceChecked,
        eventTypeCheck,
        objType: categorySelect,
        location: picked,
        url,
        description
      };
      this.props.saveVenue(newVenueDetails);
      this.setState({
        venueDetails: {
          title: "",
          price: "",
          image: "",
          packages: "",
          contactNumber: "",
          lenght: "",
          width: "",
          email: "",
          capacity: "",
          address: "",
          serviceChecked: [],
          eventTypeCheck: [],
          url: [],
          description: '',
        }
      });
    } else if (categorySelect === "food_caterers") {
      const {
        title,
        price,
        address,
        email,
        foodItemCheck,
        packages,
        contactNumber,
        url,
        description
      } = this.state.food_caterersDetails;

      const newFood_caterersDetails = {
        title,
        price,
        address,
        email,
        foodItemCheck,
        packages,
        contactNumber,
        objType: categorySelect,
        location: picked,
        url,
        description
      };
      this.props.saveVenue(newFood_caterersDetails);
      this.setState({
        food_caterersDetails: {
          title: "",
          price: "",
          address: "",
          email: "",
          foodItemCheck: [],
          packages: "",
          contactNumber: "",
          url: [],
          description: "",
        }
      });
    } else if (categorySelect === "decorators_form") {
      const {
        title,
        price,
        address,
        email,
        decorationThemeTypeCheck,
        packages,
        contactNumber,
        url,
        description
      } = this.state.decoratorDetails;
      const newDecoratorDetails = {
        title,
        price,
        address,
        email,
        decorationThemeTypeCheck,
        packages,
        contactNumber,
        objType: categorySelect,
        location: picked,
        url,
        description
      };
      this.props.saveVenue(newDecoratorDetails);
      this.setState({
        decoratorDetails: {
          title: "",
          price: "",
          address: "",
          email: "",
          decorationThemeTypeCheck: [],
          packages: "",
          contactNumber: "",
          url: [],
          description: ""
        }
      });
    } else if (categorySelect === "photographer") {
      const {
        title,
        price,
        unlimitedAlbumPrice,
        address,
        email,
        contactNumber,
        packages,
        photographyType,
        url,
        description
      } = this.state.photographerDetails;
      const newPhotographerDetails = {
        title,
        price,
        unlimitedAlbumPrice,
        address,
        email,
        contactNumber,
        packages,
        photographyType,
        objType: categorySelect,
        location: picked,
        url,
        description
      };
      this.props.saveVenue(newPhotographerDetails);
      this.setState({
        photographerDetails: {
          title: "",
          price: "",
          unlimitedAlbumPrice: "",
          address: "",
          email: '',
          packages: "",
          contactNumber: "",
          photographyType: [],
          url: [],
          description: ""
        }
      });
    }
    this.setState({
      picked: ""
    });
  };

  render() {
    const {
      categorySelect,
      venueDetails,
      food_caterersDetails,
      photographerDetails,
      decoratorDetails,
      temp,
      classicModal,
      picked
      // image,
      // url,
      // progress
    } = this.state;

    const { saveVenueLoader } = this.props;
    return (
      <div>
        <AuthenticatedNavbar  navBgColor={'rose'}/>
        <br />
        <Selectbar
          categorySelect={categorySelect}
          categoryHandler={this.categoryHandler}
        />

        {/* *********************** annonymus fuction     auto call ********************************** */}

        {(() => {
          if (categorySelect === "venue_form") {
            return (
              <VenueForm
                venueDetails={venueDetails}
                temp={temp}
                classicModal={classicModal}
                picked={picked}
                venueDetailHandler={this.venueDetailHandler}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                pickedLocation={this.pickedLocation}
                handleToggleOnService={this.handleToggleOnService}
                handleToggleOnEventType={this.handleToggleOnEventType}
                saveVenue={this.saveVenue}
                saveVenueLoader={saveVenueLoader}
                handleOnVenueUploadFile={this.handleOnVenueUploadFile}
                handleChangeOnVenueUpload={this.handleChangeOnVenueUpload}
                // image={image}
                // progress={progress}
                // url={url}
              />
            );
          } else if (categorySelect === "food_caterers") {
            return (
              <Food_CaterersForm
                food_caterersDetails={food_caterersDetails}
                food_caterersDetailsHandler={this.food_caterersDetailsHandler}
                temp={temp}
                classicModal={classicModal}
                picked={picked}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                pickedLocation={this.pickedLocation}
                handleToggleOnFoodItemCheck={this.handleToggleOnFoodItemCheck}
                saveVenue={this.saveVenue}
                saveVenueLoader={saveVenueLoader}
                handleOnFoodUploadFile={this.handleOnFoodUploadFile}               
                handleChangeOnFoodUpload={this.handleChangeOnFoodUpload}
                // image={image}
                // progress={progress}
                // url={url}
              />
            );
          } else if (categorySelect === "decorators_form") {
            return (
              <DecoratorsFrom
                decoratorDetails={decoratorDetails}
                decoratorDetailsHandler={this.decoratorDetailsHandler}
                temp={temp}
                classicModal={classicModal}
                picked={picked}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                pickedLocation={this.pickedLocation}
                handleToggleOnDecorationThemeTypeCheck={
                  this.handleToggleOnDecorationThemeTypeCheck
                }
                saveVenue={this.saveVenue}
                saveVenueLoader={saveVenueLoader}
                handleOnDecorationUploadFile={this.handleOnDecorationUploadFile}               
                handleChangeOnDecorationUpload={this.handleChangeOnDecorationUpload}
                // image={image}
                // progress={progress}
                // url={url}
              />
            );
          } else if (categorySelect === "photographer") {
            return (
              <Photographers
                photographerDetails={photographerDetails}
                photographerDetailsHandler={this.photographerDetailsHandler}
                temp={temp}
                classicModal={classicModal}
                picked={picked}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                pickedLocation={this.pickedLocation}
                handleToggleOnPhotographyType={
                  this.handleToggleOnPhotographyType
                }
                saveVenue={this.saveVenue}
                saveVenueLoader={saveVenueLoader}
                handleOnPhotograhUploadFile={this.handleOnPhotograhUploadFile}               
                handleChangeOnPhotograherUpload={this.handleChangeOnPhotograherUpload}
                // image={image}
                // progress={progress}
                // url={url}
              />
            );
          }
        })()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    authReducer: { user, isLoggedIn },
    venueReducer: { savedVenue, saveVenueError, saveVenueLoader }
  } = state;
  return {
    user,
    isLoggedIn,
    savedVenue,
    saveVenueLoader,
    saveVenueError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    saveVenue: payload => dispatch(venueAction.saveVenue(payload)),
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

// =======================Nasted level setstate===========================
// venueDetailHandler = event => {
//   const {venueDetails} = {...this.state}
//   const currentState = venueDetails
//   const {name, value} = event.target
//   currentState[name] = value

//   this.setState({venueDetails: currentState})
// }
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
