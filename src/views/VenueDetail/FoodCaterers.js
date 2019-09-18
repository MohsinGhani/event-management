import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./index.css";
import address from "../../../src/assets/icons/address.svg";
import email from "../../../src/assets/icons/email.svg";
import call from "../../../src/assets/icons/call.svg";
import checked from "../../../src/assets/icons/checked.svg";
import Fastfood from "@material-ui/icons/Fastfood";
import Tag from "@material-ui/icons/LocalOffer";

class FoodCaterers extends Component {
  render() {
    const { classes, venue } = this.props;
    return (
      <div>
        <AliceCarousel
          autoPlay={true}
          autoPlayInterval={3000}
          responsive={true}
          showSlideInfo={true}
          fadeOutAnimation={true}
          showSlideInfo={true}
          mouseDragEnabled={true}
        >
          {venue.url.map(source => (
            <img src={source} alt="venues" width="100%" height="360px" />
          ))}
        </AliceCarousel>
        <GridContainer
          className={classes.section}
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          <GridItem xs={12} sm={6} md={6} lg={6}>
            <div className={classes.section}>
              <div className={classes.container}>
                <div id="typography">
                  <div className={classes.typo}>
                    <h2 className={classes.title}>{venue.title}</h2>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={call}
                        alt="icon"
                        width="25px"
                        height="25px"
                        style={{ paddingRight: "5px" }}
                      />
                      {venue.contactNumber}
                    </p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={email}
                        alt="icon"
                        width="25px"
                        height="25px"
                        style={{ paddingRight: "5px" }}
                      />
                      {venue.email}
                    </p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <img
                        // src={require('path')}
                        src={address}
                        alt="icon"
                        width="25px"
                        height="25px"
                        style={{ paddingRight: "5px" }}
                      />
                      {venue.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={6}>
            <CustomTabs
              headerColor="danger"
              tabs={[
                {
                  tabName: "Booking Options"
                  // tabContent: (
                  //   <p className={classes.textCenter}>{venue.packages}</p>
                  // )
                }
              ]}
            />
          </GridItem>

          <div className={classes.container}>
            <div id="nav-tabs">
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomTabs
                    headerColor="danger"
                    tabs={[
                      {
                        tabName: "Food Items",
                        tabIcon: Fastfood,

                        tabContent: (
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                          >
                            {venue.foodItemCheck.map(foods => (
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
                                <span title={foods}>{foods}</span>
                              </GridItem>
                            ))}
                          </Grid>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomTabs
                    headerColor="danger"
                    tabs={[
                      {
                        tabName: "Pricing",
                        tabIcon: Tag,

                        tabContent: (
                          <p className={classes.textCenter}>
                            Rs: {venue.price}
                          </p>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomTabs
                    headerColor="danger"
                    tabs={[
                      {
                        tabName: "Food Packages",
                        tabContent: (
                          <p className={classes.textCenter}>{venue.packages}</p>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomTabs
                    headerColor="danger"
                    tabs={[
                      {
                        tabName: "Desciption",
                        tabContent: (
                          <p className={classes.textCenter}>
                            {venue.description}
                          </p>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles({ ...basicsStyle, ...typographyStyle })(FoodCaterers);
