import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import credentials from '../../config/credentials'
import { connect } from 'react-redux';

import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.jsx";
import Slide from "@material-ui/core/Slide";

const Transition = (props) => {
    return <Slide direction="down" {...props} />;
}

const Map = ReactMapboxGl({
    accessToken: credentials.MAP_ACCESS_TOCKEN
});

class PickLocationModal extends React.Component {
    state = {
        center: {
            longitude: 67.06985544,
            latitude: 24.86053553
        },
        picked: {
            longitude: 67.06985544,
            latitude: 24.86053553
        }
    }

    pickLocation = (e) => {
        this.setState({
            picked: {
                longitude: e.lng,
                latitude: e.lat
            }
        })
    }

    _renderMarker = () => {
        const { picked } = this.state
        return (
            <Marker coordinates={[picked.longitude, picked.latitude]}>
                <img
                    style={{ height: 10, width: 10 }}
                    src={require('./../../assets/icons/marker.png')}
                    alt={'current location'}
                />
            </Marker>
        )
    }

    render() {
        const { handleClose, classicModal, pickedLocation, classes } = this.props
        const { center, picked } = this.state

        return (
            <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal
                }}
                open={classicModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClose("classicModal")}
                aria-labelledby="classic-modal-slide-title"
                aria-describedby="classic-modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => handleClose("classicModal")}
                    >
                        <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Pick Your Venue Location</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                    <Map
                        style={"mapbox://styles/mapbox/streets-v9"}
                        containerStyle={{
                            height: "300px",
                            width: "550px"
                        }}
                        movingMethod={'jumpTo'}
                        center={[center.longitude, center.latitude]}
                        onClick={(map, e) => { this.pickLocation(e.lngLat) }}
                    >
                        {this._renderMarker()}
                    </Map>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button
                        color="primary"
                        onClick={() => pickedLocation(picked)}
                    >
                        Pick
                    </Button>
                    <Button
                        onClick={() => handleClose("classicModal")}
                        color="danger"
                        simple
                    >
                        Close
                      </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    const { } = state;
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(javascriptStyles)(PickLocationModal));
