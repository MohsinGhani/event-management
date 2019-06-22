import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { authAction } from "./../../store/actions";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import credentials from '../../config/credentials'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardBody from 'components/Card/CardBody'
import CardFooter from 'components/Card/CardFooter'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Pagination from 'components/Pagination/Pagination.jsx'
import { venues } from './../../assets/venus'
import Location from '../../assets/icons/Location.svg'
import Venue_type from '../../assets/icons/Venue_type.svg'
import Layout_style from '../../assets/icons/Layout_style.svg'
import view_profile from '../../assets/icons/view_profile.svg'
import './ListView.css'
class ListView extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            venues: venues
        };
    }

    goto = path => {
        this.props.history.push(path);
    };



    render() {
        const { classes, user, ...rest } = this.props;
        const { venues } = this.state
        const stars = Math.ceil(venues[0].rating.overall)
        let renderFullStars = () => {
            return stars !== 0
                ? Array(stars)
                    .fill(null)
                    .map((item) => {
                        return <i class="fa fa-star" aria-hidden="true"></i>
                    })
                : ''
        }
        return (
            <div>
                <Header
                    absolute
                    color="rose"
                    brand="Event Management"
                    {...rest}
                />
                <GridContainer style={{ padding: '0 15px', maxWidth: '1024px', margin: '0 auto', marginTop: '80px' }}>
                    {
                        venues.map((vanue) => {
                            return (
                                <GridItem md={4}>
                                    <Card children={
                                        <Fragment>
                                            <CardHeader color={'primary'}>{vanue.name}</CardHeader>
                                            <CardBody className="card-body">
                                                <img src={vanue.mainPic} width="100%" style={{ display: 'block' }} />
                                                <div className="card-body-info">
                                                    <div>
                                                        <div className="star-ratting">
                                                            {renderFullStars()}
                                                            <p style={{ display: "inline", fontSize: "80%", color: 'grey' }}>Ratting</p>
                                                        </div>
                                                        <div className="city">
                                                            <img src={Location} width="8%" />
                                                            <p style={{ display: "inline", fontSize: "80%", color: 'grey' }}>Karachi,Pakistan</p>
                                                        </div>
                                                        <div className="type">
                                                            <img src={Layout_style} width="8%" />
                                                            <p style={{ display: "inline", fontSize: "80%", color: 'grey' }}>Farm House</p>
                                                        </div>
                                                        <div className="type">
                                                            <img src={Venue_type} width="8%" />
                                                            <p style={{ display: "inline", fontSize: "80%", color: 'grey' }}>Sitting 150</p>
                                                        </div>
                                                    </div>

                                                    <div className="right-panel">

                                                        <div className="link">
                                                            <div>
                                                                <div
                                                                    className="icon"
                                                                >+</div>
                                                                <div
                                                                    className="text"
                                                                >Add to Compare</div>
                                                            </div>
                                                        </div>

                                                        <div className="dtl-btn-wrapper">
                                                            <button className="dtl-btn"><img src={view_profile} width="20%" /><span style={{ fontSize: "70%" }}>View Profile</span></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Fragment>
                                    } />
                                </GridItem>
                            )
                        })
                    }
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Pagination
                            pages={[
                                { active: false, disabled: false, text: 'PREV', onClick: () => { } },
                                { active: false, disabled: false, text: '...', onClick: () => { } },
                                { active: false, disabled: false, text: 3, onClick: () => { } },
                                { active: true, disabled: false, text: 4, onClick: () => { } },
                                { active: false, disabled: false, text: 5, onClick: () => { } },
                                { active: false, disabled: false, text: '...', onClick: () => { } },
                                { active: false, disabled: false, text: 'NEXT', onClick: () => { } },
                            ]}
                            color={'danger'}
                        />
                    </div>
                </GridContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { authReducer: { user, isLoggedIn } } = state;
    return {
        user, isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isLoggedInAction: (payload) => dispatch(authAction.isLoggedIn(payload)),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(loginPageStyle)(ListView)));