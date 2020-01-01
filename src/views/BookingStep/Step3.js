import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class Step3 extends Component {
  render() {
    const { classes, activeStep, handleNext, handleBack } = this.props;

    return (
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
    );
  }
}
export default Step3;
