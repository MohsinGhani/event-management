import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import CardHeader from "dashboard-components/Card/CardHeader.jsx";
import CardBody from "dashboard-components/Card/CardBody.jsx";
import Card from "components/Card/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


class Venues extends Component {
  render() {
    const { classes, venue } = this.props;
    return (
      <div>
        <GridContainer
          className={classes.section}
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          <Card style={{ padding: "15px", margin: 0 }}>
            {/* <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>{venue.objType}</h4>
            </CardHeader> */}
            <CardBody>
              <GridContainer>
                <Carousel
                  showThumbs={false}
                  autoPlay={true}
                  infiniteLoop={true}
                  useKeyboardArrows={true}
                  emulateTouch={true}
                  stopOnHover
                >
                  {venue.url.map(source => (
                    <img
                      src={source}
                      alt="F00d Carterer Images"
                      width="100%"
                      height="360px"
                      style={{
                        // marginTop: "-36px",
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                      }}
                    />
                  ))}
                </Carousel>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(carouselStyle)(Venues);
