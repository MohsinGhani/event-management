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
import PackageModal from "./PackageModal";

class Booking extends Component {
  state = {
    disableDates: []
  };

  makeDateFormate = items => {
    
    return items.map(item => {
      return makeFormate(item.bookingDate);
    });

    function makeFormate(date) {
      
      return (
        new Date(date).getFullYear() +
        "-" +
        (new Date(date).getMonth() + 1) +
        "-" +
        new Date(date).getDate()
      );
    }
  };

  componentDidMount() {
    const { bookingItem } = this.props;
    
    if (bookingItem && bookingItem.length) {
      const newData = this.makeDateFormate(bookingItem);
      this.setState({
        disableDates: newData
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { bookingItem } = this.props;
    
    if (bookingItem && bookingItem !== prevProps.bookingItem) {
      const newData = this.makeDateFormate(bookingItem);
      this.setState({
        disableDates: newData
      });
    }
  }

  render() {
    const {
      bookingPrice,
      saveCustomBooking,
      bookingDate,
      handleOnDateChange,
      saveCustomBookingLoader,
      venue,
      user,
      ConfirmModal,
      handleClickCreatePackageOpen,
      handleCreatePackageClose,
      handleChangeEnabled,
      packageCategories,
      handleToggle,
      packageObj,
      servicePackages,
      handleToggleOnServicePackages,
      discountAmount,
      handleOnChange,
      // packagePrice,
      afterDiscountPrice,
      saveCustomPackages,
      handleToggleOnPackage,
      packages,
      packageArray,
      bookingItem,
      allBookingItem,
      isBookingButtonDisable
    } = this.props;
    let totalPrice = 0;
    let packagePrice = 0;

    console.log("bookingItem: ", bookingItem);
    const { disableDates } = this.state;
    // let card = packageArray
    //   ? packageArray.map(p => {
    //       
    //       p.servicePackages.map(s => {
    //         
    //         packagePrice += (parseInt(s.price) / 100) * p.discountAmount;
    //         
    //         return <li>{s.price}</li>;
    //       });
    //     })
    //   : null;
    // console.log(card);
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
                              options={{
                                disable: [...disableDates]
                              }}
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
                        <div className="custom-booking">
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
                            <div>
                              <div>Total Price: </div>
                              <div>Rs: {totalPrice}</div>
                            </div>
                          </div>
                        </div>

                        <div className="package-booking">
                          {packageArray
                            ? packageArray.map(pack => {
                                
                                return (
                                  <div>
                                    <li>{pack.packageObj}</li>
                                    {pack.servicePackages.map(service => {
                                      packagePrice += parseInt(service.price);
                                    })}
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
                                      Package Price: Rs:{" "}
                                      {packagePrice -
                                        (packagePrice / 100) *
                                          pack.discountAmount}
                                    </div>
                                  </div>
                                );
                              })
                            : null}
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
                            disabled={isBookingButtonDisable}
                            onClick={() => {
                              saveCustomBooking();
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
                          venue={venue}
                          ConfirmModal={ConfirmModal}
                          handleClickCreatePackageOpen={
                            handleClickCreatePackageOpen
                          }
                          handleCreatePackageClose={handleCreatePackageClose}
                          handleChangeEnabled={handleChangeEnabled}
                          packageCategories={packageCategories}
                          handleToggle={handleToggle}
                          packageObj={packageObj}
                          servicePackages={servicePackages}
                          handleToggleOnServicePackages={
                            handleToggleOnServicePackages
                          }
                          discountAmount={discountAmount}
                          handleOnChange={handleOnChange}
                          packagePrice={packagePrice}
                          afterDiscountPrice={afterDiscountPrice}
                          saveCustomPackages={saveCustomPackages}
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
