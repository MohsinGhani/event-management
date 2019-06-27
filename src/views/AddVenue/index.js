import React, { Fragment } from "react";
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from 'react-router-dom';
import { authAction } from "./../../store/actions";
import AuthenticatedNavbar from "./../../components/common/AuthenticatedNavbar"
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";

class AddVenue extends React.Component {
    state = {

    }

    render() {
        const { classes } = this.props;

        return (
            // <div>
            //     <AuthenticatedNavbar />
            //     <div className={classes.sections}>
            //         <div className={classes.container}>
            // <div className={classes.title}>
            //     <h2>Venue Form</h2>
            // </div>
            //         </div>
            //     </div>
            // </div>
            <div>
                <AuthenticatedNavbar />
                <GridContainer style={{ padding: '0', maxWidth: '1024px', margin: '0 auto' }}>
                    <Card style={{ padding: '15px' }}>
                        <div style={{ margin: '0' }} className={classes.title}>
                            <h2>Venue Form</h2>
                        </div>

                        <GridContainer>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <CustomInput
                                    id="regular"
                                    inputProps={{
                                        placeholder: "Regular"
                                    }}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <CustomInput
                                    labelText="With floating label"
                                    id="float"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <CustomInput
                                    labelText="Success input"
                                    id="success"
                                    success
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <CustomInput
                                    labelText="Error input"
                                    id="error"
                                    error
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <CustomInput
                                    labelText="With material Icons"
                                    id="material"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <People />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <CustomInput
                                    labelText="With Font Awesome Icons"
                                    id="font-awesome"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <i className="fas fa-users" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </Card>
                </GridContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { authReducer: { user, isLoggedIn }, venueReducer: { venues } } = state;
    return {
        user, isLoggedIn, venues
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isLoggedInAction: (payload) => dispatch(authAction.isLoggedIn(payload)),
        logout: () => dispatch(authAction.logout()),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(basicsStyle)(AddVenue)));