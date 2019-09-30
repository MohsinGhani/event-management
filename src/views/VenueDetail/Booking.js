import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Book from "@material-ui/icons/Payment";
import "./index.css";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import { Button } from "@material-ui/core";

class Booking extends Component {
  render() {
    const { classes, venue, bookingPrice } = this.props;
    return (
      <CustomTabs
        headerColor="danger"
        tabs={[
          {
            tabName: "Booking Options",
            tabIcon: Book,
            tabContent: (
              <div className="booking">
                {bookingPrice ? bookingPrice.map(prices => (
                  <li>Rs: {prices.price}</li>
                )) : null}
                {/* <p className={classes.textCenter}>Rs: {bookingPrice}</p> */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="outlined" color="primary">
                    Book Now
                  </Button>
                </div>
              </div>
            )
          }
        ]}
      />
    );
  }
}

export default withStyles(basicsStyle)(Booking);
