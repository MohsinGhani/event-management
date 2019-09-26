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
import storage from "../../firebase/FireBase";
import PickLocation from "./PickLocation";

const dummyCategories = [
  { title: "Venue", id: "venue" },
  { title: "Decorator", id: "decorator" },
  { title: "Photographer", id: "photographer" },
  { title: "Food And Caterers", id: "food_and_caterers" }
];

class AddVenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorySelect: { title: "", id: "" },
      classicModal: false,
      // mapModal: false,

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
      description: ""
    };
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
    

  // pickedLocation = picked => {
  //   this.setState(
  //     {
  //       picked
  //     },
  //     this.handleClose("mapModal")
  //   );
  // };



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

  // saveVenue = () => {
  //   // const { categorySelect } = this.state;
  //   // const { picked, image, progress, url } = this.state;
  //   const {
  //     name,
  //     phone,
  //     email,
  //     address,
  //     description,
  //     picked,
  //     image,
  //     progress,
  //     url,
  //     categorySelect
  //   } = this.state;
  //   const newDetails = {
  //     name,
  //     phone,
  //     email,
  //     address,
  //     description,
  //     objType: categorySelect,
  //     location: picked,
  //     url
  //   };
  //   this.props.saveVenue(newDetails);
  //   this.setState({
  //     name: "",
  //     phone: "",
  //     email: "",
  //     address: "",
  //     description: "",
  //     url: [],
  //     picked: ""
  //   });
  // };

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
    // if (this.state.addSer === false) {
    //   this.setState({
    //     addSer: true
    //   });
    // } else {
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
    console.log(this.state.serviesFacilities);
  };

  handelOnSaveAndUpload = () => {
    var storageRef = storage.ref();
    var urls = [];

    this.state.files.map((file, index) => {
      storageRef
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
                  serviesFacilities,
                  image,
                  progress,
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
                  serviesFacilities,
                  objType: categorySelect,
                  location: picked,
                  url
                };
                this.props.saveVenue(newDetails);
                this.setState({
                  name: "",
                  phone: "",
                  email: "",
                  address: "",
                  description: "",
                  url: [],
                  categorySelect: [],
                  files: [],
                  serviesFacilities: [],
                  picked: ''
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
      picked,

      mapModal,

      name,
      phone,
      email,
      address,
      description,

      serviesFacilities,
      addSpec,

      open,
      progress,
      files,
      url

      // image,
      // url,
      // progress
    } = this.state;

    const { saveVenueLoader } = this.props;
    return (
      <div>
        <AuthenticatedNavbar />
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
          handleDetailInput={this.handleDetailInput}

          // picked={picked}
          // classicModal={classicModal}
          // handleClickLocOpen={this.handleClickOpen}
          // handleLocClose={this.handleClose}
          // pickedLocation={this.pickedLocation}
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
        />
        <ImageUploader
          open={open}
          progress={progress}
          files={files}
          url={url}
          handleUploadOpen={this.handleUploadOpen}
          handleUploadClose={this.handleUploadClose}
          handleUploadSave={this.handleUploadSave}
          // handelOnSaveAndUpload={this.handelOnSaveAndUpload}
        />

        <PickLocation
          // picked={picked}
          // mapModal={mapModal}
          // handleClickLocOpen={this.handleLocClickOpen}
          // handleLocClose={this.handleLocClose}
          // pickedLocation={this.pickedLocation}

          // // handelOnSaveAndUpload={this.handelOnSaveAndUpload}
          handelOnSaveAndUpload={this.handelOnSaveAndUpload}

          parestSetState={(picked) => this.setState({
            picked
          })}
        />
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
