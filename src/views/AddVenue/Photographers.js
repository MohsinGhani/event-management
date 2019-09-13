import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import PickLocationModal from "./PickLocationModal";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import ReactLoading from "react-loading";

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

class Photographers extends React.Component {
  render() {
    const { classes } = this.props;
    let {
      photographerDetails: {
        title,
        albumPrice,
        unlimitedAlbumPrice,
        address,
        packages,
        contactNumber,
        photographyType,
        image,
        url,
        progress
      },
      photographerDetailsHandler,
      handleClickOpen,
      handleClose,
      pickedLocation,
      handleToggleOnPhotographyType,
      classicModal,
      picked,
      saveVenue,
      saveVenueLoader,
      handleChangeOnPhotograherUpload,
      handleOnPhotograhUploadFile
    } = this.props;
    return (
      <div>
        <br />
        <GridContainer
          style={{ padding: "0", maxWidth: "1024px", margin: "0 auto" }}
        >
          {/* {saveVenueSuccess && (
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
          )} */}
          <Card style={{ padding: "15px", margin: 0 }}>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Photographers Details</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Shop / Office Name"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: title,
                      name: "title",
                      onChange: photographerDetailsHandler
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
                      onChange: photographerDetailsHandler,
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
                    labelText="Venue Address"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: address,
                      name: "address",
                      onChange: photographerDetailsHandler,
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
                    labelText="Album Price"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "albumPrice",
                      value: albumPrice,
                      onChange: photographerDetailsHandler
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Unlimited Album Price"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "unlimitedAlbumPrice",
                      value: unlimitedAlbumPrice,
                      onChange: photographerDetailsHandler
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
                      onChange={photographerDetailsHandler}
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
                        onChange: handleChangeOnPhotograherUpload
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    <Button onClick={handleOnPhotograhUploadFile}>
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
                    <h3>Photography Type</h3>
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
                    style={{
                      display: "flex",
                      paddingRight: "10px",
                      marginRight: "20px"
                    }}
                  >
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <Tooltip
                        id="tooltip-top"
                        title="Digital photography is ideal for when you need instant photos - it is quick, simple and easy. It is especially useful for photos that will be displayed on digital platforms such as Instagram or Facebook for guest to view on the same day. Digital photography can be processed just days after your wedding and the shots can be adjusted accordingly."
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() =>
                                handleToggleOnPhotographyType("Digital")
                              }
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{ checked: classes.checked }}
                            />
                          }
                          classes={{ label: classes.label }}
                          label="Digital"
                        />
                      </Tooltip>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnPhotographyType("Traditional")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Traditional"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnPhotographyType("Artistic")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Artistic"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnPhotographyType("Documentary")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Documentary"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnPhotographyType("Illustrative")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Illustrative "
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnPhotographyType("Destination")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Destination"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnPhotographyType("Light and Airy")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Light and Airy"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnPhotographyType("Drone")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Drone"
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
                          albumPrice &&
                          photographyType &&
                          packages &&
                          contactNumber &&
                          address &&
                          unlimitedAlbumPrice
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

export default withRouter(withStyles(basicsStyle)(Photographers));
