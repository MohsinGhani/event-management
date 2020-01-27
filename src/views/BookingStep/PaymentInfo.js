import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import People from "@material-ui/icons/People";
import InputAdornment from "@material-ui/core/InputAdornment";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "components/Card/Card.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

class PaymentInfo extends Component {
  state = {
    loading: false
  }

  submit = async ev => {
    // User clicked submit
    let { token } = await this.props.stripe.createToken({
      name: "muhammad soban"
    });
    debugger
    this.setState({ loading: true })
    if (token && token.id) {
      fetch("https://admin-server-2.herokuapp.com/charge", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: token.id
      })
        .then(data => {
          return data.json();
        })
        .then(data => {
          debugger
          this.props.handleNext()
          console.log(data);
        })
        .catch(err => {
          debugger
          console.log(err);
        });

    }
  };

  render() {
    const { perHead, classes, activeStep, handleBack, handleNext } = this.props;
    const { loading } = this.state
    return (
      <div className="checkout">
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
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                {/* <button onClick={this.submit}>Purchase</button> */}
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
                // onClick={handleNext}
                onClick={this.submit}
                className="next-button"
              >
                {loading ? '...loading' : 'Pay Now'}
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default injectStripe(PaymentInfo);
