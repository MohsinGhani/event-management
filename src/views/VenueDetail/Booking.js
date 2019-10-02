import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Book from "@material-ui/icons/Payment";
import "./index.css";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { Button } from "@material-ui/core";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Booking extends Component {
  // state = {
  //   startDate: new Date()
  // };

  // handleChange = date => {
  //   this.setState({
  //     startDate: date
  //   });
  // };
  render() {
    const {
      classes,
      venue,
      bookingPrice,
      saveCustomBooking,
      bookingDate,
      handleOnDateChange
    } = this.props;
    let totalPrice = 0;
    return (
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
                    <GridItem xs={12} sm={12} md={6}>
                      {/* <InputLabel className={classes.label}>
                        Datetime Picker
                      </InputLabel>
                    <br />
                    <FormControl fullWidth>
                      <Datetime
                        inputProps={{ placeholder: "Datetime Picker Here" }}
                      />
                    </FormControl> */}
                      <DatePicker
                        selected={bookingDate}
                        onChange={handleOnDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
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
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={saveCustomBooking}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            )
          }
        ]}
      />
    );
  }
}

export default withStyles(basicsStyle)(Booking);
