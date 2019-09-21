import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import checked from "../../../src/assets/icons/checked.svg";
import Event from "@material-ui/icons/Event";
import Tag from "@material-ui/icons/LocalOffer";
import Description from "@material-ui/icons/Description";
import Package from "@material-ui/icons/ListAlt";
import Book from "@material-ui/icons/Payment";
import Facilaty from "@material-ui/icons/RoomService";
import ImageCarousel from "./ImageCarousel";
import "./index.css";
import GlobleVariables from "./GlobleVariables";
import Booking from "./Booking";
import MapLocation from "./MapLocation";

class Venues extends Component {
  render() {
    const { classes, venue } = this.props;
    return (
      <div>
        <ImageCarousel venue={venue} />

        <GridContainer
          className={classes.section}
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          <GridItem xs={12} sm={12} md={9} lg={9}>
            <GridContainer>
              <GlobleVariables venue={venue} />
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={9} md={9} lg={9}>
            <GridContainer style={{ marginRight: 0 }}>
              <Card>
                <CardBody style={{display:"flex", justifyContent: "space-between"}}>
                  <div >
                    Guest Capicity<div style={{borderTop: "3px solid black"}}>{venue.capacity}</div>
                  </div>
                  <div>
                    Venue Type<div style={{borderTop: "3px solid black"}}>Operational Hours</div></div>
                  <div>
                    Operational Hours<div style={{borderTop: "3px solid black"}}>Oprational hour</div>
                  </div>
                  <div>
                    Dimention
                    <div style={{borderTop: "3px solid black"}}>
                      {venue.lenght}
                      <div>{venue.width}</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </GridContainer>
            <GridContainer style={{ marginRight: 0 }}>
              {/* <div className={classes.container}>
                <div id="nav-tabs"> */}

              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Event Types",
                    tabIcon: Event,

                    tabContent: (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                      >
                        {venue.eventTypeCheck.map(event => (
                          <GridItem
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            style={{
                              padding: "0",
                              width: "35%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              margin: "5px 0 5px 0"
                            }}
                          >
                            <img
                              src={checked}
                              alt="icon"
                              width="20px"
                              height="20px"
                              style={{ paddingRight: "5px" }}
                            />
                            <span title={event}>{event}</span>
                          </GridItem>
                        ))}
                      </Grid>
                    )
                  }
                ]}
              />
            </GridContainer>
            <GridContainer style={{ marginRight: 0 }}>
              {/* <div className={classes.container}>
                <div id="nav-tabs"> */}

              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Facilaties",
                    tabIcon: Facilaty,

                    tabContent: (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                      >
                        {venue.serviceChecked.map(services => (
                          <GridItem
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            style={{
                              padding: "0",
                              width: "35%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              margin: "5px 0 5px 0"
                            }}
                          >
                            <img
                              src={checked}
                              alt="icon"
                              width="20px"
                              height="20px"
                              style={{ paddingRight: "5px" }}
                            />
                            <span title={services}>{services}</span>
                          </GridItem>
                        ))}
                      </Grid>
                    )
                  }
                ]}
              />
            </GridContainer>

            <GridContainer style={{ marginRight: 0 }}>
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Pricing",
                    tabIcon: Tag,

                    tabContent: (
                      <p className={classes.textCenter}>Rs: {venue.price}</p>
                    )
                  }
                ]}
              />
            </GridContainer>
            <GridContainer style={{ marginRight: 0 }}>
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Venues Packages",
                    tabIcon: Package,
                    tabContent: (
                      <p className={classes.textCenter}>{venue.packages}</p>
                    )
                  }
                ]}
              />
            </GridContainer>
            <GridContainer style={{ marginRight: 0 }}>
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Description",
                    tabIcon: Description,
                    tabContent: (
                      <p className={classes.textCenter}>{venue.description}</p>
                    )
                  }
                ]}
              />
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3}>
            <GridContainer>
              <Booking venue={venue} />
            </GridContainer>
            <GridContainer>
              <MapLocation location={venue.location} />
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles({ ...basicsStyle, ...typographyStyle })(Venues);
