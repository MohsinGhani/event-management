import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import checked from "../../../src/assets/icons/checked.svg";
import Tag from "@material-ui/icons/LocalOffer";
import Description from "@material-ui/icons/Description";
import Facilaty from "@material-ui/icons/RoomService";
import ImageCarousel from "./ImageCarousel";
import address from "../../../src/assets/icons/address.svg";
import email from "../../../src/assets/icons/email.svg";
import call from "../../../src/assets/icons/call.svg";
// import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
// import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import "./index.css";
// import GlobleVariables from "./GlobleVariables";
import Booking from "./Booking";
import MapLocation from "./MapLocation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

class Venues extends Component {
  render() {
    const {
      classes,
      venue,
      bookingPrice,
      handleToggle,
      saveCustomBooking,
      bookingDate,
      handleOnDateChange
    } = this.props;
    return (
      <div>
        <ImageCarousel venue={venue} />

        <GridContainer
          className={classes.section}
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          <GridItem xs={12} sm={12} md={9} lg={9}>
            <GridContainer>
              {/* <GlobleVariables venue={venue} /> */}

              <div className={classes.section + " typo_section"}>
                <div className={classes.container}>
                  <div id="typography">
                    <div className={classes.typo + " typo"}>
                      <h2 className={classes.title + " typo-title"}>
                        {venue.name}
                      </h2>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={call}
                          alt="icon"
                          width="30px"
                          height="30px"
                          style={{ paddingRight: "5px" }}
                        />
                        {venue.phone}
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={email}
                          alt="icon"
                          width="30px"
                          height="30px"
                          style={{ paddingRight: "5px" }}
                        />
                        {venue.email}
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <img
                          // src={require('path')}'
                          className="text"
                          src={address}
                          alt="icon"
                          width="30px"
                          height="30px"
                          style={{ paddingRight: "5px" }}
                        />
                        {venue.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={9} md={9} lg={9}>
            <GridContainer style={{ marginRight: 0 }}>
              {/* <div className={classes.container}>
                <div id="nav-tabs"> */}

              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Facilaties",
                    tabIcon: Facilaty,

                    tabContent: (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                      >
                        {venue.serviesFacilities &&
                          venue.serviesFacilities.map(service => (
                            <GridContainer>
                              <GridItem xs={12} sm={6} md={4} lg={3}>
                                <div
                                  className={
                                    classes.checkboxAndRadio +
                                    " " +
                                    classes.checkboxAndRadioHorizontal
                                  }
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        tabIndex={-1}
                                        // onChange={this.handleToggle}
                                        onClick={() => handleToggle(service)}
                                        // name={`${services.price}`}
                                        checkedIcon={
                                          <Check
                                            className={classes.checkedIcon}
                                          />
                                        }
                                        icon={
                                          <Check
                                            className={classes.uncheckedIcon}
                                          />
                                        }
                                        classes={{ checked: classes.checked }}
                                      />
                                    }
                                    classes={{ label: classes.label }}
                                    label={`${service.title} ${service.price}`}
                                  />
                                  {/* // ></FormControlLabel>
                                  // <span>{services.title}</span>
                                  // <span>{services.price}</span> */}
                                </div>
                              </GridItem>
                            </GridContainer>
                          ))}
                      </Grid>
                    )
                  }
                ]}
              />
            </GridContainer>

            <GridContainer style={{ marginRight: 0 }}>
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Description",
                    tabIcon: Description,
                    tabContent: (
                      <p className={classes.textCenter}>{venue.description}</p>
                    )
                  }
                ]}
              />
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3}>
            <GridContainer>
              <Booking
                venue={venue}
                bookingPrice={bookingPrice}
                saveCustomBooking={saveCustomBooking}
                bookingDate={bookingDate}
                handleOnDateChange={handleOnDateChange}
              />
            </GridContainer>
            <GridContainer
              style={{ display: "flex", justifyContent: "center" }}
            >
              <MapLocation location={venue.location} />
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles({ ...basicsStyle, ...typographyStyle })(Venues);

{
  /* <GridItem
                              xs={12}
                              sm={12}
                              md={4}
                              lg={4}
                              style={{
                                display: "flex",
                                justifyContent: "space-between"
                              }}
                            >
                              <img
                                src={checked}
                                alt="icon"
                                width="20px"
                                height="20px"
                                style={{ paddingRight: "5px" }}
                              />
                              <span title={services.title}>
                                {services.title}
                              </span>

                              <span title={services.price}>
                                Rs: {services.price}
                              </span>
                            </GridItem> */
}
