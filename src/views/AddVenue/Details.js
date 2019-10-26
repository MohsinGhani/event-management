import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Call from "@material-ui/icons/Call";
import Address from "@material-ui/icons/LocationCity";
import Booking from "@material-ui/icons/Book";

// core components
import Card from "components/Card/Card";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

class Details extends Component {
  render() {
    const { classes } = this.props;
    let {
      name,
      phone,
      email,
      address,
      description,
      bookingPerDay,
      handleDetailInput,
      error
    } = this.props;
    return (
      <div>
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
                      value: name,
                      type: "text",
                      onChange: handleDetailInput,

                      endAdornment: (
                        <InputAdornment position="end">
                          <People />
                        </InputAdornment>
                      )
                    }}
                  />
                  {error.name && error.name.length > 0 && (
                    <span className="error">{error.name}</span>
                  )}
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
                      value: phone,
                      type: "number",
                      onChange: handleDetailInput,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Call />
                        </InputAdornment>
                      )
                    }}
                  />
                  {error.phone && error.phone.length > 0 && (
                    <span className="error">{error.phone}</span>
                  )}
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
                      value: email,
                      type: "email",
                      onChange: handleDetailInput,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email />
                        </InputAdornment>
                      )
                    }}
                  />
                  {error.email && error.email.length > 0 && (
                    <span className="error">{error.email}</span>
                  )}
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
                      value: address,
                      type: "text",
                      onChange: handleDetailInput,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Address />
                        </InputAdornment>
                      )
                    }}
                  />
                  {error.address && error.address.length > 0 && (
                    <span className="error">{error.address}</span>
                  )}
                </GridItem>
                <GridItem xs={12} sm={2} md={2} lg={6}>
                  <TextField
                    id="standard-textarea"
                    label="Description"
                    multiline
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleDetailInput}
                    margin="normal"
                    fullWidth
                    style={{ marginTop: "10px" }}
                  />
                  {error.description && error.description.length > 0 && (
                    <span className="error">{error.description}</span>
                  )}
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
                      value: bookingPerDay,
                      type: "number",
                      onChange: handleDetailInput,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Booking />
                        </InputAdornment>
                      )
                    }}
                  />
                  {error.bookingPerDay && error.bookingPerDay.length > 0 && (
                    <span className="error">{error.bookingPerDay}</span>
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(basicsStyle)(Details);
