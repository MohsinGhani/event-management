import React, { Component } from "react";
// plugin that creates slider
import nouislider from "nouislider";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Switch from "@material-ui/core/Switch";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import "./index.css";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

class PackageRadioButton extends Component {
  render() {
    const { classes, packageCategories, handleChangeEnabled } = this.props;
    return (
      <div className="radio_button">
        {packageCategories.map((packageCategory, index) => (
          <GridItem xs={12} sm={6} md={4} lg={3}>
            <div
              className={
                classes.checkboxAndRadio +
                " " +
                classes.checkboxAndRadioHorizontal
              }
            >
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={packageCategory === packageCategory.title}
                    onChange={handleChangeEnabled}
                    value={packageCategory.title}
                    name="packageCategory"
                    aria-label="A"
                    icon={
                      <FiberManualRecord className={classes.radioUnchecked} />
                    }
                    checkedIcon={
                      <FiberManualRecord className={classes.radioChecked} />
                    }
                    classes={{
                      checked: classes.radio
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label={`${packageCategory.title}`}
              />
            </div>
          </GridItem>
        ))}
      </div>
    );
  }
}

export default withStyles(basicsStyle)(PackageRadioButton);
