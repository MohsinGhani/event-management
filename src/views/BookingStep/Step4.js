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
// import CardHeader from "components/Card/CardHeader.jsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";

import "./index.css";

class Step4 extends Component {
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
                <CardHeader
                  className="card-header"
                  title={"Review:"}
                  subheader={"Thank You getting"}
                  titleTypographyProps={{
                    style: {
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#00000"
                    }
                  }}
                  subheaderTypographyProps={{
                    style: {
                      fontSize: "1rem",
                      color: "#283238",
                      paddingTop: "5px"
                    }
                  }}
                />
                {/* <CardBody>
                <CustomInput
                  labelText="Country"
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
                  labelText="State"
                  id="second"
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
                  labelText="City"
                  id="third"
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
                  labelText="Address"
                  id="forth"
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
              </CardBody> */}
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}
export default withStyles(loginStyle)(Step4);
