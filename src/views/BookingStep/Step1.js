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
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";
import Summary from './Summary'
import "./index.css";

class Step1 extends Component {
  render() {
    const {
      classes,
      activeStep,
      handleNext,
      handleBack,
      name,
      email,
      handleOnChange,
      contactNumber
    } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader
                  className="card-header"
                  title={"Personal Info:"}
                  subheader={"Custom Contact Basic Information"}
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
                <CardBody className="card-body">
                  <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "name",
                      value: name,
                      type: "text",
                      onChange: handleOnChange,
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
                      name: "email",
                      value: email,
                      type: "email",
                      onChange: handleOnChange,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Contact Number"
                    id="contactNumber"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "contactNumber",
                      value: contactNumber,
                      type: "number",
                      onChange: handleOnChange,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            phone_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Summary />
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
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}
export default withStyles(loginStyle)(Step1);
