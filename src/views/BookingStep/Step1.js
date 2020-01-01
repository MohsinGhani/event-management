import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";

import "./index.css";

class Step1 extends Component {
  render() {
    const { classes, activeStep, handleNext, handleBack } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card
                // style={{
                //   maxWidth: "375px",
                //   padding: "0px 15px",
                //   height: "420px",
                //   position: "relative",
                //   marginLeft: "10px",
                //   marginRight: "10px",
                //   borderRadius: "10px"
                // }}
              >
                <form className={classes.form}>
                  <CardBody>
                    <CustomInput
                      labelText="Name"
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Contact Number"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                </form>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>Booking Details</Card>
            </GridItem>
          </GridContainer>
        </div>
        <div className="button">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            className="back-button"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className="next-button"
          >
            Next Step
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(loginStyle)(Step1);
