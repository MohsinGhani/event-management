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
    let totalPrice = 0
    return (
      <CustomTabs
        headerColor="danger"
        tabs={[
          {
            tabName: "Booking Options",
            tabIcon: Book,
            tabContent: (
              <div className="booking">
                {bookingPrice
                  ? bookingPrice.map(prices => {
                      totalPrice += parseInt(prices.price);
                      return <li>Rs: {prices.price}</li>;
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
