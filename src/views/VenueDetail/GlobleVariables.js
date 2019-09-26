import React, { Component } from "react";
import "./index.css";
import withStyles from "@material-ui/core/styles/withStyles";
import address from "../../../src/assets/icons/address.svg";
import email from "../../../src/assets/icons/email.svg";
import call from "../../../src/assets/icons/call.svg";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";

class GlobleVariables extends Component {
  render() {
    const { classes, venue } = this.props;
    return (
      <div className={classes.section + " typo_section"}>
        <div className={classes.container}>
          <div id="typography">
            <div className={classes.typo + " typo"}>
              <h2 className={classes.title + " typo-title"}>{venue.name}</h2>
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
    );
  }
}

export default withStyles({ ...basicsStyle, ...typographyStyle })(
  GlobleVariables
);
