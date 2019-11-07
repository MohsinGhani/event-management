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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "components/CustomButtons/Button.jsx";
import ReactLoading from "react-loading";
import ConfirmationModal from "./ConfirmationModal";
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
//   debugger;
//   let valid = true;
//   debugger;
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

      serviesFacilities: [{ title: "", price: "" }],
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

  // validatesAddDetailsForm = () => {
  //   let {
  //     name,
  //     phone,
  //     email,
  //     address,
  //     description,
  //     bookingPerDay,
  //     error
  //   } = this.state;

  //   if (
  //     name &&
  //     name.length >= 3 &&
  //     (phone && phone.length >= 7) &&
  //     email &&
  //     (address && address.length >= 10) &&
  //     (description && description.length >= 10) &&
  //     (bookingPerDay && bookingPerDay.length >= 1)
  //   ) {
  //     this.handleDetailInput()
  //     this.setState({
  //       isDetailsButtonDisable: false,
  //       error
  //     });
  //   } else {
  //     error = {
  //       categorySelect: null,
  //       name: null,
  //       phone: null,
  //       email: null,
  //       address: null,
  //       description: null,
  //       bookingPerDay: null,
  //       serviesFacilities: null,
  //       files: null,
  //       picked: null
  //     };
  //     this.setState({
  //       isDetailsButtonDisable: true,
  //       error
  //     });
  //   }
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   const {
  //     name,
  //     phone,
  //     email,
  //     address,
  //     description,
  //     bookingPerDay,
  //   } = this.state;
  //   if (
  //     (prevState.name !=
  //     name.length >= 3) &&
  //     (prevState.phone != phone.length >= 7) &&
  //     email &&
  //     (prevState.address != address.length >= 10) &&
  //     (prevState.description != description.length >= 10) &&
  //     (prevState.bookingPerDay != bookingPerDay.length >= 1)
  //   ) {
  //     this.setState({isDetailsButtonDisable: false})
  //   }
  // }

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

  successNotifiy = message => toast.success(message);

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
    let service = this.state.serviesFacilities;
    service[i][event.target.name] = event.target.value;
    this.setState({
      serviesFacilities: service,
      isDetailsButtonDisable: false
    });
  };

  handlerServicesFieldAdd = () => {
    this.setState({
      serviesFacilities: [
        ...this.state.serviesFacilities,
        {
          title: "",
          price: ""
        }
      ]
    });
  };

  handlerServicesFieldDelete = index => {
    this.state.serviesFacilities.splice(index, 1);
    this.setState({
      serviesFacilities: this.state.serviesFacilities
    });
  };

  handelOnSaveAndUpload = () => {
    var storageRef = storage.ref();
    var urls = [];
    let user = this.props.user;

    this.state.files.map((file, index) => {
      return storageRef
        .child(`events images/${file.name}`)
        .put(file)
        .then(response => {
          var progresss =
            (response.task.snapshot.bytesTransferred /
              response.task.snapshot.totalBytes) *
            100;

          console.log("Upload is " + this.state.progress + "% done");
          console.log(progresss);

          response.task.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              urls.push(downloadURL);

              console.log(urls);
            })
            .then(() => {
              this.setState({
                url: urls
              });

              console.log("file.length", this.state.files.length);
              console.log("index=", index);
              var sum = index + 1;

              console.log("sum=", sum);

              console.log("second iteration");

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
                  status: 0,
                  objStatus: 1,
                  createdTimestamp: new Date().getTime()
                };
                this.props.saveVenue(newDetails);
                this.successNotifiy("Form Successfully Submited...!");
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
                  picked: null
                });
              }
            })
            .catch(error => {
              alert(error);
            });
        });
    });
    this.successNotifiy("Form is Submitting...!");
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
      isDetailsButtonDisable
    } = this.state;

    const { saveVenueLoader, classes } = this.props;
    return (
      <div>
        <AuthenticatedNavbar />
        <br />

        <Selectbar
          categorySelect={categorySelect}
          categoryHandler={this.categoryHandler}
          categories={dummyCategories}
        />
        <ToastContainer />

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
          handlerServicesFieldDelete={this.handlerServicesFieldDelete}
          isDetailsButtonDisable={isDetailsButtonDisable}
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
          {" "}
          {/* <Button
            variant="outlined"
            color="success"
            disabled={isDetailsButtonDisable}
            onClick={() => {
              this.handelOnSaveAndUpload();
              this.successNotifiy("Form Successfully Submited...!");
            }}
          >
            {saveVenueLoader ? (
              <ReactLoading
                type={"spin"}
                color={"#ffff"}
                // height={'100px'}
                // width={'100px'}
              />
            ) : (
              "Submit"
            )}
          </Button> */}
          <ConfirmationModal
            goto={this.goto}
            isDetailsButtonDisable={isDetailsButtonDisable}
            handelOnSaveAndUpload={this.handelOnSaveAndUpload}
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
