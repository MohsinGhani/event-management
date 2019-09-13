import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction, venueAction } from "./../../store/actions";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
// import CardFooter from 'components/Card/CardFooter'
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Pagination from "components/Pagination/Pagination.jsx";
import { venues } from "./../../assets/venus";
import Location from "../../assets/icons/Location.svg";
import Venue_type from "../../assets/icons/Venue_type.svg";
import Layout_style from "../../assets/icons/Layout_style.svg";
import view_profile from "../../assets/icons/view_profile.svg";
import Button from "components/CustomButtons/Button.jsx";
//import './ListView.css'
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";

class ListView extends React.Component {

  goto = path => {
    this.props.history.push(path);
  };

  componentDidMount(){
    this.props.getVenues()
  }

  render() {
    // const { classes, user, ...rest } = this.props;
    // const { venues } = this.state;
    // const stars = Math.ceil(venues[0].rating.overall);
    // let renderFullStars = () => {
    //   return stars !== 0
    //     ? Array(stars)
    //         .fill(null)
    //         .map((item, i) => {
    //           return <i className="fa fa-star" aria-hidden="true" key={i} />;
    //         })
    //     : "";
    // };
    return (
      <div>
        HELLOOOOO WORLD
        {/* <AuthenticatedNavbar />
        <GridContainer
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          {venues.map((vanue, i) => {
            return (
              <GridItem md={4} key={i}>
                <Card
                  children={
                    <Fragment>
                      <CardHeader
                        style={{ position: "inherit", opacity: 0.9 }}
                        color={"primary"}
                      >
                        {vanue.name}
                      </CardHeader>
                      <CardBody className="card-body">
                        <img
                          src={vanue.mainPic}
                          alt="some-img"
                          width="100%"
                          style={{
                            marginTop: "-36px",
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5
                          }}
                        />
                        <div className="card-body-info">
                          <div>
                            <div className="star-ratting">
                              {renderFullStars()}
                              <p
                                style={{
                                  display: "inline",
                                  fontSize: "80%",
                                  color: "grey"
                                }}
                              >
                                {" "}
                                Ratting
                              </p>
                            </div>
                            <div className="city">
                              <img alt="some-img" src={Location} width="8%" />
                              <p
                                style={{
                                  display: "inline",
                                  fontSize: "80%",
                                  color: "grey"
                                }}
                              >
                                {" "}
                                {vanue.address}
                              </p>
                            </div>
                            <div className="type">
                              <img
                                alt="some-img"
                                src={Layout_style}
                                width="8%"
                              />
                              <p
                                style={{
                                  display: "inline",
                                  fontSize: "80%",
                                  color: "grey"
                                }}
                              >
                                {" "}
                                {vanue.venueTypes}
                              </p>
                            </div>
                            <div className="type">
                              <img alt="some-img" src={Venue_type} width="8%" />
                              <p
                                style={{
                                  display: "inline",
                                  fontSize: "80%",
                                  color: "grey"
                                }}
                              >
                                {" "}
                                Sitting {vanue.capacity}
                              </p>
                            </div>
                          </div>

                          <div className="right-panel">
                            <div className="dtl-btn-wrapper">
                              <Button
                                color="warning"
                                size="sm"
                                round
                                onClick={() => this.goto("/venue-detail")}
                              >
                                Detail
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Fragment>
                  }
                />
              </GridItem>
            );
          })}
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Pagination
              pages={[
                {
                  active: false,
                  disabled: false,
                  text: "PREV",
                  onClick: () => {}
                },
                {
                  active: false,
                  disabled: false,
                  text: "...",
                  onClick: () => {}
                },
                { active: false, disabled: false, text: 3, onClick: () => {} },
                { active: true, disabled: false, text: 4, onClick: () => {} },
                { active: false, disabled: false, text: 5, onClick: () => {} },
                {
                  active: false,
                  disabled: false,
                  text: "...",
                  onClick: () => {}
                },
                {
                  active: false,
                  disabled: false,
                  text: "NEXT",
                  onClick: () => {}
                }
              ]}
              color={"danger"}
            />
          </div>
        </GridContainer> */}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   const {
//     authReducer: { user, isLoggedIn },
//     venueReducer: { venues }
//   } = state;
//   return {
//     user,
//     isLoggedIn,
//     venues
//   };
// };

const mapStateToProps = state => {
  const { venueReducer: {venues, getVenuesLoader, getVenuesError }} = state;
  return {
    venues,
    getVenuesLoader,
    getVenuesError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload))
    getVenues: () => dispatch(venueAction.getVenues())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(ListView)));
