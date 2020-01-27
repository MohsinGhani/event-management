import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import LocalBarIcon from '@material-ui/icons/LocalBar';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Methodology</h2>
            <h5 className={classes.description}>
            The methodology of the system is to establish business between service providers and people who want 
            to book a service.There will be vendors who will upload their services details on our websites so people 
            can come have a look and book them, which would save a lot of time for people. They can compare the prices 
            easily, see the ratings and decide whats best for them
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <InfoArea
                title="Venue"
                description="We are glad to offer venue booking service  in Karachi to our valuable customers. You can book your desired venue anywhere anytime with variety of options regarding your budget capacity and the required date."
                icon={EventAvailableIcon}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <InfoArea
                title="Decoration"
                description="We are directly collaborated with our experienced decorators who will help you to make your event memorable in a most reasonable budget."
                icon={FilterVintageIcon}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <InfoArea
                title="Photographer"
                description="We don’t want our customer to make any compromise regarding to create a memorable event, so here we are with our professional and highly skilled photographers who will help you to make your event special."
                icon={CameraEnhanceIcon}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <InfoArea
                title="Caterers"
                description="Customer satisfaction is our first priority that’s why we are here to connect you with the most experienced and best caterers of Karachi who will offer you high quality delicious food in very reasonable budget. A taste that your guest will never forget."
                icon={LocalBarIcon}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
