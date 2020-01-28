import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Box from "@material-ui/core/Box";
import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";
import { withRouter } from "react-router-dom";
import "./index.css";

class Step4 extends Component {
  render() {
    const { classes, activeStep, handleNext, handleBack } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <Card>
              <CardHeader
                className="card-header"
                title={"Review:"}
                titleTypographyProps={{
                  style: {
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    color: "#00000"
                  }
                }}
              />
              <CardBody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <div className="review-content">
                  <Box fontSize="1.5rem" fontWeight="bold" fontFamily="Signika">
                    Thanks for your Booking!
                  </Box>
                  <Box fontSize="1rem" fontFamily="Cairo" lineHeight={3}>
                    Thank you for Booking at <b>Event-ON</b>. We appreciate your
                    business and look forward to seeing you soon.
                  </Box>
                  <Box fontSize="1rem" fontFamily="Cairo">
                    Sincerely,
                  </Box>
                  <Box fontSize="1rem" fontFamily="Cairo">
                    Event-ON
                  </Box>
                </div>
                <div className="customer-contact">
                  <Box fontFamily="Signika" fontSize="1.5rem" fontWeight="bold">
                    Have any questions?
                  </Box>
                  <Button variant="contained" color="secondary" onClick={() => this.props.history.push('/')}>
                    Contact Customer Care
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridContainer>
        </div>
      </div>
    );
  }
}
export default withStyles(loginStyle)(withRouter(Step4));
