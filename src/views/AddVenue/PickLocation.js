import React, { Component } from "react";
import PickLocationModal from "./PickLocationModal";
import Card from "components/Card/Card";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ReactLoading from "react-loading";
import InputAdornment from "@material-ui/core/InputAdornment";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PickLocation extends Component {
  state = {
    mapModal: false,
    picked: null
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

  pickedLocation = picked => {
    this.setState(
      {
        picked
      },
      this.handleLocClose("mapModal")
    );
    this.props.parestSetState(picked);
  };

  render() {
    let {
      //   mapModal,
      //   handleClickLocOpen,
      //   handleLocClose,
      //   pickedLocation,
      //   picked
      // disable,
      saveVenueLoader,
      successNotifiy,
      classes,
      handelOnSaveAndUpload
    } = this.props;
    const { mapModal, picked } = this.state;
    return (
      <div>
        <GridContainer
          style={{
            padding: "0",
            maxWidth: "1024px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Pick Your Location</h4>
            </CardHeader>
            <CardBody style={{ display: "flex" }}>
              {!picked && (
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    color="primary"
                    round
                    size="sm"
                    onClick={() => this.handleClickLocOpen("mapModal")}
                  >
                    <i class="material-icons">add_location</i> Pick Your
                    Location
                  </Button>
                </GridItem>
              )}
              {picked && (
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Picked Longitude"
                    id="regular"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: picked.longitude,
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={() => this.pickedLocation(null)}
                        >
                          <i class="material-icons">close</i>
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>
              )}
              {picked && (
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Picked Latitude"
                    id="regular"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: picked.latitude,
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={() => this.pickedLocation(null)}
                        >
                          <i class="material-icons">close</i>
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>
              )}
            </CardBody>
          </Card>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              height: "50px"
            }}
          >
            {" "}
            <Button
              // disabled={disable}
              variant="outlined"
              color="success"
              onClick={() => {
                handelOnSaveAndUpload();
                successNotifiy("Form Successfully Submited...!");
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
            </Button>
          </div>

          <PickLocationModal
            mapModal={mapModal}
            handleLocClose={this.handleLocClose}
            pickedLocation={this.pickedLocation}
          />
        </GridContainer>
      </div>
    );
  }
}
export default withStyles({ ...basicsStyle, ...javascriptStyles })(
  PickLocation
);
