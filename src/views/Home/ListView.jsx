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
// import { venues } from "./../../assets/venus";
import Location from "../../assets/icons/Location.svg";
import Venue_type from "../../assets/icons/Venue_type.svg";
import Layout_style from "../../assets/icons/Layout_style.svg";
import view_profile from "../../assets/icons/view_profile.svg";
import Button from "components/CustomButtons/Button.jsx";
//import './ListView.css'
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar";
// import Carousel from "react-slick";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import GlobleLoader from "./GlobleLoader";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      venues: []
    };
  }

  goto = path => {
    this.props.history.push(path);
  };

    componentDidUpdate(prevProps) {
      if (prevProps.venues !== this.props.venues && this.props.venues) {
        this.setState({
          venues: this.props.venues
        });
      }
    }

  componentDidMount() {
    this.props.getVenues();
  }

  render() {
    const { classes, user, getVenuesLoader, ...rest } = this.props;
    const { venues } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false
    };

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
    console.log(this.props.venues);
    return (
      <div>
        <AuthenticatedNavbar />

        <GridContainer
          style={{
            padding: "0 15px",
            maxWidth: "1024px",
            margin: "0 auto",
            marginTop: "15px"
          }}
        >
          <GlobleLoader getVenuesLoader={getVenuesLoader} />
          {venues &&
            venues.map((venue, i) => {
              return (
                <GridItem md={4} key={i}>
                  <Card
                    children={
                      <Fragment>
                        <CardHeader
                          style={{
                            position: "inherit",
                            opacity: 0.9,
                            display: "flex"
                          }}
                          color={"primary"}
                        >
                          <p
                            title={venue.title}
                            style={{
                              width: "100%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              margin: "5px 0 5px 0"
                            }}
                          >
                            {venue.title}
                          </p>
                        </CardHeader>
                        <CardBody
                          className="card-body"
                          style={{ color: "gray" }}
                        >
                          <Carousel
                            showThumbs={false}
                            showIndicators={false}
                            autoPlay={true}
                            infiniteLoop={true}
                          >
                            {venue.url.map(source => (
                              <img
                                src={source}
                                alt="some-img"
                                width="100%"
                                height="160px"
                                style={{
                                  // marginTop: "-36px",
                                  borderTopLeftRadius: 5,
                                  borderTopRightRadius: 5
                                }}
                              />
                            ))}
                          </Carousel>
                          <div className="card-body-info">
                            <div>
                              {/* <div className="star-ratting">
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
                            </div> */}

                              <div
                                className="city"
                                style={{ display: "flex", paddingTop: "5px" }}
                              >
                                <i
                                  class="fas fa-map-marker-alt"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                <p
                                  title={venue.address}
                                  style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    margin: "5px 0 0 0"
                                  }}
                                >
                                  {venue.address}
                                </p>
                              </div>

                              <div className="contact">
                                <i
                                  class="fas fa-phone"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {venue.contactNumber}
                              </div>
                              <div className="email">
                                <i
                                  class="fas fa-envelope"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {venue.email}
                              </div>
                              <div className="price">
                                <i
                                  class="fas fa-tags"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                Rs: {venue.price}
                              </div>
                              <div className="type">
                                <i
                                  class="fas fa-list-ul"
                                  style={{ padding: "10px 5px 0 0" }}
                                ></i>
                                {venue.objType}
                              </div>
                            </div>

                            <div className="right-panel">
                              <div
                                className="dtl-btn-wrapper"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end"
                                }}
                              >
                                <Button
                                  color="warning"
                                  size="sm"
                                  round
                                  onClick={() =>
                                    this.goto(`/venue-detail/${venue.vid}`)
                                  }
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
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    venueReducer: { venues, getVenuesLoader, getVenuesError },
    authReducer: { user, isLoggedIn }
  } = state;
  return {
    venues,
    getVenuesLoader,
    getVenuesError,
    user,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload)),
    getVenues: () => dispatch(venueAction.getVenues())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(ListView)));
