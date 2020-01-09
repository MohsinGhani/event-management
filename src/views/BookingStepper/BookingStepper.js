import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Typography from "@material-ui/core/Typography";
import StepButton from "@material-ui/core/StepButton";
import Step1 from "./../BookingStep/Step1";
import Step2 from "./../BookingStep/Step2";
import Step3 from "./../BookingStep/Step3";
import Step4 from "./../BookingStep/Step4";

const styles = () => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: "5px"
  },
  instructions: {
    marginTop: "5px",
    marginBottom: "5px"
  },
  stepper: {
    width: "30%",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center"
  },
  content: {
    display: "flex",
    justifyContent: "center"
  }
});

class BookingStepper extends Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    const activeStep = this.state.activeStep + 1;
    this.setState({ activeStep });
  };
  handleBack = () => {
    const activeStep = this.state.activeStep - 1;
    this.setState({ activeStep });
  };
  handleStep = step => {
    this.setState({
      activeStep: step
    });
  };

  getStepContent = stepIndex => {
    const {
      name,
      email,
      contactNumber,
      countryName,
      stateName,
      cityName,
      address,
      perHead,
      handleOnChange,
      childToParent
    } = this.props;
    switch (stepIndex) {
      case 0:
        return (
          <Step1
            activeStep={this.state.activeStep}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            name={name}
            email={email}
            contactNumber={contactNumber}
            handleOnChange={handleOnChange}
          />
        );
      case 1:
        return (
          <Step2
            activeStep={this.state.activeStep}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            handleOnChange={handleOnChange}
            childToParent={childToParent}
            countryName={countryName}
            stateName={stateName}
            cityName={cityName}
            address={address}
          />
        );
      case 2:
        return (
          <Step3
            activeStep={this.state.activeStep}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            perHead={perHead}
            handleOnChange={handleOnChange}
          />
        );

      default:
        break;
    }
  };

  getSteps = () => {
    return ["Persnol Info", "Booking Address", "Payment", "Review"];
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const steps = this.getSteps();
    return (
      <div className={classes.root}>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          style={{ marginTop: "30px", fontWeight: "500", color: "#384550" }}
        >
          Booking Details
        </Typography>
        <div className={classes.content}>
          <Stepper
            className={classes.stepper}
            activeStep={activeStep}
            alternativeLabel
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton
                  onClick={() => {
                    this.handleStep(index);
                  }}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </div>
        <div>
          {activeStep === steps.length - 1 ? (
            <Step4 />
          ) : (
            <div>{this.getStepContent(activeStep)}</div>
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(BookingStepper);
