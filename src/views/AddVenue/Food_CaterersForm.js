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
import Grid from "@material-ui/core/Grid";
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

class Food_CaterersForm extends React.Component {
  render() {
    const { classes } = this.props;
    let {
      food_caterersDetails: {
        title,
        price,
        contactNumber,
        address,
        email,
        packages,
        foodItemCheck,
        image,
        url,
        progress
      },
      food_caterersDetailsHandler,
      handleClickOpen,
      handleClose,
      pickedLocation,
      handleToggleOnFoodItemCheck,
      classicModal,
      picked,
      saveVenue,
      saveVenueLoader,
      handleOnFoodUploadFile,
      handleChangeOnFoodUpload
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
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>
                Food and Caterers Details
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Shop Name"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: title,
                      name: "title",
                      onChange: food_caterersDetailsHandler
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
                      onChange: food_caterersDetailsHandler,
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
                    labelText="Address"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: address,
                      name: "address",
                      onChange: food_caterersDetailsHandler,
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
                    labelText="Email"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: email,
                      name: "email",
                      type: "email",
                      onChange: food_caterersDetailsHandler,
                      endAdornment: (
                        <InputAdornment position="end">
                          <i class="material-icons">email</i>
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                  <CustomInput
                    labelText="Price of each Food item"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "price",
                      value: price,
                      onChange: food_caterersDetailsHandler
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
                      onChange={food_caterersDetailsHandler}
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
                        onChange: handleChangeOnFoodUpload
                      }}
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button onClick={handleOnFoodUploadFile}>upload</Button>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    {url.map(source => (
                      <img
                        src={source || "http://via.placeholder.com/75x50"}
                        alt="Uploaded images"
                        height="50"
                        width="75"
                        style={{ marginLeft: "10px" }}
                      />
                    ))}
                  </GridItem>
                </GridItem>
                <GridItem>
                  <div className={classes.title}>
                    <h3>Food Items</h3>
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("Appetizers")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Appetizers"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnFoodItemCheck("Soup")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Soup"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnFoodItemCheck("Salad")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Salad"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck(
                                "TRADITIONAL SI-CHUAN- FOOD"
                              )
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="TRADITIONAL SI-CHUAN- FOOD"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("Sea Food")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Sea Food"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("Beef & lamb")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Beef & lamb"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("Chicken")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Chicken"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggleOnFoodItemCheck("Rice")}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Rice"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("Pasta & Noodle")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Pasta & Noodle"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck(
                                "Pakistani & muglhai food"
                              )
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Pakistani & muglhai food"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("Bar b q")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Bar b q"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck(
                                "Hot & cold beverages"
                              )
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Hot & cold beverages"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("CHICKEN QORMA")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="CHICKEN QORMA"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("PARATHA")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="PARATHA"
                      />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("Deserts")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="Deserts"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("GREEN MASALA")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="GREEN MASALA"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("LAHORI FRIED FISH")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="LAHORI FRIED FISH"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() =>
                              handleToggleOnFoodItemCheck("CHAPLI KABAB")
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.label }}
                        label="CHAPLI KABAB"
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
                          email &&
                          packages &&
                          contactNumber &&
                          price &&
                          address &&
                          foodItemCheck
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

export default withRouter(withStyles(basicsStyle)(Food_CaterersForm));
