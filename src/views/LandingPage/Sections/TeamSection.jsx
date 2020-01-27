import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import team1 from "assets/img/aftab.jpeg";
import team2 from "assets/img/mohsin.jpeg";
import team3 from "assets/img/soban.jpeg";
import team4 from "assets/img/faran.jpeg";

class TeamSection extends React.Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is Event On team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team1} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Muhammad Aftab
                  <br />
                  <small className={classes.smallTitle}>Developer</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    I have managed this product on the development side and
                    developed it's Front-End and Back-End.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://www.linkedin.com/in/aftab-umer-b79b7b194/"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-linkedin"} />
                    </a>
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://www.facebook.com/profile.php?id=100005655731921"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-facebook"} />
                    </a>
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://github.com/aftabumer"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-github"} />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team2} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Mohsin Ghani
                  <br />
                  <small className={classes.smallTitle}>Developer</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    I am Technical Lead at EventOn, I have technically managed
                    this product and make it bug-free and smooth.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://www.linkedin.com/in/mohsin-ghani-17535011b/"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-linkedin"} />
                    </a>
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://www.facebook.com/mohsinghani.777"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-facebook"} />
                    </a>
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://github.com/mohsinghani"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-github"} />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team3} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Muhammad Soban
                  <br />
                  <small className={classes.smallTitle}>Developer</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    I utilized my expertise of firebase admin sdk and node js to
                    develop admin portal for this project
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://www.linkedin.com/in/mohammed-soban-aa6264135/"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-linkedin"} />
                    </a>
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://www.facebook.com/mohammed.soban.1"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-facebook"} />
                    </a>
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <a
                      href="https://github.com/MohammedSoban"
                      target="_blank"
                    >
                      <i className={classes.socials + " fab fa-github"} />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team4} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Syed Faran-ul-Haq
                  <br />
                  <small className={classes.smallTitle}>Tester</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    I am lead tester of this product.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
