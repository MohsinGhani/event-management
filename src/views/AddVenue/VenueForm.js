import React, { Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { authAction, venueAction } from "./../../store/actions";
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
  componentDidUpdate(prevProps) {
    // if(prevProps.temp !== this.props.temp){
    //   this.props = this.props
    // }
  }
  render() {
    const { classes } = this.props;
    let {
      venueDetails: {
        title,
        perHead,
        file,
        packages,
        contactNumber,
        checked,
        lenght,
        width,
        price,
        capacity,
        address,
        classicModal,
        picked,
        eventType,
        saveVenueLoader,
        saveVenueSuccess
      },
      venueDetailHandler
    } = this.props;
    return (
      <div>
        <br />
        <GridContainer
          style={{ padding: "0", maxWidth: "1024px", margin: "0 auto" }}
        >
          {saveVenueSuccess && (
            <SnackbarContent
              message={
                <span>
                  <b>Congratulation!:</b> You have successfully added your Venue
                  in our System...
                </span>
              }
              close
              color="success"
              icon={Check}
            />
          )}
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
                      type: "number",
                      name: "contactNumber",
                      value: contactNumber,
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
                      <MenuItem value={10}>Platinum</MenuItem>
                      <MenuItem value={20}>Gold</MenuItem>
                      <MenuItem value={30}>Sliver</MenuItem>
                      <MenuItem value={40}>Bronz</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    // labelText="Pictures of venue"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "file",
                      name: "file",
                      value: file,
                      onChange: venueDetailHandler
                    }}
                  />
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                            onClick={() => this.handleToggle(21)}
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
                      onClick={() => this.handleClickOpen("classicModal")}
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
                        !(title && price && address && capacity && picked) ||
                        saveVenueLoader
                      }
                      onClick={this.saveVenue}
                    >
                      <i class="material-icons">save_alt</i> Save{" "}
                      {saveVenueLoader ? "..." : ""}
                    </Button>
                  </GridItem>
                }
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>

        <PickLocationModal
          classicModal={classicModal}
          handleClose={this.handleClose}
          pickedLocation={this.pickedLocation}
        />
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
)(withRouter(withStyles(basicsStyle)(VenueForm)));
