import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import Description from "@material-ui/icons/Description";
import Facilaty from "@material-ui/icons/RoomService";
import ImageCarousel from "./ImageCarousel";
import address from "../../../src/assets/icons/address.svg";
import email from "../../../src/assets/icons/email.svg";
import call from "../../../src/assets/icons/call.svg";
import "./index.css";
import Booking from "./Booking";
import MapLocation from "./MapLocation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import Button from "components/CustomButtons/Button.jsx";
import { withRouter } from "react-router-dom";
import Archive from "@material-ui/icons/Archive";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

import RatingSystem from "./RatingSystem";

class Venues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0
    };
  }

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  };
  goto = path => {
    this.props.history.push(path);
  };
  render() {
    const {
      classes,
      venue,
      user,
      bookingPrice,
      handleToggle,
      saveCustomBooking,
      bookingDate,
      handleOnDateChange,
      saveCustomBookingLoader,
      handleDeleteStatus,
      handleArchiveStatus,
      ConfirmModal,
      handleClickCreatePackageOpen,
      handleCreatePackageClose,
      handleChangeEnabled,
      packageCategories,
      packageObj,
      servicePackages,
      handleToggleOnServicePackages,
      discountAmount,
      handleOnChange,
      packagePrice,
      afterDiscountPrice,
      saveCustomPackages,
      packages,
      handleToggleOnService,
      handleToggleOnPackage,
      packageArray,
      bookingItem,
      allBookingItem,
      isBookingButtonDisable,
      saveBooking
    } = this.props;
    // let totalPrice = 0;
    return (
      <div>
        <ImageCarousel venue={venue} />

        {user && venue.userId === user.uid ? (
          <div className="action-button">
            <div className="edit_button">
              <Button
                color="rose"
                round
                onClick={() => this.goto(`/update-venue/${venue.vid}`)}
              >
                <Edit className={classes.icons} />
                Edit
              </Button>
              <Button
                color="danger"
                round
                onClick={() => {
                  handleDeleteStatus();
                }}
              >
                <Delete className={classes.icons} />
                Delete
              </Button>

              <Button
                color="warning"
                round
                onClick={() => {
                  handleArchiveStatus();
                }}
              >
                <Archive className={classes.icons} />
                Archive
              </Button>
            </div>
          </div>
        ) : (
            <span></span>
          )}
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
              <div className={classes.section + " typo_section"}>
                <div className={classes.container}>
                  <div id="typography">
                    <div className={classes.typo + " typo"}>
                      <h2 className={classes.title + " typo-title"}>
                        {venue.name}
                      </h2>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <RatingSystem vid={venue.vid}/>
                      </p>

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
                          venue.serviesFacilities.map((service, index) => (
                            <GridContainer>
                              <GridItem
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={index}
                              >
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
                                        onClick={() => handleToggle(service)}
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

            {packages && packages.length ? (
              <GridContainer style={{ marginRight: 0 }}>
                <CustomTabs
                  headerColor="danger"
                  tabs={
                    packages && packages.length
                      ? packages.map((pack, i) => {
                        let totalPrice = 0;
                        return {
                          tabName: pack.packageObj,
                          tabIcon: Description,
                          tabContent: (
                            <div className={classes.textCenter} key={i}>
                              {pack.servicePackages &&
                                pack.servicePackages.map((service, index) => {
                                  totalPrice += parseInt(service.price);
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                      }}
                                    >
                                      <li>{service.title.toUpperCase()}</li>
                                      Rs: {service.price}
                                    </div>
                                  );
                                })}
                              <div>Total Amout: Rs: {totalPrice}</div>
                              <div>
                                Discount Amount: Rs:
                                  {totalPrice -
                                  (totalPrice / 100) * pack.discountAmount}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end"
                                }}
                              >
                                <Button
                                  onClick={() => handleToggleOnPackage(pack)}
                                >
                                  Add/Remove Package
                                  </Button>
                              </div>
                            </div>
                          )
                        };
                      })
                      : []
                  }
                />
              </GridContainer>
            ) : (
                <span></span>
              )}

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
              {user && <Booking
                venue={venue}
                user={user}
                bookingPrice={bookingPrice}
                saveBooking={saveBooking}
                saveCustomBooking={saveCustomBooking}
                bookingDate={bookingDate}
                handleOnDateChange={handleOnDateChange}
                saveCustomBookingLoader={saveCustomBookingLoader}
                ConfirmModal={ConfirmModal}
                handleClickCreatePackageOpen={handleClickCreatePackageOpen}
                handleCreatePackageClose={handleCreatePackageClose}
                handleChangeEnabled={handleChangeEnabled}
                packageCategories={packageCategories}
                handleToggle={handleToggle}
                packageObj={packageObj}
                servicePackages={servicePackages}
                handleToggleOnService={handleToggleOnService}
                handleToggleOnServicePackages={handleToggleOnServicePackages}
                discountAmount={discountAmount}
                handleOnChange={handleOnChange}
                packagePrice={packagePrice}
                afterDiscountPrice={afterDiscountPrice}
                saveCustomPackages={saveCustomPackages}
                handleToggleOnPackage={handleToggleOnPackage}
                packages={packages}
                packageArray={packageArray}
                bookingItem={bookingItem}
                allBookingItem={allBookingItem}
                isBookingButtonDisable={isBookingButtonDisable}
              />
              }
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
export default withRouter(
  withStyles({ ...basicsStyle, ...typographyStyle })(Venues)
);
