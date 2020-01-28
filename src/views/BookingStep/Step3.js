import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
// import People from "@material-ui/icons/People";
// core components
// import GridContainer from "components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
// import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardBody from "components/Card/CardBody.jsx";
// import Button from "components/CustomButtons/Button.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";
import { StripeProvider, Elements } from "react-stripe-elements";
import PaymentInfo from "./PaymentInfo";
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
      handleOnChange,
      email
    } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <StripeProvider apiKey="pk_test_oKn6mp8bEJ7LPZIzOFq9KnQL00cjbj9mAy">
            <Elements>
              <PaymentInfo
                perHead={perHead}
                classes={classes}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                email={email}
              />
            </Elements>
          </StripeProvider>
        </div>
      </div>
    );
  }
}
export default withStyles(loginStyle)(Step3);
