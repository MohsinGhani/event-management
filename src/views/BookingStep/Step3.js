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

import ReactStripeScriptLoader from "react-stripe-script-loader";
import { StripeProvider, Elements, CardElement } from "react-stripe-elements";

import PaymentInfo from "./PaymentInfo"

import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";

import "./index.css";

class Step3 extends Component {
  render() {
    const {
      classes,
      activeStep,
      handleNext,
      handleBack,
      perHead,
      handleOnChange
    } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader
                  className="card-header"
                  title={"Payment Info:"}
                  subheader={"Payment Information"}
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
                <CardBody>
                  <CustomInput
                    labelText="Per-Head"
                    id="perHead"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "perHead",
                      value: perHead,
                      // onChange: handleOnChange,
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />

               {/* <ReactStripeScriptLoader
                    uniqueId="myUniqueId"
                    script="https://js.stripe.com/v3/"
                    loader="Loading..."
                  >
                    <StripeProvider apiKey="stripeApiKey">
                      <Elements>
                        <CardElement />
                      </Elements>
                    </StripeProvider>
                  </ReactStripeScriptLoader> */}

                  <StripeProvider apiKey="pk_test_oKn6mp8bEJ7LPZIzOFq9KnQL00cjbj9mAy">
                    {/* <div className="example">
                      <h1>React Stripe Elements Example</h1> */}
                    <Elements>
                      <PaymentInfo />
                    </Elements>
                    {/* </div> */}
                  </StripeProvider>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>Booking Details</Card>
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
                  Pay Now
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}
export default withStyles(loginStyle)(Step3);
