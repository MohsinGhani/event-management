import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import Button from "components/CustomButtons/Button.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import SearchView from "./SearchView";
// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";
import TeamSection from "./Sections/TeamSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
// const dashboardRoutes = [];

class LandingPage extends React.Component {
  state = {
    search: ""
  };

  render() {
    const { classes, ...rest } = this.props;
    const { search } = this.state;
    return (
      <div>
        <AuthenticatedNavbar navBgColor={"transparent"} />
        <Parallax
          filter
          image={require("assets/img/landing-bg.jpg")}
          style={{ marginTop: "-70px" }}
        >
          <div className={classes.container}>
            {!search && (
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}>Your Events Starts With Us.</h1>
                  <h4>
                    Having tough time finding a reliable services in reasonable prices, 
                    visit our website and find thousands of venues in reasonable prices 
                    and you can also choose wisely by having a look at the ratings and 
                    reviews marked by the people.
                  </h4>
                  <br />
                </GridItem>
              </GridContainer>
            )}
            <Card
              style={{ margin: "0 auto", width: "60%"}}
              children={
                <>
                  <CardBody
                    className="card-body"
                    style={{ color: "gray", marginTop: 10 }}
                  >
                    <CustomInput
                      labelText="Search"
                      id="search"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "search",
                        value: search,
                        type: "text",
                        onChange: e =>
                          this.setState({ search: e.target.value }),

                        endAdornment: (
                          <InputAdornment
                            position="end"
                            onClick={() => this.setState({ search: "" })}
                            style={{ cursor: "pointer" }}
                          >
                            {search ? <Close /> : <Search />}
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                </>
              }
            />
          </div>
        </Parallax>
        <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{ margin: search ? "-300px 30px 0px" : "-60px 30px 0px" }}
        >
          <div className={classes.container}>
            {!search && (
              <>
                <ProductSection />
                <TeamSection />
                <WorkSection />
              </>
            )}
            {search && <SearchView search={search}/>}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
