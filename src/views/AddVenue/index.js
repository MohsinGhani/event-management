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
import PickLocationModal from "./PickLocationModal"
import Button from "components/CustomButtons/Button.jsx";

class AddVenue extends React.Component {
    state = {
        classicModal: false,
        picked: null
    }

    handleClickOpen = (modal) => {
        var x = [];
        x[modal] = true;
        this.setState(x);
    }

    handleClose = (modal) => {
        var x = [];
        x[modal] = false;
        this.setState(x);
    }

    pickedLocation = (picked) => {
        this.setState({
            picked
        }, this.handleClose("classicModal"))
    }

    render() {
        const { classes } = this.props;
        const { classicModal, picked } = this.state
        return (
            <div>
                <AuthenticatedNavbar />
                <GridContainer style={{ padding: '0 10px', maxWidth: '1024px', margin: '0 auto' }}>
                    <Card style={{ padding: '15px' }}>
                        <div style={{ margin: '0' }} className={classes.title}>
                            <h2>Venue Form</h2>
                        </div>

                        <GridContainer>
                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                <CustomInput
                                    labelText="Venue Title"
                                    id="float"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                <CustomInput
                                    labelText="Venue Price"
                                    id="float"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: 'number'
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                <CustomInput
                                    labelText="Venue Capacity"
                                    id="float"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: 'number',
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <i class="material-icons">people</i>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                <CustomInput
                                    labelText="Venue Address"
                                    id="material"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <i class="material-icons">location_on</i>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </GridItem>
                            {
                                !picked &&
                                <GridItem xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button color="primary" round size="sm" onClick={() => this.handleClickOpen("classicModal")} >
                                        <i class="material-icons">add_location</i> Pick Your Venue Location
                                </Button>
                                </GridItem>
                            }
                            {
                                picked &&
                                <GridItem xs={12} sm={6} md={6} lg={6}>
                                    <CustomInput
                                        labelText="Picked Longitude"
                                        id="regular"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: picked.longitude,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={() => this.pickedLocation(null)}>
                                                    <i class="material-icons">close</i>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </GridItem>
                            }
                            {
                                picked &&
                                <GridItem xs={12} sm={6} md={6} lg={6}>
                                    <CustomInput
                                        labelText="Picked Latitude"
                                        id="regular"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: picked.latitude,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={() => this.pickedLocation(null)}>
                                                    <i class="material-icons">close</i>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </GridItem>
                            }
                            {
                                picked &&
                                <GridItem xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button color="success" >
                                        <i class="material-icons">save_alt</i> Save
                                    </Button>
                                </GridItem>
                            }
                        </GridContainer>
                    </Card>
                </GridContainer>

                <PickLocationModal
                    classicModal={classicModal}
                    handleClose={this.handleClose}
                    pickedLocation={this.pickedLocation}
                />

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