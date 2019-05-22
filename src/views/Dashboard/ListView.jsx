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

class ListView extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            venues: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
        };
    }

    goto = path => {
        this.props.history.push(path);
    };

    render() {
        const { classes, user, ...rest } = this.props;
        const { venues } = this.state
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
                        venues.map(() => {
                            return (
                                <GridItem md={4}>
                                    <Card children={
                                        <Fragment>
                                            <CardHeader color={'primary'}>Venue Title</CardHeader>
                                            <CardBody >Venue Detail</CardBody>
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