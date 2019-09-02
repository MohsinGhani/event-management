import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

class DropDown extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <ListItem className={classes.listItem}>
                <CustomDropdown
                  buttonText="Dropdown"
                  dropdownHeader="Dropdown Header"
                  buttonProps={{
                    className: classes.navLink,
                    color: "transparent"
                  }}
                  dropdownList={[
                    "Action",
                    "Another action",
                    "Something else here",
                    { divider: true },
                    "Separated link",
                    { divider: true },
                    "One more separated link"
                  ]}
                />
              </ListItem>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(navbarsStyle)(DropDown);
