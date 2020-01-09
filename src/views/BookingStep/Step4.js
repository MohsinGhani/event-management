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
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";

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
                  <Button variant="contained" color="secondary">
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
export default withStyles(loginStyle)(Step4);
