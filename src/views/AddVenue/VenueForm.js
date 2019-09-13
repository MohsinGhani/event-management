import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import PickLocationModal from "./PickLocationModal";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import ReactLoading from "react-loading";
import notificationsStyles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles.jsx";
import storage from "../../firebase/FireBase";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class VenueForm extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   image: null,
    //   url: "",
    //   progress: 0
    // };
  }

  // handleOnChange = e => {
  //   if (e.target.files[0]) {
  //     const image = e.target.files[0];
  //     this.setState({
  //       image
  //     });
  //   }
  //   // this.setState({
  //   //   [e.target.name]:e.target.value
  //   // })
  // };

  // handleUpload = () => {
  //   const { image } = this.state;
  //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //   uploadTask.on(
  //     "state_changed",
  //     snapshot => {
  //       // progrss function ....
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       console.log('Upload is ' + progress + '% done');
  //       this.setState({ progress });
  //     },
  //     error => {
  //       // error function ....
  //       console.log(error);
  //     },

  //     () => {
  //       // complete function ....
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then(url => {
  //           console.log(url);
  //           this.setState({ url });
  //         });
  //     }
  //   );
  // };
  // componentDidUpdate(prevProps) {
  //   // if(prevProps.temp !== this.props.temp){
  //   //   this.props = this.props
  //   // }
  // }
  render() {
    const { classes } = this.props;
    let {
      venueDetails: {
        title,
        perHead,
        packages,
        contactNumber,
        lenght,
        width,
        capacity,
        address,
        serviceChecked,
        eventTypeCheck,
        image,
        url,
        progress
      },
      venueDetailHandler,
      handleClickOpen,
      handleClose,
      pickedLocation,
      handleToggleOnService,
      handleToggleOnEventType,
      classicModal,
      picked,
      saveVenue,
      saveVenueLoader,
      createNotification,
      handleChangeOnVenueUpload,
      handleOnVenueUploadFile
      // image,
      // progress,
      // url
    } = this.props;

    return (
      <div>
        <br />
        {saveVenueLoader ? (
          <SnackbarContent
            message={
              <span>
                <b>SUCCESS ALERT:</b> You've got some friends nearby, stop
                looking at your phone and find them...
              </span>
            }
            close
            color="success"
            icon={Check}
          />
        ) : null}
        <GridContainer
          style={{ padding: "0", maxWidth: "1024px", margin: "0 auto" }}
        >
          <Card style={{ padding: "15px", margin: 0 }}>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Venue Details</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Venue Title"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: title,
                      name: "title",
                      onChange: venueDetailHandler
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Contact Number"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "tel",
                      name: "contactNumber",
                      value: contactNumber,
                      pattern: "[0-9]{4}-[0-9]{4}",
                      onChange: venueDetailHandler,
                      endAdornment: (
                        <InputAdornment position="end">
                          <i class="material-icons">call</i>
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Venue Capacity"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "capacity",
                      value: capacity,
                      onChange: venueDetailHandler,
                      endAdornment: (
                        <InputAdornment position="end">
                          <i class="material-icons">people</i>
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Venue Address"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: address,
                      name: "address",
                      onChange: venueDetailHandler,
                      endAdornment: (
                        <InputAdornment position="end">
                          <i class="material-icons">location_on</i>
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Venue Length"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "lenght",
                      value: lenght,
                      onChange: venueDetailHandler
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Venue Width"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "width",
                      value: width,
                      onChange: venueDetailHandler
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Per-Head Price"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "perHead",
                      value: perHead,
                      onChange: venueDetailHandler
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <FormControl
                    style={{ marginTop: "8px", display: "flex" }}
                    fullWidth
                  >
                    <InputLabel htmlFor="age-simple">Packages</InputLabel>
                    <Select
                      value={packages}
                      onChange={venueDetailHandler}
                      inputProps={{
                        name: "packages",
                        id: "age-simple"
                      }}
                    >
                      <MenuItem value={"Platinum"}>Platinum</MenuItem>
                      <MenuItem value={"Gold"}>Gold</MenuItem>
                      <MenuItem value={"Sliver"}>Sliver</MenuItem>
                      <MenuItem value={"Bronz"}>Bronz</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    <progress value={progress} max="100" />
                  </GridItem>
                  {/* <input
                    type="file"
                    multiple
                    onChange={handleOnChange}
                  />
                  <Button onClick={handleOnUploadFile}>upload</Button>
                  <img
                    scr={url || "http://via.placeholder.com/400x300"}
                    alt="Uploaded images"
                    height="300"
                    width="400"
                  /> */}
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    <CustomInput
                      // labelText="Pictures of venue"
                      id="float"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "file",
                        // name: "image",
                        // value: image,
                        onChange: handleChangeOnVenueUpload
                      }}
                    />
                    {/* <input
                      type="file"
                      multiple
                      onChange={e => {
                        handleChangeOnVenueUpload(e);
                      }}
                    /> */}
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    <Button onClick={handleOnVenueUploadFile}>
                      upload
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    {url.map(source => (
                      <img
                        src={source || "http://via.placeholder.com/75x50"}
                        alt="Uploaded images"
                        height="50"
                        width="75"
                        justifyContent="space-between"
                      />
                    ))}
                  </GridItem>
                </GridItem>
                <GridItem>
                  <div className={classes.title}>
                    <h3>Event Type</h3>
                  </div>
                  <Grid
                    container
                    direction="row"
                    justify="space-between  "
                    alignItems="flex-start"
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                    style={{ display: "flex", paddingRight: "10px" }}
                  >
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnEventType("Wedding")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Weddings"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnEventType("Mendhi")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Mendhi"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnEventType("Engagmnet")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Engagment"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnEventType("Valima")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Valima"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnEventType("Meetings")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Meetings"
                      />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnEventType("Conferences")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Conferences"
                      />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnEventType("Casual Parties")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Casual Parties"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnEventType("Birthday Parties")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Birthday Parties"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnEventType("Naat Kawani")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Naat khwani"
                      />
                    </GridItem>
                  </Grid>
                </GridItem>
                <GridItem>
                  <div className={classes.title}>
                    <h3>Services</h3>
                  </div>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                    style={{ display: "flex", paddingRight: "10px" }}
                  >
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnService("Food")}
                            // onChange={()=>handleToggle("Food")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Food"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnService("Refreshments")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Refreshments"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnService("DJ / Musics")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="DJ / Musics"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnService("valet Parking")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="valet Parking"
                      />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnService("WiFi")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="WiFi"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnService("Projector")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Projector"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnService("Ramp Walk")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Ramp Walk"
                      />
                    </GridItem>
                  </Grid>
                </GridItem>

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
                      onClick={() => handleClickOpen("classicModal")}
                    >
                      <i class="material-icons">add_location</i> Pick Your Venue
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
                            onClick={() => pickedLocation(null)}
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
                            onClick={() => pickedLocation(null)}
                          >
                            <i class="material-icons">close</i>
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                )}

                {
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      color="success"
                      disabled={
                        !(
                          title &&
                          perHead &&
                          // image &&
                          packages &&
                          contactNumber &&
                          lenght &&
                          width &&
                          capacity &&
                          address &&
                          serviceChecked &&
                          eventTypeCheck
                        )
                      }
                      onClick={() => {
                        saveVenue();
                      }}
                    >
                      <i class="material-icons">save_alt</i> Save{" "}
                      {saveVenueLoader ? (
                        <ReactLoading
                          type={"bars"}
                          color={"#3f51b5"}
                          height={"30px"}
                          width={"50px"}
                        />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </GridItem>
                }
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>

        <PickLocationModal
          classicModal={classicModal}
          handleClose={handleClose}
          pickedLocation={pickedLocation}
        />
      </div>
    );
  }
}

export default withRouter(
  withStyles({ ...basicsStyle, ...notificationsStyles })(VenueForm)
);
