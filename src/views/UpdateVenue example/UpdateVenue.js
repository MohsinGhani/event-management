import React, { Component } from "react";
import { venueAction } from "./../../store/actions";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Call from "@material-ui/icons/Call";
import Address from "@material-ui/icons/LocationCity";
import Booking from "@material-ui/icons/Book";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import star from "../../../src/assets/icons/star.svg";
// core components
import Card from "components/Card/Card";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class UpdateVenue extends Component {
  componentDidMount() {
    const { vid } = this.props.match.params;
    this.props.getVenue(vid);
  }
  render() {
    const { classes, venue } = this.props;
    console.log("venue: ", venue);
    return (
      <div>
        <AuthenticatedNavbar  navBgColor={'rose'}/>
        {venue ? (
          <GridContainer
            style={{ padding: "0", maxWidth: "1024px", margin: "0 auto" }}
          >
            <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Details</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={2} md={2} lg={6}>
                    <CustomInput
                      labelText="Name"
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "name",
                        value: venue.name,
                        type: "text",
                        // onChange: handleDetailInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={6}>
                    <CustomInput
                      labelText="Phone"
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "phone",
                        value: venue.phone,
                        type: "number",
                        // onChange: handleDetailInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Call />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={6}>
                    <CustomInput
                      labelText="Email"
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "email",
                        value: venue.email,
                        type: "email",
                        // onChange: handleDetailInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={6}>
                    <CustomInput
                      labelText="Address"
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "address",
                        value: venue.address,
                        type: "text",
                        // onChange: handleDetailInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Address />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={6}>
                    <TextField
                      id="standard-textarea"
                      label="Description"
                      multiline
                      type="text"
                      name="description"
                      value={venue.description}
                      // onChange={handleDetailInput}
                      margin="normal"
                      fullWidth
                      style={{ marginTop: "10px" }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={6}>
                    <CustomInput
                      labelText="Booking Per Day"
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "bookingPerDay",
                        value: venue.bookingPerDay,
                        type: "number",
                        // onChange: handleDetailInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Booking />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
            <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Facilities</h4>
              </CardHeader>
              <CardBody>
                <div>
                  {venue.serviesFacilities.map((ser, i) => {
                    return (
                      <GridContainer key={i} style={{ display: "flex" }}>
                        <GridItem xs={12} sm={1} md={1} lg={1}>
                          <img
                            src={star}
                            alt={"star"}
                            width="20px"
                            height="20px"
                          />
                        </GridItem>

                        <GridItem xs={12} sm={2} md={2} lg={2}>
                          {ser.title}
                        </GridItem>
                        <GridItem xs={12} sm={2} md={2} lg={2}>
                          Rs: {ser.price}
                        </GridItem>
                      </GridContainer>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    color="primary"
                    block
                    // onClick={() => handleClickOpen("classicModal")}
                  >
                    <LibraryBooks className={classes.icon} />
                    Add Services
                  </Button>

                  <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modal
                    }}
                    // open={classicModal}
                    TransitionComponent={Transition}
                    keepMounted
                    // onClose={() => handleClose("classicModal")}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                  >
                    <DialogTitle
                      id="classic-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                    >
                      <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        // onClick={() => handleClose("classicModal")}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                      <h4 className={classes.modalTitle}>Add Your Services</h4>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
                      {venue.serviesFacilities.map((ser, index) => {
                        return (
                          <div
                            style={{
                              display: "flex"
                            }}
                            key={index}
                          >
                            <TextField
                              id="standard-name"
                              label="Title"
                              className={classes.textField}
                              name="title"
                              value={ser.name}
                              // onChange={event => {
                              //   handleChangeOnServiceFacilites(event, index);
                              // }}
                              margin="normal"
                              style={{ marginRight: "5px" }}
                            />

                            <TextField
                              id="standard-name"
                              label="Price"
                              name="price"
                              className={classes.textField}
                              value={ser.price}
                              // onChange={event => {
                              //   handleChangeOnServiceFacilites(event, index);
                              // }}
                              margin="normal"
                            />

                            <IconButton
                              aria-label="delete"
                              className={classes.margin}
                              // onClick={event =>
                              //   handlerServicesFieldDelete(event, index)
                              // }
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </div>
                        );
                      })}
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                      <Button
                        color="transparent"
                        simple
                        // onClick={event => {
                        //   handlerServicesFieldAdd(event);
                        // }}
                      >
                        Add Services
                      </Button>
                      <Button
                        // onClick={() => handleClose("classicModal")}
                        color="danger"
                        simple
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </CardBody>
            </Card>
            <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Pictures</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={2} md={2} lg={6}>
                    {venue.url.map((url, i) => {
                      return <img src={url} alt="pic" />;
                    })}
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
            <Card style={{ padding: "15px", margin: 0, marginTop: "20px" }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Location</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={2} md={2} lg={6}>
                    <GridContainer>
                      <GridItem xs={12} sm={2} md={2} lg={6}>
                        <CustomInput
                          labelText="Name"
                          id="material"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "name",
                            value: venue.location.latitude,
                            type: "text",
                            // onChange: handleDetailInput,
                            endAdornment: (
                              <InputAdornment position="end">
                                <People />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2} md={2} lg={6}>
                        <CustomInput
                          labelText="Name"
                          id="material"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "name",
                            value: venue.location.longitude,
                            type: "text",
                            // onChange: handleDetailInput,
                            endAdornment: (
                              <InputAdornment position="end">
                                <People />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridContainer>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    venueReducer: { venue, getVenueLoader, getVenueError }
  } = state;
  return {
    venue,
    getVenueLoader,
    getVenueError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVenue: vid => dispatch(venueAction.getVenue(vid))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(basicsStyle)(UpdateVenue));
