import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


class Decorators extends Component {
  render() {
    const { classes, venue } = this.props;
    return (
      <div>
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
                alt="some-img"
                width="100%"
                height="480px"
                style={{
                  // marginTop: "-36px",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5
                }}
              />
            ))}
          </Carousel>
        <div
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
                  </div>
                </div>
              </div>
            </div>
          </GridItem>

          <div className={classes.container}>
            <h1>{venue.objType}</h1>
            <h1>HELLO</h1>
            <h1>{venue.objType}</h1>
            <h1>{venue.objType}</h1>
            <h1>{venue.objType}</h1>
          </div>
          <div className={classes.container}>
            <div id="nav-tabs">
              <h3>Venue Detail</h3>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomTabs
                    plainTabs
                    headerColor="danger"
                    tabs={[
                      {
                        tabName: "About",
                        tabContent: (
                          <p className={classes.textCenter}>
                            The Medallion Banquets is a perfect place to host
                            your upscale events like weddings, corporate events,
                            birthdays or private gatherings. Located at the
                            prime location with all premium facilities you may
                            need to organize a perfect event. Come and
                            experience the beautiful ambiance and see the
                            difference .For the first time in Pakistan, a double
                            story marquee with the seating capacity on first
                            floor as well with a grand view to the exquisite
                            stage !
                          </p>
                        )
                      },
                      {
                        tabName: "Discount Partners",
                        tabContent: <p className={classes.textCenter} />
                      },
                      {
                        tabName: "Terms And Conditions",
                        tabContent: (
                          <p className={classes.textCenter}>
                            Soft Drinks are not included in above package and
                            will be charged separately. (Billed on Actual
                            Consumption) Mineral Water is not included in above
                            package and will be charged separately (Billed on
                            Actual Consumption) Musical, Religious, Political,
                            Commercial or Public events are subject to approval
                            from concerned authorities Function must end at
                            12:00 A.M or else penalty rate of PKR ----/hour will
                            be applied unless NOC issued from concerned
                            authorities Confirmed booking is subject to advance
                            payment which is non refundable Any other
                            instructions conveyed at the time of booking and
                            commencement of functions by the Management has to
                            be compiled by the party Fireworks are strictly
                            prohibited within venue premises Private Guards of
                            the Party are not allowed to enter in the Lawn,
                            Carrying of Arms/Ammunitions inside the lawn
                            premises is also prohibited. Eating of Pan is not
                            allowed inside venue premises Lawn management has
                            the authority to cancel the booking at any time
                            without assigning any reason if they found anything
                            misleading or suspicious. Rates may fluctuate due to
                            seasonal variation Above rates are exclusive of all
                            applicable taxes.
                          </p>
                        )
                      },
                      {
                        tabName: "Other Charges",
                        tabContent: <p className={classes.textCenter} />
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles({...basicsStyle, ...typographyStyle})(Decorators);
