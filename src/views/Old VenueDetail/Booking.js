import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Book from "@material-ui/icons/Payment";
import "./index.css";
import CustomTabs from "./node_modules/components/CustomTabs/CustomTabs.jsx.js";
import basicsStyle from "./node_modules/assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx.js";

class Booking extends Component {
  render() {
    const { classes, venue } = this.props;
    return (
      <CustomTabs
        headerColor="danger"
        tabs={[
          {
            tabName: "Booking Options",
            tabIcon: Book
            // tabContent: (
            //   <p className={classes.textCenter}>{venue.packages}</p>
            // )
          }
        ]}
      />
    );
  }
}

export default withStyles(basicsStyle)(Booking);
