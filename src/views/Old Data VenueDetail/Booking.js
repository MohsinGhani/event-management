import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Book from "@material-ui/icons/Payment";
import "./index.css";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

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
