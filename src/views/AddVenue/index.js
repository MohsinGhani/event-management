import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";

import Selectbar from "./Selectbar";
import Details from "./Details";
import CreateServiceFacilities from "./CreateServiceFacilities";
import ImageUploader from "./ImageUploader";
import { storage } from "../../firebase/FireBase";
import PickLocation from "./PickLocation";
import ConfirmationModal from "./ConfirmationModal";
import SuccessTostify from "./../GlobleCompnenets/Tostify/SuccessTostify";
import WarrningTostify from "./../GlobleCompnenets/Tostify/WarrningTostify";

const dummyCategories = [
  { title: "Venue", id: "venue" },
  { title: "Decorator", id: "decorator" },
  { title: "Photographer", id: "photographer" },
  { title: "Food And Caterers", id: "food_and_caterers" }
];
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
// const validateForm = errors => {
//   let valid = true;
//   Object.values(errors).forEach(val => val.length > 0 && (valid = false));
//   return valid;
// };

class AddVenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorySelect: { title: "", id: "" },
      classicModal: false,
      confirmModal: false,
      picked: null,

      serviesFacilities: [],
      addSer: false,

      open: false,
      files: [],
      progress: 0,
      url: [],

      name: "",
      phone: "",
      email: "",
      address: "",
      description: "",
      bookingPerDay: "",

      isDetailsButtonDisable: true,
      newServices: [{ title: "", price: "" }],
      error: {
        categorySelect: null,
        name: null,
        phone: null,
        email: null,
        address: null,
        description: null,
        bookingPerDay: null,
        serviesFacilities: null,
        files: null,
        picked: null
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { saveVenueError, saveVenueLoader } = this.props;
    if (prevProps.saveVenueLoader !== saveVenueLoader && saveVenueLoader) {
      SuccessTostify("Success! But wait for few hours Admin will aproved");
    } else if (prevProps.saveVenueError !== saveVenueError && saveVenueError) {
      WarrningTostify("Something went wrong.");
    }
  }

  handleClickOpen = modal => {
    const { serviesFacilities } = this.state
    var x = [];
    x[modal] = true;
    this.setState(x);
    if (serviesFacilities.length) {
      this.setState({ newServices: [...this.state.serviesFacilities] });
    }
  };

  handleClose = modal => {
    var x = [];
    x[modal] = false;
    this.setState(x);
  };

  handleClickLocOpen = modal => {
    var mapModal = [];
    mapModal[modal] = true;
    this.setState(mapModal);
  };

  handleLocClose = modal => {
    var mapModal = [];
    mapModal[modal] = false;
    this.setState(mapModal);
  };

  handleClickAddVenueOpen = modal => {
    var x = [];
    x[modal] = true;
    this.setState(x);
  };

  handleAddVenueClose = modal => {
    var x = [];
    x[modal] = false;
    this.setState(x);
  };

  handleUploadClose = () => {
    this.setState({
      open: false
    });
  };

  handleUploadOpen = () => {
    this.setState({
      open: true
    });
  };

  handleUploadSave = files => {
    this.setState({
      files: files,
      open: false
    });
  };

  categoryHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  goto = path => {
    this.props.history.push(path);
  };

  handleDetailInput = event => {
    // event.preventDefault();
    const { name, value } = event.target;
    let error = this.state.error;

    switch (name) {
      case "name":
        error.name =
          value.length < 3 ? "Name must be 3 characters long..!" : "";
        break;
      case "phone":
        error.phone =
          value.length < 7 ? "Phone must be 7 characters long..!" : "";
        break;
      case "email":
        error.email = validEmailRegex.test(value)
          ? ""
          : "Email is not valid..!";
        break;
      case "address":
        error.address =
          value.length < 10 ? "Address must be 10 characters long..!" : "";
        break;
      case "description":
        error.description =
          value.length < 10 ? "description must be 10 characters long..!" : "";
        break;
      case "bookingPerDay":
        error.bookingPerDay =
          value.length < 1 ? "BookingPerDay must be 1 characters long..!" : "";
        break;
      default:
        break;
    }

    this.setState({ error, [name]: value, isDetailsButtonDisable: false });
  };

  handleChangeOnServiceFacilites = (event, i) => {
    let service = this.state.newServices;
    service[i][event.target.name] = event.target.value;
    this.setState({
      newServices: service,
      isDetailsButtonDisable: false
    });
  };

  handlerServicesFieldAdd = () => {
    this.setState({
      newServices: [
        ...this.state.newServices,
        {
          title: "",
          price: ""
        }
      ]
    });
  };

  doneServicesFieldAdd = () => {
    this.setState({
      serviesFacilities: [
        ...this.state.newServices
      ]
    });
  };

  handlerServicesFieldDelete = index => {
    this.state.newServices.splice(index, 1);
    this.setState({
      newServices: this.state.newServices
    });
  };

  handelOnSaveAndUpload = () => {
    var storageRef = storage.ref();
    var urls = [];
    let user = this.props.user;
    this.setState({ localSaveVenueLoader: true })
    this.state.files.map((file, index) => {
      return storageRef
        .child(`events images/${file.name}`)
        .put(file)
        .then(response => {
          var progresss =
            (response.task.snapshot.bytesTransferred /
              response.task.snapshot.totalBytes) *
            100;

          response.task.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              urls.push(downloadURL);
            })
            .then(() => {
              this.setState({
                url: urls
              });
              var sum = index + 1;

              if (this.state.files.length === sum) {
                const {
                  name,
                  phone,
                  email,
                  address,
                  description,
                  bookingPerDay,
                  serviesFacilities,
                  url,
                  categorySelect,
                  picked
                } = this.state;
                const newDetails = {
                  name,
                  phone,
                  email,
                  address,
                  description,
                  bookingPerDay,
                  serviesFacilities,
                  objType: categorySelect,
                  location: picked,
                  url,
                  userId: user && user.uid,
                  status: 0, // delete, archive, unarchive
                  objStatus: 0, // pendding status, confirm status
                  createdTimestamp: new Date().getTime()
                };
                this.props.saveVenue(newDetails);
                this.handleClickAddVenueOpen("confirmModal");

                this.setState({
                  name: "",
                  phone: "",
                  email: "",
                  address: "",
                  description: "",
                  bookingPerDay: "",
                  url: [],
                  categorySelect: [],
                  files: [],
                  serviesFacilities: [],
                  picked: null,
                  localSaveVenueLoader: false
                });
              }
            })
            .catch(error => {
              alert(error);
            });
        });
    });
  };

  render() {
    const {
      categorySelect,

      classicModal,
      confirmModal,

      name,
      phone,
      email,
      address,
      description,
      bookingPerDay,

      serviesFacilities,
      addSpec,

      open,
      progress,
      files,
      url,
      error,
      isDetailsButtonDisable,
      localSaveVenueLoader,
      newServices
    } = this.state;

    const { saveVenueLoader } = this.props;
    return (
      <div>
        <AuthenticatedNavbar navBgColor={'rose'} />
        <br />

        <Selectbar
          categorySelect={categorySelect}
          categoryHandler={this.categoryHandler}
          categories={dummyCategories}
        />
        <Details
          name={name}
          phone={phone}
          email={email}
          address={address}
          description={description}
          bookingPerDay={bookingPerDay}
          handleDetailInput={this.handleDetailInput}
          error={error}
        />

        <CreateServiceFacilities
          serviesFacilities={serviesFacilities}
          addSpec={addSpec}
          handleChangeOnServiceFacilites={this.handleChangeOnServiceFacilites}
          handlerServicesFieldAdd={this.handlerServicesFieldAdd}
          classicModal={classicModal}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose}
          doneServicesFieldAdd={this.doneServicesFieldAdd}
          handlerServicesFieldDelete={this.handlerServicesFieldDelete}
          isDetailsButtonDisable={isDetailsButtonDisable}
          newServices={newServices}
        />
        <ImageUploader
          open={open}
          progress={progress}
          files={files}
          url={url}
          handleUploadOpen={this.handleUploadOpen}
          handleUploadClose={this.handleUploadClose}
          handleUploadSave={this.handleUploadSave}
        />

        <PickLocation
          handelOnSaveAndUpload={this.handelOnSaveAndUpload}
          parestSetState={picked =>
            this.setState({
              picked
            })
          }
        />
        <div
          style={{
            padding: "0",
            maxWidth: "1024px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px"
          }}
        >
          <ConfirmationModal
            goto={this.goto}
            isDetailsButtonDisable={isDetailsButtonDisable}
            handelOnSaveAndUpload={this.handelOnSaveAndUpload}
            localSaveVenueLoader={localSaveVenueLoader}
            saveVenueLoader={saveVenueLoader}
            successNotifiy={this.successNotifiy}
            confirmModal={confirmModal}
            handleClickAddVenueOpen={this.handleClickAddVenueOpen}
            handleAddVenueClose={this.handleAddVenueClose}
          />
        </div>
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
)(withRouter(withStyles({ ...basicsStyle, ...javascriptStyles })(AddVenue)));
