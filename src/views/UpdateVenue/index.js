import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { authAction, venueAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import Selectbar from "./Selectbar";
import Details from "./Details";
import CreateServiceFacilities from "./CreateServiceFacilities";
import ImageUploader from "./ImageUploader";
import { storage } from "../../firebase/FireBase";
import PickLocation from "./PickLocation";
import ReactLoading from "react-loading";
import Button from "components/CustomButtons/Button.jsx";
import GlobleLoader from "./GlobleLoader";
import SuccessTostify from "./../GlobleCompnenets/Tostify/SuccessTostify";

const dummyCategories = [
  { title: "Venue", id: "venue" },
  { title: "Decorator", id: "decorator" },
  { title: "Photographer", id: "photographer" },
  { title: "Food And Caterers", id: "food_and_caterers" }
];

class UpdateVenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorySelect: { title: "", id: "" },
      classicModal: false,

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
      vid: "",
      isDetailsButtonDisable: true,
      objType: "",

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

  validatesAddDetailsForm = () => {
    let {
      name,
      phone,
      email,
      address,
      description,
      bookingPerDay,
      error
    } = this.state;

    if (
      name &&
      name.length >= 3 &&
      phone &&
      phone.length >= 11 &&
      email &&
      address &&
      address.length >= 10 &&
      description &&
      description.length >= 10 &&
      bookingPerDay &&
      bookingPerDay.length >= 1
    ) {
      error = {
        name: null,
        phone: null,
        email: null,
        address: null,
        description: null,
        bookingPerDay: null
      };
      this.setState({
        isDetailsButtonDisable: false,
        error
      });
    } else {
      error = {
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
      };
      this.setState({
        isDetailsButtonDisable: true,
        error
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      name,
      phone,
      email,
      address,
      description,
      bookingPerDay,
      serviesFacilities,
      categorySelect,
      picked,
      objType
    } = this.state;
    const { venue } = this.props;
    if (
      prevState.name !== name ||
      prevState.phone !== phone ||
      prevState.email !== email ||
      prevState.address !== address ||
      prevState.description !== description ||
      prevState.bookingPerDay !== bookingPerDay ||
      prevState.serviesFacilities !== serviesFacilities ||
      prevState.categorySelect !== categorySelect ||
      prevState.picked !== picked
    ) {
      this.validatesAddDetailsForm();
    }

    if (prevProps.venue !== venue && venue) {
      console.log(venue);
      const { vid } = this.props.match.params;
      console.log(vid);

      this.setState({
        name: venue.name,
        phone: venue.phone,
        email: venue.email,
        address: venue.address,
        description: venue.description,
        vid: vid,
        url: venue.url,
        bookingPerDay: venue.bookingPerDay,
        serviesFacilities: venue.serviesFacilities,
        categorySelect: venue.categorySelect,
        objType: venue.objType,
        picked: venue.picked
      });
    }
    console.log(this.state.vid);
  }

  componentDidMount() {
    const { vid } = this.props.match.params;
    const { getVenue } = this.props;
    getVenue(vid);
  }

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

  handleDetailInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChangeOnServiceFacilites = (event, i) => {
    let service = this.state.serviesFacilities;
    service[i][event.target.name] = event.target.value;
    this.setState({
      serviesFacilities: service
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

  // handelOnSaveAndUpload = () => {
  //   const { user } = this.props;
  //   const {
  //     name,
  //     phone,
  //     email,
  //     address,
  //     description,
  //     bookingPerDay,
  //     serviesFacilities,
  //     url,
  //     categorySelect,
  //     picked,
  //     vid
  //   } = this.state;
  //   const newDetails = {
  //     name,
  //     phone,
  //     email,
  //     address,
  //     description,
  //     bookingPerDay,
  //     serviesFacilities,
  //     objType: categorySelect,
  //     location: picked,
  //     url,
  //     vid,
  //     userId: user && user.uid,
  //     updatedTimestamp: new Date().getTime()
  //   };
  //   this.props.updateVenueFunc(newDetails);
  //   this.setState({
  //     name: "",
  //     phone: "",
  //     email: "",
  //     address: "",
  //     description: "",
  //     bookingPerDay: "",
  //     url: [],
  //     categorySelect: [],
  //     files: [],
  //     serviesFacilities: [],
  //     picked: null
  //   });
  // };

  goto = path => {
    this.props.history.push(path);
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
                  picked,
                  vid
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
                  vid,
                  status: 0,
                  objStatus: 1,
                  userId: user && user.uid,
                  updatedTimestamp: new Date().getTime()
                };
                this.props.updateVenueFunc(newDetails);
                SuccessTostify("Form Successfully Submited...!");
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
                this.goto("/list-view");
              }
            })
            .catch(error => {
              alert(error);
            });
        });
    });
  };

  handelOnDeleteImage = index => {
    this.state.url.splice(index, 1);
    this.setState({
      url: this.state.url
    });
    console.log(this.state.url);
  };

  render() {
    const {
      categorySelect,

      classicModal,

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
      isDetailsButtonDisable,

      objType
    } = this.state;

    const { updateVenueLoader, getVenueLoader } = this.props;
    return (
      <div>
        <AuthenticatedNavbar  navBgColor={'rose'}/>
        <br />

        {getVenueLoader ? (
          <GlobleLoader getVenueLoader={getVenueLoader} />
        ) : (
          //     ""
          //   )}
          // </div>
          <>
            <Selectbar
              categorySelect={categorySelect}
              categoryHandler={this.categoryHandler}
              categories={dummyCategories}
              objType={objType}
            />

            <Details
              name={name}
              phone={phone}
              email={email}
              address={address}
              description={description}
              bookingPerDay={bookingPerDay}
              handleDetailInput={this.handleDetailInput}
              getVenueLoader={getVenueLoader}
            />

            <CreateServiceFacilities
              serviesFacilities={serviesFacilities}
              addSpec={addSpec}
              handleChangeOnServiceFacilites={
                this.handleChangeOnServiceFacilites
              }
              handlerServicesFieldAdd={this.handlerServicesFieldAdd}
              classicModal={classicModal}
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClose}
              handlerServicesFieldDelete={this.handlerServicesFieldDelete}
            />
            <ImageUploader
              open={open}
              progress={progress}
              files={files}
              url={url}
              handleUploadOpen={this.handleUploadOpen}
              handleUploadClose={this.handleUploadClose}
              handleUploadSave={this.handleUploadSave}
              handelOnDeleteImage={this.handelOnDeleteImage}
            />

            <PickLocation
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
              <Button
                variant="outlined"
                color="success"
                disabled={isDetailsButtonDisable}
                onClick={() => {
                  this.handelOnSaveAndUpload();
                }}
              >
                {updateVenueLoader ? (
                  <ReactLoading
                    type={"spin"}
                    color={"#ffff"}
                    // height={"64px"}
                    // width={"64px"}
                  />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </>
        )}
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
      updatedVenue,
      updateVenueLoader,
      updateVenueError
    }
  } = state;
  return {
    user,
    isLoggedIn,
    venue,
    getVenueLoader,
    getVenueError,
    updatedVenue,
    updateVenueLoader,
    updateVenueError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVenue: vid => dispatch(venueAction.getVenue(vid)),
    updateVenueFunc: payload => dispatch(venueAction.updateVenue(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(basicsStyle)(UpdateVenue)));