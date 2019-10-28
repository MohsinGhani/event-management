import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Book from "@material-ui/icons/Payment";
import "./index.css";

import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import "react-toastify/dist/ReactToastify.css";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import PackageModal from "./PackageModal"

class Booking extends Component {
  render() {
    const {
      bookingPrice,
      saveCustomBooking,
      bookingDate,
      handleOnDateChange,
      successNotifiy,
      saveCustomBookingLoader,
      venue,
      user,
      ConfirmModal,
      handleClickCreatePackageOpen,
      handleCreatePackageClose
    } = this.props;
    let totalPrice = 0;
    return (
      <>
        {venue.userId !== user.uid ? (
          <CustomTabs
            headerColor="danger"
            tabs={[
              {
                tabName: "Booking Options",
                tabIcon: Book,
                tabContent: (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <h6>Select Booking Date From Here</h6>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              borderTop: "2px solid #727272",
                              borderBottom: "2px solid #727272"
                            }}
                          >
                            <Flatpickr
                              data-enable-time
                              value={bookingDate}
                              onChange={handleOnDateChange}
                              style={{
                                border: 0,
                                fontStyle: "oblique",
                                textAlign: "center",
                                fontSize: "20px"
                              }}
                            />
                          </div>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <div className="booking">
                        {bookingPrice
                          ? bookingPrice.map(p => {
                              totalPrice += parseInt(p.price);
                              return <li>Rs: {p.price}</li>;
                            })
                          : null}
                        <div
                          className="totalPrice"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: "2px solid #727272",
                            borderBottom: "2px solid #727272",
                            margin: "5px 0px 10px 0px"
                          }}
                        >
                          <div>Total Price: </div>
                          <div>Rs: {totalPrice}</div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            height: "50px"
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={() => {
                              saveCustomBooking();
                              successNotifiy("Booking Successfully Done....!");
                            }}
                          >
                            {saveCustomBookingLoader ? (
                              <ReactLoading
                                type={"spin"}
                                color={"#ffff"}
                                // height={'100px'}
                                // width={'100px'}
                              />
                            ) : (
                              "Book Now"
                            )}
                          </Button>
                        </div>
                      </div>
                    </GridItem>
                  </GridContainer>
                )
              }
            ]}
          />
        ) : (
          <CustomTabs
            headerColor="danger"
            tabs={[
              {
                tabName: "Create Packages",
                tabIcon: Book,
                tabContent: (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <h6>You can Create multiple pacakges from here...!</h6>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          height: "50px"
                        }}
                      >
                        <PackageModal
                          ConfirmModal={ConfirmModal}
                          handleClickCreatePackageOpen={
                            handleClickCreatePackageOpen
                          }
                          handleCreatePackageClose={handleCreatePackageClose}
                        />
                        {/* <Button
                          variant="outlined"
                          color="success"
                          // onClick={() => {

                          // }}
                        >
                          Create Package
                        </Button> */}
                      </div>
                    </GridItem>
                  </GridContainer>
                )
              }
            ]}
          />
        )}
      </>
    );
  }
}

export default withStyles(basicsStyle)(Booking);
